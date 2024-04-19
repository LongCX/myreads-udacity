import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Book from "./Book"
import * as BooksAPI from "../utils/BooksAPI";
import { useState, useEffect } from "react";

const BookSearch = ({ books, updateBookShelf }) => {

    const [searchResults, setSearchResults] = useState([]);

    const [query, setQuery] = useState("");

    useEffect(() => {
        const search = async () => {
            const res = await BooksAPI.search(query.trim());

            if (res.error) return setSearchResults([]);

            setSearchResults(res);

        }
        if (query.length === 0) return setSearchResults([]);

        // Debounce search
        const timer = setTimeout(() => {
            search();
        }, 500);
        return () => clearTimeout(timer);
    }, [query]);

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link to="/" className="close-search">
                    Close
                </Link>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {
                        searchResults && searchResults.length ? searchResults.map((book) => (
                            <li key={book.id}>
                                <Book statusShelf={books.filter((b) => b.id === book.id).map((s) => s.shelf)} book={book} updateBookShelf={updateBookShelf} />
                            </li>
                        )) : <span>No result (Put your keyword correcttly)</span>
                    }
                </ol>
            </div>
        </div>
    );
};

BookSearch.propTypes = {
    searchResults: PropTypes.array,
    updateBookShelf: PropTypes.func.isRequired,
};

export default BookSearch;
