import React from "react";
import "./ThankYou.css"; // CSS file import

const ThankYou = () => {
  return (
    <div className="thankyou-container">
      <h1 className="thankyou-heading">Payment Successful! </h1>

      <p className="thankyou-text">
        Thanks for shopping with <b>Noor-e-Chandani</b> ✨
      </p>

      <p className="thankyou-subtext">
        Your payment has been received successfully.
      </p>

      <button
        className="thankyou-button"
        onClick={() => (window.location.href = "/")}
      >
        Continue Shopping 🛍️
      </button>
    </div>
  );
};

export default ThankYou;
