import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
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
          <p>☎️ +91 9217284904</p>
          <div className="social-media">
            <Link to="https://www.instagram.com/noorechandani/"><FaInstagram /></Link>
            <Link to="https://www.facebook.com/people/Noor-Chandani/61584125199270/?rdid=qfSB5JuDCs93YEky&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1a4YSH9Fyp%2F"><FaFacebook /></Link>
            <Link to="https://www.youtube.com/@noorechandani"><FaYoutube /></Link>
          </div>
          
         
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
