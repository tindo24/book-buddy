import { Route, Routes } from "react-router";
import Layout from "./layout/Layout.jsx";

import Profile from "./auth/Profile.jsx";
import BookDetail from "./books/BookDetail";
import ReservationsPage from "./books/ReservationsPage";

import Register from "./auth/Register";
import Login from "./auth/Login";
import BooksPage from "./books/BooksPage.jsx";
import Error404 from "./Error404.jsx";
import { useState } from "react";

export default function App() {
  const [reservations, setReservations] = useState([]);

  // Function to add a new reservation
  const syncReservations = (newReservation) => {
    setReservations((prev) => [...prev, newReservation]);
  };

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<BooksPage />} />
        <Route
          path="/profile"
          element={
            <Profile
              reservations={reservations}
              setReservations={setReservations}
            />
          }
        />
        <Route
          path="/books/:id"
          element={<BookDetail syncReservations={syncReservations} />}
        />
        <Route path="/reservations" element={<ReservationsPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}

/*import { Route, Routes } from "react-router";
import Layout from "./layout/Layout.jsx";

import Profile from "./auth/Profile.jsx";
import BookDetail from "./books/BookDetail";
import ReservationsPage from "./books/ReservationsPage";

import Register from "./auth/Register";
import Login from "./auth/Login";
import BooksPage from "./books/BooksPage.jsx";
import Error404 from "./Error404.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Default landing page *}
        <Route path="/" element={<BooksPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/reservations" element={<ReservationsPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}*/
