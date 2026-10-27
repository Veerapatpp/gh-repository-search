import type { Repository } from "../types/GithubTypes";
import styles from "../styles/RepoCard.module.css";
import { LANGUAGE_COLORS } from "../types/Colors";
import { useRef } from "react";
import { RepoDetailDialog } from "./RepoDetailDialog";

type Props = {
    repo: Repository;
};


const relativeTime = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

const formatUpdated = (iso: string) => {
    const diffDays = Math.round((new Date(iso).getTime() - Date.now()) / 86_400_000);
    if (Math.abs(diffDays) < 30) return relativeTime.format(diffDays, "day");
    if (Math.abs(diffDays) < 365) return relativeTime.format(Math.round(diffDays / 30), "month");
    return relativeTime.format(Math.round(diffDays / 365), "year");
};

const formatCount = (count: number) =>
    new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(count);

export const RepoCard = ({ repo }: Props) => {
    const topics = repo.topics?.slice(0, 4) ?? [];
    const dialogRef = useRef<HTMLDialogElement>(null);
    return (
        <article className={styles.card}>
            <header className={styles.header}>
                <img
                    className={styles.avatar}
                    src={repo.owner.avatar_url}
                    alt=""
                    width={36}
                    height={36}
                    loading="lazy"
                />
                <div className={styles.titleGroup}>
                    <span className={styles.owner}>{repo.owner.login}</span>
                    <h2 className={styles.title}>
                        <button
                            type="button"
                            className={styles.link}
                            onClick={() => dialogRef.current?.showModal()}
                            aria-haspopup="dialog"
                        >
                            {repo.name}
                        </button>
                    </h2>
                </div>
                {repo.archived && <span className={styles.badge}>Archived</span>}
            </header>

            <p className={styles.description}>
                {repo.description ?? "No description provided."}
            </p>

            {topics.length > 0 && (
                <ul className={styles.topics}>
                    {topics.map((topic) => (
                        <li key={topic} className={styles.topic}>{topic}</li>
                    ))}
                </ul>
            )}

            <footer className={styles.meta}>
                {repo.language && (
                    <span className={styles.metaItem}>
                        <span
                            className={styles.langDot}
                            style={{ background: LANGUAGE_COLORS[repo.language] ?? "#8b949e" }}
                        />
                        {repo.language}
                    </span>
                )}
                <span className={styles.metaItem} title={`${repo.stargazers_count.toLocaleString()} stars`}>
                    <StarIcon />
                    {formatCount(repo.stargazers_count)}
                </span>
                <span className={styles.metaItem} title={`${repo.forks_count.toLocaleString()} forks`}>
                    <ForkIcon />
                    {formatCount(repo.forks_count)}
                </span>
                <time className={styles.updated} dateTime={repo.updated_at}>
                    Updated {formatUpdated(repo.updated_at)}
                </time>
            </footer>
            <RepoDetailDialog ref={dialogRef} repo={repo} />
        </article>
    );
}



const StarIcon = () => {
    return (
        <svg className={styles.icon} viewBox="0 0 16 16" aria-hidden="true">
            <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
        </svg>
    );
}

const ForkIcon = () => {
    return (
        <svg className={styles.icon} viewBox="0 0 16 16" aria-hidden="true">
            <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" />
        </svg>
    );
}