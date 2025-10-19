import { useEffect, useState } from "react";
import { useAuth } from "../auth/Authcontext";
//import { useAuth } from "./Authcontext";
import { getReservations } from "../api/books";
import { Link } from "react-router";
import "./Profile.css";

export default function Profile() {
  const { user, token, logout } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchReservations() {
      if (!token) {
        setError("You must be logged in to view reservations.");
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
    }
    fetchReservations();
  }, [token]);

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
      <h2>Profile</h2>
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
              {res.book?.coverimage && (
                <img src={res.book.coverimage} alt={res.book.title} />
              )}
              <div className="reservation-info">
                <Link to={`/books/${res.book?.id}`}>
                  <strong>{res.book?.title}</strong>
                </Link>
                <p>
                  <strong>Author:</strong> {res.book?.author}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/*export default function Profile() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div>
        <h2>No user logged in</h2>
        <Link to="/login">Go to Login</Link>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        maxWidth: "400px",
        margin: "2rem auto",
      }}
    >
      <h2>Profile</h2>
      <p>
        <strong>First Name:</strong> {user.firstname}
      </p>
      <p>
        <strong>Last Name:</strong> {user.lastname}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <button
        onClick={logout}
        style={{
          marginTop: "1rem",
          backgroundColor: "#4a90e2",
          color: "white",
          border: "none",
          borderRadius: "6px",
          padding: "0.5rem 1rem",
          cursor: "pointer",
        }}
      >
        Log out
      </button>
    </div>
  );
}*/
