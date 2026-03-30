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
      <div className="login-page">
        <div className="login-card">
          <div className="login-header">
            <h2 className="login-title">Welcome Back</h2>
            <p className="login-subtitle">{user.isAnonymous ? "Guest" : user.email}</p>
          </div>
          <div className="login-actions">
            <button className="btn btn-secondary" onClick={handleLogout} disabled={loading}>
              {loading ? "Logging out..." : "Logout"}
            </button>
            <button className="btn btn-primary" onClick={() => navigate('/')}>
              Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <img className="login-logo" src="mapPhoto.jpg" alt="Route Optimizer" />
          <h2 className="login-title">Route Optimizer</h2>
          <p className="login-subtitle">Sign in to optimize your routes</p>
        </div>

        <div className="login-form">
          <div className="input-group">
            <label className="input-label">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
          </div>

          <div className="login-actions">
            <button className="btn btn-primary" onClick={handleLogin} disabled={loading}>
              {loading ? "Please wait..." : "Log In"}
            </button>
            <button className="btn btn-secondary" onClick={handleSignup} disabled={loading}>
              {loading ? "Please wait..." : "Sign Up"}
            </button>
          </div>
        </div>

        <div className="login-divider">or</div>

        <button className="btn btn-ghost login-guest-btn" onClick={handleGuest} disabled={loading}>
          {loading ? "Please wait..." : "Continue as Guest"}
        </button>

        {error && <p className="login-error">{error}</p>}
      </div>
    </div>
  );
}

export default LoginPage;
