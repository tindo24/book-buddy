// src/books/BookList.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router";
import "./BookList.css";

export default function BookList({ books }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    setFilteredBooks(books || []);
  }, [books]);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredBooks(books);
      return;
    }

    const filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="book-list-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      <ul className="book-list">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BookListItem key={book.id} book={book} />
          ))
        ) : (
          <p>No books found</p>
        )}
      </ul>
    </div>
  );
}

function BookListItem({ book }) {
  return (
    <li className="book-item">
      {book.coverimage && (
        <img className="book-image" src={book.coverimage} alt={book.title} />
      )}

      <div className="book-info">
        <Link to={`/books/${book.id}`} className="book-title-link">
          <h3 className="book-title">{book.title}</h3>
        </Link>
        <p className="book-author">
          <strong>Author:</strong> {book.author}
        </p>
        {book.description && (
          <p className="book-description">{book.description}</p>
        )}
      </div>
    </li>
  );
}

/*import { useState, useEffect } from "react";
import { useAuth } from "../auth/Authcontext";
import { Link } from "react-router";
import "./BookList.css";

export default function BookList({ books, syncBooks }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  //  use hooks to load books everytime book link is clicked
  useEffect(() => {
    setFilteredBooks(books || []);
  }, [books]);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredBooks(books);
      return;
    }

    const filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="book-list-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      <ul className="book-list">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BookListItem key={book.id} book={book} syncBooks={syncBooks} />
          ))
        ) : (
          <p>Book does not exist</p>
        )}
      </ul>
    </div>
  );
}

function BookListItem({ book }) {
  const { token } = useAuth();
  const [error, setError] = useState(null);

  return (
    <li className="book-item">
      {book.coverimage && (
        <img className="book-image" src={book.coverimage} alt={book.title} />
      )}

      <div className="book-info">
        <Link to={`/books/${book.id}`} className="book-title-link">
          <h3 className="book-title">{book.title}</h3>
        </Link>
        <p className="book-author">
          <strong>Author:</strong> {book.author}
        </p>
        {book.description && (
          <p className="book-description">{book.description}</p>
        )}
      </div>
    </li>
  );
}
*/
