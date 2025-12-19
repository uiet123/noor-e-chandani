import React from "react";
import "./Returns.css";

const Returns = () => {
  return (
    <div className="returns-container">
      <div className="returns-content">
        <h1 className="returns-title">Returns & Exchange Policy</h1>
        <p className="returns-text">
          At <span>Noor-e-Chandani</span>, every candle is handcrafted with care and
          attention to detail. Due to the delicate and personalized nature of
          our products, <strong>we do not accept returns or exchanges</strong> once
          an order has been delivered.
        </p>
        <p className="returns-text">
          However, please make a video while unboxing the parcel, on the basis of that video only the returns or refunds will be done if the parcel is damaged, please contact us
          within <strong>24 hours of delivery</strong> with clear videos and pictures at{" "}
          <a href="mailto:noorechandani.info@gmail.com">
            noorechandani.info@gmail.com
          </a>
          , and our team will be happy to assist you.
        </p>
        <p className="returns-text">
          Thank you for understanding — your support helps us keep every candle
          special, handcrafted, and made with love 🕯️
        </p>
      </div>
    </div>
  );
};

export default Returns;
