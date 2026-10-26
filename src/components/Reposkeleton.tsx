import styles from "../styles/RepoCard.module.css"

export const RepoCardSkeleton = () => {
    return (
        <div className={styles.card} aria-hidden="true">
            <div className={styles.header}>
                <span className={`${styles.skeleton} ${styles.avatar}`} />
                <div className={styles.titleGroup}>
                    <span className={styles.skeleton} />
                    <span className={styles.skeleton} />
                </div>
            </div>
            <span className={styles.skeleton} />
            <span className={styles.skeleton} />
            <span className={styles.skeleton} />
        </div>
    );
}