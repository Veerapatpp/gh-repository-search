import styles from "../styles/Pagination.module.css"

type Props = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

const WINDOW_SIZE = 5;

const getVisiblePages = (currentPage: number, totalPages: number) => {
    const size = Math.min(WINDOW_SIZE, totalPages);
    const start = Math.min(
        Math.max(1, currentPage - Math.floor(size / 2)),
        totalPages - size + 1,
    );
    return Array.from({ length: size }, (_, i) => start + i);
};

export const Pagination = ({ currentPage, totalPages, onPageChange }: Props) => {
    if (totalPages <= 1) return null;

    const pages = getVisiblePages(currentPage, totalPages);
    const first = pages[0];
    const last = pages[pages.length - 1];

    const handleClick = (page: number) => {
        onPageChange(page);
        window.scroll({ top: 0, behavior: "smooth" });
    };

    const renderPage = (page: number) => (
        <li key={page}>
            <button
                type="button"
                onClick={() => handleClick(page)}
                disabled={page === currentPage}
                aria-current={page === currentPage ? "page" : undefined}
                data-testid={`pagination-${page}`}
                className={styles.button}
            >
                {page}
            </button>
        </li>
    );

    return (
        <div aria-label="Pagination" className={styles.pagination}>
            <button
                type="button"
                onClick={() => handleClick(currentPage - 1)}
                disabled={currentPage <= 1}
                className={styles.button}
            >
                Prev
            </button>

            <ul className={styles.list}>
                {first > 1 && renderPage(1)}
                {first > 2 && <li aria-hidden="true">...</li>}

                {pages.map(renderPage)}

                {last < totalPages - 1 && <li aria-hidden="true">...</li>}
                {last < totalPages && renderPage(totalPages)}
            </ul>

            <button
                type="button"
                onClick={() => handleClick(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className={styles.button}
            >
                Next
            </button>
        </div>
    );
}