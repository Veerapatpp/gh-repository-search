import type { FallbackProps } from "react-error-boundary";
import { isApiError, isRateLimited } from "../api/SearchAPI";
import styles from "../styles/SearchError.module.css";

export function SearchError({ error, resetErrorBoundary }: FallbackProps) {
    const rateLimited = isRateLimited(error);
    const waitSeconds = isApiError(error) ? error.retryAfterSeconds : null;

    return (
        <div className={styles.box} role="alert">
            <p className={styles.title}>
                {rateLimited ? "Too many searches" : "Something went wrong"}
            </p>
            <p className={styles.message}>
                {rateLimited
                    ? `GitHub limits unauthenticated searches to 10 per minute.${waitSeconds ? ` Please try again in ${waitSeconds}s.` : ""
                    }`
                    : "Failed to load repositories. Please try again."}
            </p>
            <button type="button" className={styles.button} onClick={resetErrorBoundary}>
                Retry
            </button>
        </div>
    );
}