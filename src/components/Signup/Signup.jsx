import React, { useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    setError("");
    const { firstName, lastName, email, password, confirmPassword } = form;

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError("Please fill all required fields.");
      return false;
    }

    const emailRe = /\S+@\S+\.\S+/;
    if (!emailRe.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return false;
    }

    // optional: basic strong password check (letters + numbers)
    const strongRe = /(?=.*[a-zA-Z])(?=.*\d)/;
    if (!strongRe.test(password)) {
      setError("Password should include letters and numbers.");
      return false;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    return true;
  };

  const handleSignup = async (e) => {
    if (e) e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        emailId: form.email,
        password: form.password,
      };

      const res = await axios.post(`${BASE_URL}/signup`, payload, {
        withCredentials: true,
        timeout: 15000,
      });
      
      if (res.status === 200 || res.status === 201) {
        dispatch(addUser(res?.data?.data));
        setSuccess("Account created successfully! Redirecting...");
        setTimeout(() => navigate("/"), 900);
      } else {
        setError("Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      const msg =
        err?.response?.data?.message ||
        err?.response?.data ||
        err?.message ||
        "Unable to signup. Try again later.";
      setError(typeof msg === "string" ? msg : "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <form className="signup-card" onSubmit={handleSignup} noValidate>
        <h2 className="signup-heading">Sign Up</h2>
        <p className="signup-sub">Start your Noor-e-Chandani journey</p>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="field-row">
          <label className="field half">
            <span className="label-text">First name</span>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              className="input"
              placeholder="John"
              required
            />
          </label>

          <label className="field half">
            <span className="label-text">Last name</span>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              className="input"
              placeholder="Doe"
              required
            />
          </label>
        </div>

        <label className="field full">
          <span className="label-text">Email</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="input"
            placeholder="you@example.com"
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
            className="input"
            placeholder="Create a password"
            autoComplete="new-password"
            required
          />
        </label>

        <label className="field">
          <span className="label-text">Confirm Password</span>
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            className="input"
            placeholder="Re-enter password"
            required
          />
        </label>

        <button
          type="submit"
          className="signup-btn"
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? "Creating account..." : "Create account"}
        </button>

        <div className="signup-footer">
          <p className="small">
            Already have an account? <span className="muted" onClick={() => navigate("/login")} style={{cursor: "pointer", color:"#eec84d"}}>Click here to Sign in</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
