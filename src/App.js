import "./App.css";
import { useState } from "react";
import * as BooksAPI from "./utils/BooksAPI";
import { Route, Routes, useNavigate } from "react-router-dom";
import BookShelf from "./components/BookShelf";
import BookSearch from "./components/BookSearch";

function App() {
  let navigate = useNavigate();

  const [books, setBooks] = useState([]);

  const [searchResults, setSearchResults] = useState([]);

  const searchBooks = (query) => {
    const search = async () => {
      const res = await BooksAPI.search(query.trim());
      if (!res.error && res !== 'undefined') {
        setSearchResults(res);
      } else {
        setSearchResults([]);
      }
    }
    if (query) {
      search();
    } else {
      setSearchResults([]);
    }
    navigate("/search");
  }

  const updateBookShelf = (book, toShelf) => {
    const update = async () => {
      await BooksAPI.update(book, toShelf)
      book.shelf = toShelf;
      setBooks(books.filter((b) => b.id !== book.id).concat([book]));
    }
    update();
  }

  return (
    <div className="app">
      <Routes>
        <Route
          path="/search"
          element={
            <BookSearch searchBooks={searchBooks} searchResults={searchResults} updateBookShelf={updateBookShelf} />
          }
        />
        <Route
          path="/"
          element={
            <BookShelf books={books} updateBookShelf={updateBookShelf} />
          }
        /></Routes>
    </div>
  );
}

export default App;
