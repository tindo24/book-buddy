// src/books/BookDetail.jsx
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getBookById, reserveBook } from "../api/books";
import { useAuth } from "../auth/Authcontext";

export default function BookDetail() {
  const { id } = useParams();
  const { token } = useAuth(); // get token for authenticated requests
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const [isReserving, setIsReserving] = useState(false);
  const [reserved, setReserved] = useState(false);

  useEffect(() => {
    async function fetchBook() {
      try {
        const data = await getBookById(id);
        setBook(data);

        // If API provides reserved info
        if (data.isReserved) {
          setReserved(true);
        }
      } catch (err) {
        setError("Failed to load book details.");
      }
    }
    fetchBook();
  }, [id]);

  const handleReserve = async () => {
    if (!token) {
      alert("You must be logged in to reserve a book.");
      return;
    }

    if (reserved) {
      alert("This book is already reserved.");
      return;
    }

    setIsReserving(true);
    try {
      await reserveBook(id, token);
      setReserved(true);
      alert(`You have successfully reserved "${book.title}"`);
    } catch (err) {
      if (err.message.includes("already reserved")) {
        alert(`Sorry, "${book.title}" is already reserved.`);
        setReserved(true);
      } else {
        alert("Failed to reserve this book. Try again.");
      }
    } finally {
      setIsReserving(false);
    }
  };

  if (error) return <p>{error}</p>;
  if (!book) return <p>Loading book details...</p>;

  return (
    <div
      style={{
        background: "#f8f8f8",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "20px",
        maxWidth: "600px",
        margin: "20px auto",
      }}
    >
      <h2>{book.title}</h2>
      {book.coverimage && (
        <img
          src={book.coverimage}
          alt={book.title}
          style={{ width: "200px", borderRadius: "6px", marginBottom: "15px" }}
        />
      )}
      <p>
        <strong>Author:</strong> {book.author}
      </p>
      {book.description && <p>{book.description}</p>}

      <button
        onClick={handleReserve}
        disabled={isReserving || reserved}
        style={{
          marginTop: "20px",
          background: reserved ? "gray" : "#007bff",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: reserved ? "not-allowed" : "pointer",
        }}
      >
        {reserved
          ? "Book Reserved!"
          : isReserving
          ? "Reserving..."
          : "Reserve Book"}
      </button>
    </div>
  );
}
