import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import React from "react";

function LoginPage() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setLoading(true);
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = async () => {
    setLoading(true);
    setError("");
    try {
      await signInAnonymously(auth);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    setError("");
    try {
      await logout();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <div style={{ maxWidth: 500, margin: "0 auto", padding: '30px', textAlign: "center", fontSize: '22px' , gap: '10px'}}>
        <h2>Welcome Back</h2>
        <p>{user.isAnonymous ? "Guest" : user.email}</p>
        <button style={{ margin: '0 5px' }} onClick={handleLogout} disabled={loading}>
          {loading ? "Logging out..." : "Logout"}
        </button>
        <button style={{ margin: '0 5px' }} onClick={()=>navigate('/')}>
          Home
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 500, margin : '0 auto', padding: '30px', textAlign: "center" , fontSize: '22px'}}>
      <h2>Login / Signup</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", margin: "10px auto", width: "100%" }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", margin: "10px auto", width: "100%" }}
      />

      <button onClick={handleSignup} disabled={loading} style={{ margin: 10 }}>
        {loading ? "Please wait..." : "Sign Up"}
      </button>
      <button onClick={handleLogin} disabled={loading} style={{ margin: 10 }}>
        {loading ? "Please wait..." : "Log In"}
      </button>

      <hr />

      <button onClick={handleGuest} disabled={loading}>
        {loading ? "Please wait..." : "Continue as Guest"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default LoginPage;
