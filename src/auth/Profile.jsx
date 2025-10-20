import { useEffect, useState } from "react";
import { useAuth } from "../auth/Authcontext";
import { getReservations, deleteReservation } from "../api/books";
import { Link } from "react-router";
import "./Profile.css";

export default function Profile() {
  const { user, token, logout } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch reservations for this user
  useEffect(() => {
    async function fetchReservations() {
      if (!token) return;
      try {
        const data = await getReservations(token);
        console.log("Reservations from API:", data);
        setReservations(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load reservations.");
      } finally {
        setLoading(false);
      }
    }
    fetchReservations();
  }, [token]);

  // Handle returning a book
  const handleReturn = async (reservationId) => {
    try {
      await deleteReservation(reservationId, token);
      setReservations((prev) => prev.filter((res) => res.id !== reservationId));
    } catch (err) {
      console.error(err);
      alert("Could not return book. Try again.");
    }
  };

  if (!user) {
    return (
      <div className="profile-container">
        <h2>No user logged in</h2>
        <Link to="/login">Go to Login</Link>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h2>{user.firstname}'s Profile</h2>
      <p>
        <strong>First Name:</strong> {user.firstname}
      </p>
      <p>
        <strong>Last Name:</strong> {user.lastname}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <button onClick={logout} className="profile-button">
        Log out
      </button>

      <hr className="profile-hr" />

      <h3>My Reserved Books</h3>

      {loading ? (
        <p>Loading reservations...</p>
      ) : error ? (
        <p>{error}</p>
      ) : reservations.length === 0 ? (
        <p>You have no reserved books.</p>
      ) : (
        <ul className="reservations-list">
          {reservations.map((res) => (
            <li key={res.id} className="reservation-item">
              {res.coverimage && (
                <img
                  src={res.coverimage}
                  alt={res.title}
                  className="reservation-book-image"
                />
              )}
              <div className="reservation-info">
                <Link to={`/books/${res.bookid}`}>
                  <strong>{res.title}</strong>
                </Link>
                <p>
                  <strong>Author:</strong> {res.author}
                </p>
                <button
                  className="return-button"
                  onClick={() => handleReturn(res.id)}
                >
                  Return Book
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
