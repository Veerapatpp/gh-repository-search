import { useSuspenseQuery } from "@tanstack/react-query";
import type { SearchResponse } from "../types/GithubTypes";

const API_BASE = "https://api.github.com";

type SearchParams = {
    query: string;
    page: number;
    perPage: number;
};

export type ApiError = Error & {
    status: number;
    retryAfterSeconds: number | null;
};

export const isApiError = (error: unknown): error is ApiError =>
    error instanceof Error && "status" in error;

export const isRateLimited = (error: unknown) =>
    isApiError(error) && (error.status === 403 || error.status === 429);

export const useSearchAPI = (params: SearchParams) => {
    return useSuspenseQuery({
        queryKey: ["repo", params],
        queryFn: async ({ signal }): Promise<SearchResponse> => {
            const searchParams = new URLSearchParams({
                q: params.query,
                page: String(params.page),
                per_page: String(params.perPage),
            });

            const response = await fetch(
                `${API_BASE}/search/repositories?${searchParams}`,
                {
                    headers: {
                        Accept: "application/vnd.github+json",
                        "X-GitHub-Api-Version": "2026-03-10",
                    },
                    signal,
                },
            );

            if (!response.ok) {
                const retryAfter = response.headers.get("retry-after");
                const reset = response.headers.get("x-ratelimit-reset");

                const retryAfterSeconds = retryAfter
                    ? Number(retryAfter)
                    : reset
                        ? Math.max(0, Math.ceil(Number(reset) - Date.now() / 1000))
                        : null;

                const body = await response.json().catch(() => null);
                const error: ApiError = Object.assign(
                    new Error(body?.message ?? `Request failed with status ${response.status}`),
                    { status: response.status, retryAfterSeconds },
                );
                throw error;
            }

            return response.json();
        },
        retry: (failureCount, error) => {
            if (isApiError(error) && error.status < 500) return false;
            return failureCount < 2;
        },
    });
};