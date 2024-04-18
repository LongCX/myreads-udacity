import "./App.css";
import { useState, useEffect } from "react";
import * as BooksAPI from "./utils/BooksAPI";
import { Route, Routes } from "react-router-dom";
import BookShelf from "./components/BookShelf";
import BookSearch from "./components/BookSearch";

function App() {

  const [books, setBooks] = useState([]);

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const getMyBooks = async () => {
      const res = await BooksAPI.getAll();
      setBooks(res);
    };
    getMyBooks();
  }, []);

  const searchBooks = (query) => {
    const search = async () => {
      const res = await BooksAPI.search(query.trim());
      if (!res.error) {
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
