const API = import.meta.env.VITE_API;

/** GET ALL BOOKS */
export async function getBooks() {
  try {
    const response = await fetch(`${API}/books`);
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}

/** GET SINGLE BOOK BY ID */
export async function getBookById(id) {
  try {
    const response = await fetch(`${API}/books/${id}`);
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
}

/** RESERVE A BOOK */
export async function reserveBook(id, token) {
  try {
    const response = await fetch(`${API}/reservations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ bookId: id }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Reservation error:", result);
      throw new Error(result.message || "Failed to reserve book");
    }

    return result;
  } catch (e) {
    console.error("Reserve book failed:", e);
    throw e;
  }
}
// reserved book check

export async function getReservations(token) {
  try {
    const response = await fetch(`${API}/reservations`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch reservations");
    return await response.json();
  } catch (err) {
    console.error("Error fetching reservations:", err);
    return [];
  }
}

// Delete a reservation by its ID
export async function deleteReservation(reservationId, token) {
  try {
    const response = await fetch(`${API}/reservations/${reservationId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.message || "Failed to delete reservation");
    }

    return true; // deletion successful
  } catch (err) {
    console.error("Failed to delete reservation:", err);
    throw err;
  }
}

/** GET AN ARRAY OF BOOKS FROM THE API 
export async function getBooks() {
  try {
    const response = await fetch(`${API}/books`);
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}

/** FETCH A SINGLE BOOK FROM THE API BY ITS ID 
export async function getBookById(id) {
  try {
    const response = await fetch(`${API}/books/${id}`);
    if (!response.ok) throw new Error(`Failed to fetch book with id ${id}`);
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
}*/
