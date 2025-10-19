import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "./Authcontext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState();

  // register
  const tryRegister = async (formData) => {
    setError(null);
    const firstname = formData.get("firstname");
    const lastname = formData.get("lastname");
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      await register({ firstname, lastname, email, password });
      navigate("/books");
    } catch (e) {
      setError(e.message);
    }
  };
  return (
    <>
      <h1>Register for an account</h1>
      <form action={tryRegister}>
        <label>
          First Name
          <input type="text" name="firstname" required />
        </label>
        <label>
          Last Name
          <input type="text" name="lastname" required />
        </label>
        <label>
          email
          <input type="text" name="email" required />
        </label>
        <label>
          Password
          <input type="password" name="password" required />
        </label>
        <button>Register</button>
        {error && <p role="alert">{error}</p>}
      </form>
      <Link to="/register">Already have an account? Log in here.</Link>
    </>
  );
}
