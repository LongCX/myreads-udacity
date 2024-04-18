import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Book from "./Book"

const BookSearch = ({ searchBooks, searchResults, updateBookShelf }) => {

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
                        onChange={(e) => searchBooks(e.target.value)}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {
                        searchResults.map((book) => (
                            <Book book={book} updateBookShelf={updateBookShelf} />
                        ))
                    }
                </ol>
            </div>
        </div>
    );
};

BookSearch.propTypes = {
    searchBooks: PropTypes.func.isRequired,
    searchResults: PropTypes.array,
    updateBookShelf: PropTypes.func.isRequired,
};

export default BookSearch;
