import PropTypes from "prop-types";

const Book = ({ book, updateBookShelf }) => {

    return (
        <div className="book">
            <div className="book-top">
                <div
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 193,
                        backgroundImage:
                            `url(${book.imageLinks.smallThumbnail})`,
                    }}
                ></div>
                <div className="book-shelf-changer">
                    <select value={book.shelf} onChange={(e) => updateBookShelf(book, e.target.value)}>
                        <option value="none" disabled>
                            Move to...
                        </option>
                        <option value="currentlyReading">
                            Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{Array.isArray(book.authors) ? book.authors.join(', ') : ''}</div>
        </div>
    );
};

Book.propTypes = {
    book: PropTypes.object.isRequired,
    updateBookShelf: PropTypes.func.isRequired,
};

export default Book;
