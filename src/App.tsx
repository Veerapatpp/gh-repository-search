import { Suspense, ViewTransition } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useSearchParams } from "react-router-dom";
import { SearchBar } from "./components/Searchbar";
import { SearchResults } from "./components/SearchResult";
import { RepoCardSkeleton } from "./components/Reposkeleton";
import styles from "./App.module.css"

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const handleSearch = (value: string) => {
    setSearchParams(value ? { q: value } : {});
  };

  const handlePageChange = (next: number) => {
    setSearchParams({ q: query, page: String(next) });
  };

  return (
    <div>
      <header className={styles.title}>
        <h1>Repository Search</h1>
      </header>

      <main className={styles.main}>
        <SearchBar key={query} defaultValue={query} onSearch={handleSearch} />

        {query && (
          <ErrorBoundary
            fallback={<p>Something went wrong.</p>}
            resetKeys={[query, page]}
          >
            <ViewTransition update="auto" default="none">
              <Suspense key={`${query}-${page}`} fallback={(<RepoCardSkeleton />)}>
                <SearchResults
                  query={query}
                  page={page}
                  onPageChange={handlePageChange}
                />
              </Suspense>
            </ViewTransition>
          </ErrorBoundary>
        )}
      </main>
    </div>
  );
}