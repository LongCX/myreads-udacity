import PropTypes from "prop-types";

const Book = ({ statusShelf, book, updateBookShelf }) => {
    let statusShelfBook = 'none';
    if (statusShelf?.length > 0) {
        statusShelfBook = statusShelf[0];
    } else {
        statusShelfBook = book.shelf ? book.shelf :'none';
    }

    return (
        <div className="book">
            <div className="book-top">
                <div
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 193,
                        backgroundImage:
                            `url(${book.imageLinks?.smallThumbnail})`,
                    }}
                ></div>
                <div className="book-shelf-changer">
                    <select value={statusShelfBook} onChange={(e) => updateBookShelf(book, e.target.value)}>
                        <option value="moveTo" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
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
