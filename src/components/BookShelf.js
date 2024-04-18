import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Book from "./Book"

const BookShelf = ({ books, updateBookShelf }) => {
    const bookShelfTitles = [
        { type: "currentlyReading", title: "Currently Reading" },
        { type: "wantToRead", title: "Want to Read" },
        { type: "read", title: "Read" },
    ];

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            {
                bookShelfTitles.map((bookShelfTitle, index) => {
                    return (
                        <div className="list-books-content" key={index}>
                            <div>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">{bookShelfTitle.title}</h2>
                                    <div className="bookshelf-books">
                                        <ol className="books-grid">
                                            {
                                                books && books.length ? books.filter((book) => book.shelf === bookShelfTitle.type).map((book) => (
                                                    <li key={book.id}>
                                                        <Book book={book} updateBookShelf={updateBookShelf} />
                                                    </li>
                                                )) : <span>No have book (Search & add your book)</span>
                                            }
                                        </ol>

                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    );
};

BookShelf.propTypes = {
    books: PropTypes.array.isRequired,
    updateBookShelf: PropTypes.func.isRequired,
};

export default BookShelf;
