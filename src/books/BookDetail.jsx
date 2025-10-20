// src/books/BookDetail.jsx
import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getBookById, reserveBook } from "../api/books";
import { useAuth } from "../auth/Authcontext";
import "./BookDetail.css";

export default function BookDetail() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isReserving, setIsReserving] = useState(false);
  const [reserved, setReserved] = useState(false);

  useEffect(() => {
    async function fetchBook() {
      try {
        const data = await getBookById(id);
        setBook(data);
        if (data.isReserved) setReserved(true);
      } catch {
        setError("Failed to load book details.");
      } finally {
        setLoading(false);
      }
    }
    fetchBook();
  }, [id]);

  const handleReserve = async () => {
    if (reserved) return;

    setIsReserving(true);
    try {
      await reserveBook(id, token);
      setReserved(true);
      navigate("/profile"); // Redirect to profile after reserving
    } catch (err) {
      console.error(err);
      setReserved(true); // Gray out if already reserved
    } finally {
      setIsReserving(false);
    }
  };

  if (loading) return <p>Loading book details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="book-detail-container">
      <h2>{book.title}</h2>
      {book.coverimage && (
        <img
          src={book.coverimage}
          alt={book.title}
          className="book-detail-image"
        />
      )}
      <p>
        <strong>Author:</strong> {book.author}
      </p>
      {book.description && <p>{book.description}</p>}

      {/* Only show Reserve button if user is logged in */}
      {token && (
        <button
          onClick={handleReserve}
          disabled={isReserving || reserved}
          className={`reserve-button ${reserved ? "reserved" : ""}`}
        >
          {reserved
            ? "Book Reserved"
            : isReserving
            ? "Reserving..."
            : "Reserve Book"}
        </button>
      )}
    </div>
  );
}
