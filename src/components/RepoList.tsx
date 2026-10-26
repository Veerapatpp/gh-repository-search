import type { Repository } from "../types/GithubTypes";
import styles from "../styles/RepoList.module.css";
import { RepoCard } from "./RepoCard";

type Props = {
    repos: Repository[];
};

export const RepoList = ({ repos }: Props) => {
    if (repos.length === 0) {
        return <p className={styles.empty}>No repositories found.</p>;
    }

    return (
        <ul className={styles.list}>
            {repos.map((repo) => (
                <li key={repo.id}>
                    <RepoCard repo={repo} />
                </li>
            ))}
        </ul>
    );
}
