import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <h2>Noor-e-Chandani</h2>
          <p>
            Glow with grace — your one-stop destination for handcrafted candles,
            elegant gift sets, and soothing fragrances made with love in India.
          </p>
        </div>

        <div className="footer-links">
          <div>
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/collections">Collections</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4>Support</h4>
            <ul>
              <li><Link to="/FAQ">FAQ</Link></li>
              <li><Link to="/shipping">Shipping</Link></li>
              <li><Link to="/returns">Returns</Link></li>
            </ul>
          </div>

          <div>
            <h4>Legal</h4>
            <ul>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>📍 Delhi NCR, India</p>
          <p>📧 <a href="mailto:support@noor-e-chandani.info">noorechandani.info@gmail.com</a></p>
          <p>☎️ +91 7973270451</p>
         
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Noor-e-Chandani. All Rights Reserved.</p>
        <p>Made with ❤️ by Noor-e-Chandani Team</p>
      </div>
    </footer>
  );
};

export default Footer;
