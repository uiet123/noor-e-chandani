import React from "react";

const ThankYou = () => {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "4rem",
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fffbea",
      }}
    >
      <h1 style={{ color: "#10b981", fontSize: "2.5rem" }}>
        🎉 Payment Successful!
      </h1>

      <p style={{ fontSize: "1.2rem", marginTop: "1rem" }}>
        Thanks for shopping with <b>Noor-e-Chandani</b> ✨
      </p>

      <p style={{ color: "#6b7280", marginTop: "0.5rem" }}>
        Your payment has been received successfully.
      </p>

      <button
        onClick={() => (window.location.href = "/")}
        style={{
          marginTop: "2rem",
          padding: "10px 20px",
          border: "none",
          borderRadius: "6px",
          backgroundColor: "#10b981",
          color: "white",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        Continue Shopping 🛍️
      </button>
    </div>
  );
};

export default ThankYou;
