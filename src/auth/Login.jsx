import React from "react";
import { useState } from "react";
import { useAuth } from "./Authcontext";
import { Link, useNavigate } from "react-router";

/* CREATE A FORM THT ALLOWS USES TO LOGIN */
export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const tryLogin = async (formData) => {
    setError(null);

    const email = formData.get("email");
    const password = formData.get("password");
    try {
      await login({ email, password });
      navigate("/books");
    } catch (e) {
      setError(e.message);
    }
  };
  return (
    <>
      <h1>Log in to your account</h1>
      <form action={tryLogin}>
        <label>
          email
          <input type="text" name="email" required />
        </label>
        <label>
          Password
          <input type="password" name="password" required />
        </label>
        <button>Login</button>
        {error && <p role="alert">{error}</p>}
      </form>
      <Link to="/register">Need an account? Register here.</Link>
    </>
  );
}
