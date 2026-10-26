import { useSearchAPI } from "../api/SearchAPI";
import { Pagination } from "./Pagination";
import { RepoList } from "./RepoList";
import styles from "../styles/SearchResult.module.css"

const PER_PAGE = 20;
const MAX_RESULTS = 1000;

type Props = {
    query: string;
    page: number;
    onPageChange: (page: number) => void;
};

export const SearchResults = ({ query, page, onPageChange }: Props) => {
    const { data } = useSearchAPI({ query, page, perPage: PER_PAGE });
    const totalPages = Math.ceil(
        Math.min(data.total_count, MAX_RESULTS) / PER_PAGE,
    );

    return (
        <>
            <p className={styles.count}>
                {data.total_count.toLocaleString()} {data.total_count === 1 ? "repository" : "repositories"}
            </p>
            <div>
                <RepoList repos={data.items} />
                <Pagination currentPage={page} totalPages={totalPages} onPageChange={onPageChange} />
            </div>
        </>
    );
}