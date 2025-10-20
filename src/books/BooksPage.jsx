// src/books/BooksPage.jsx
import { useState, useEffect } from "react";
import { getBooks } from "../api/books";
import BookList from "./BookList";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (err) {
        console.error("Failed to fetch books:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, []);

  if (loading) return <p>Loading books...</p>;

  return (
    <div>
      <h1>All Books</h1>
      <BookList books={books} />
    </div>
  );
}

/*import { useState, useEffect } from "react";
import { getBooks } from "../api/books";
import BookList from "./BookList";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const syncBooks = async () => {
    const data = await getBooks();
    setBooks(data);
  };
  useEffect(() => {
    syncBooks();
  }, []);
  return (
    <>
      <h1>Catalog</h1>
      <BookList books={books} syncBooks={syncBooks} />
    </>
  );
}*/
