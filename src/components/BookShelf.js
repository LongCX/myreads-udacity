import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Book from "./Book"

const BookShelf = ({ books, updateBookShelf }) => {
    const shelves = ['currentlyReading', 'wantToRead', 'read'];
    const shelveName = ['Currently Reading', 'Want to Read', 'Read'];


    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            {
                shelves.map((shelf, index) => {
                    return (
                        <div className="list-books-content" key={index}>
                            <div>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">{shelveName[index]}</h2>
                                    <div className="bookshelf-books">
                                        <ol className="books-grid">
                                            {
                                                books.filter((book) => book.shelf === shelf).map(book => (
                                                    <Book book={book} updateBookShelf={updateBookShelf} />
                                                ))
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
