export type RepositoryOwner = {
    login: string;
    avatar_url: string;
};

export type RepositoryLicense = {
    name: string;
};

export type Repository = {
    id: number;
    name: string;
    owner: RepositoryOwner;
    html_url: string;
    homepage: string | null;
    description: string | null;
    language: string | null;
    topics?: string[];
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
    license: RepositoryLicense | null;
    default_branch: string;
    archived: boolean;
    created_at: string;
    updated_at: string;
};

export type SearchResponse = {
    total_count: number;
    items: Repository[];
};