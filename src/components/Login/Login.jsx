import React, { useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "../GoogleLogin/GoogleLogin";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "Prince@gmail.com",
    password: "Prince@123",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // server or validation error
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    setError("");
    const { email, password } = form;
    if (!email || !password) {
      setError("Please fill both email and password.");
      return false;
    }
    // simple email check
    const re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (password.length < 6) {
      setError("Password should be at least 6 characters.");
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          emailId: form.email,
          password: form.password,
        },
        {
          withCredentials: true,
          timeout: 15000,
        }
      );

      const userData = res?.data?.data;
      if (userData) {
        dispatch(addUser(userData));
        setSuccess("Logged in successfully! Redirecting...");
        // small delay so user sees message
        setTimeout(() => navigate("/"), 800);
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      // friendly error handling
      const msg =
        err?.response?.data ||
        err?.response?.data?.message ||
        err?.message ||
        "Unable to login. Try again later.";
      setError(typeof msg === "string" ? msg : "Login failed. Check credentials.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleLogin} noValidate>
        <h2 className="login-heading">Welcome back</h2>
        <p className="login-sub">Login to manage Noor-e-Chandani</p>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <label className="field">
          <span className="label-text">Email</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@example.com"
            className="input"
            autoComplete="email"
            required
          />
        </label>

        <label className="field">
          <div className="label-row">
            <span className="label-text">Password</span>
            <button
              type="button"
              className="toggle-pass"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Your password"
            className="input"
            autoComplete="current-password"
            required
          />
        </label>

        <button
          type="submit"
          className="login-btn"
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
        <h3>Or</h3>
        <GoogleLogin />
        

        <div className="login-footer">
          <p className="small">
            Don't have an account? <span onClick={() => navigate("/signup")} className="muted">Click here to Sign up</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
