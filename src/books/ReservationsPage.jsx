// src/books/ReservationsPage.jsx
// src/books/ReservationsPage.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../auth/Authcontext";
import { getReservations, deleteReservation } from "../api/books";
import { Link } from "react-router";
import "./ReservationsPage.css";

export default function ReservationsPage() {
  const { token } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch reservations from the API
  const fetchReservations = async () => {
    if (!token) {
      setError("You must be logged in to view your reservations.");
      setLoading(false);
      return;
    }
    try {
      const data = await getReservations(token);
      setReservations(data);
    } catch (err) {
      setError("Failed to load reservations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [token]);

  // Delete reservation
  const handleDelete = async (reservationId) => {
    if (!window.confirm("Are you sure you want to cancel this reservation?"))
      return;

    try {
      await deleteReservation(reservationId, token);
      fetchReservations(); // Refresh after deletion
    } catch (err) {
      alert("Failed to cancel reservation. Try again.");
    }
  };

  if (loading) return <p>Loading reservations...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="reservations-container">
      <h2>My Reservations</h2>
      {reservations.filter((res) => res.book).length === 0 ? (
        <p>You currently have no active reservations.</p>
      ) : (
        <ul className="reservation-list">
          {reservations
            .filter((res) => res.book) // Only show valid reservations
            .map((res) => (
              <li key={res.id} className="reservation-item">
                {res.book.coverimage && (
                  <img
                    src={res.book.coverimage}
                    alt={res.book.title}
                    className="reservation-image"
                  />
                )}
                <div className="reservation-info">
                  <Link
                    to={`/books/${res.book.id}`}
                    className="reservation-title"
                  >
                    <h3>{res.book.title}</h3>
                  </Link>
                  <p className="reservation-author">
                    <strong>Author:</strong> {res.book.author}
                  </p>
                  <button
                    onClick={() => handleDelete(res.id)}
                    className="cancel-reservation-button"
                  >
                    Cancel Reservation
                  </button>
                </div>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
