import { useState } from "react";
import { useAuth } from "../auth/Authcontext";
import { reserveBook } from "../api/books";
import { useNavigate } from "react-router";
import "./BookListItem.css";

export default function BookListItem({ book, syncReservations }) {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [reserved, setReserved] = useState(false);

  const handleReserve = async () => {
    if (!token) {
      alert("You must be logged in to reserve a book.");
      return;
    }

    try {
      const newReservation = await reserveBook(book.id, token);
      setReserved(true);
      if (syncReservations) syncReservations(newReservation);
      navigate("/profile");
    } catch (err) {
      console.error(err);
      alert("Could not reserve book.");
    }
  };

  return (
    <li className="book-item">
      {book.coverimage && (
        <img src={book.coverimage} alt={book.title} className="book-image" />
      )}
      <div className="book-info">
        <h4 className="book-title">{book.title}</h4>
        <p className="book-author">{book.author}</p>
        <button
          onClick={handleReserve}
          disabled={reserved}
          className={`reserve-button ${reserved ? "reserved" : ""}`}
        >
          {reserved ? "Reserved" : "Reserve"}
        </button>
      </div>
    </li>
  );
}
