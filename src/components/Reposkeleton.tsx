import styles from "../styles/RepoCard.module.css"

export const RepoCardSkeleton = () => {
    return (
        <div className={styles.card} aria-hidden="true">
            <div className={styles.header}>
                <span className={`${styles.skeleton} ${styles.avatar}`} />
                <div className={styles.titleGroup}>
                    <span className={styles.skeleton} style={{ width: 80 }} />
                    <span className={styles.skeleton} style={{ width: 160, height: 18 }} />
                </div>
            </div>
            <span className={styles.skeleton} style={{ width: "90%" }} />
            <span className={styles.skeleton} style={{ width: "60%" }} />
            <span className={styles.skeleton} style={{ width: 200, marginTop: "auto" }} />
        </div>
    );
}