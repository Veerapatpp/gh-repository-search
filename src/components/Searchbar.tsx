import { useState, type FormEvent } from "react";
import styles from "../styles/Searchbar.module.css";

type SearchBarProps = {
    defaultValue?: string;
    onSearch: (query: string) => void;
};

export const SearchBar = ({ defaultValue = "", onSearch }: SearchBarProps) => {
    const [value, setValue] = useState(defaultValue);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearch(value.trim());
    };

    return (
        <form role="search" onSubmit={handleSubmit} className={styles.form} >
            <input
                id="repo-search"
                type="search"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="e.g. react, typescript"
                className={styles.input}
            />
            <button
                type="submit"
                className={styles.button}
            >
                Search
            </button>
        </form>
    );
}
