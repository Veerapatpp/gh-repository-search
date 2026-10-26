import type { Ref } from "react";
import type { Repository } from "../types/GithubTypes";
import styles from "../styles/RepoDetailDialog.module.css";

type Props = {
    repo: Repository;
    ref: Ref<HTMLDialogElement>;
};

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en", { year: "numeric", month: "short", day: "numeric" });

export const RepoDetailDialog = ({ repo, ref }: Props) => {
    return (
        <dialog
            ref={ref}
            className={styles.dialog}
            aria-labelledby={`repo-${repo.id}-title`}
            onClick={(e) => {
                if (e.target === e.currentTarget) e.currentTarget.close();
            }}
        >
            <div className={styles.content}>
                <header className={styles.header}>
                    <img className={styles.avatar} src={repo.owner.avatar_url} alt="" width={48} height={48} />
                    <div>
                        <span className={styles.owner}>{repo.owner.login}</span>
                        <h2 id={`repo-${repo.id}-title`} className={styles.title}>{repo.name}</h2>
                    </div>
                    <form method="dialog">
                        <button className={styles.close} aria-label="Close">✕</button>
                    </form>
                </header>

                <p className={styles.description}>
                    {repo.description ?? "No description provided."}
                </p>

                {repo.topics && repo.topics.length > 0 && (
                    <ul className={styles.topics}>
                        {repo.topics.map((topic) => (
                            <li key={topic} className={styles.topic}>{topic}</li>
                        ))}
                    </ul>
                )}

                <dl className={styles.stats}>
                    <div><dt>Stars</dt><dd>{repo.stargazers_count.toLocaleString()}</dd></div>
                    <div><dt>Forks</dt><dd>{repo.forks_count.toLocaleString()}</dd></div>
                    <div><dt>Open issues</dt><dd>{repo.open_issues_count.toLocaleString()}</dd></div>
                    <div><dt>Language</dt><dd>{repo.language ?? "—"}</dd></div>
                    <div><dt>License</dt><dd>{repo.license?.name ?? "—"}</dd></div>
                    <div><dt>Created</dt><dd>{formatDate(repo.created_at)}</dd></div>
                    <div><dt>Updated</dt><dd>{formatDate(repo.updated_at)}</dd></div>
                </dl>

                <footer className={styles.actions}>
                    {repo.homepage && (
                        <a className={styles.secondary} href={repo.homepage} target="_blank" rel="noopener noreferrer">
                            Website
                        </a>
                    )}
                    <a className={styles.primary} href={repo.html_url} target="_blank" rel="noopener noreferrer">
                        Open on GitHub
                    </a>
                </footer>
            </div>
        </dialog>
    );
}