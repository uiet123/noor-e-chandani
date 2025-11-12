import { PiShoppingCartSimple } from "react-icons/pi";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { removeUser } from "../../store/userSlice";
import axios from "axios";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const cartItems = useSelector((state) => state.cart.items)
  const cartCount = Object.values(cartItems).reduce((total, qty) => total + qty, 0);
  const userFirstName =
    user?.firstName?.trim().split(/\s+/)[0] ||
    user?.name?.trim().split(/\s+/)[0] ||
    "";

  const handleClickLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      setToggle(false);
      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="navbar">
      <div className="logo-wrapper">
        <Link to="/">
          <img className="logo" src="/logo.png" alt="logo" />
        </Link>
      </div>
     
      {user && <p className="username">Hi, {userFirstName}</p>}
      
      <ul className="navbar-icons">
        <Link to="/cart"> <li className="cart">
          <PiShoppingCartSimple />
        </li></Link>
     { cartCount > 0 && <p className="cart-number">{cartCount}</p>}

        {/* Burger Button – icons ko mount/unmount mat karo */}
        <li>
          <button
            className={`burger-btn ${toggle ? "open" : ""}`}
            onClick={() => setToggle((p) => !p)}
            aria-expanded={toggle}
            aria-controls="nav-menu"
            aria-label="Toggle menu"
          >
            <span className="icon hamburger">
              <RxHamburgerMenu  />
            </span>
            <span className="icon cross">
              <RxCross1  />
            </span>
          </button>
        </li>
      </ul>

      {/* Dropdown – hamesha render, class se open/close */}
      <div id="nav-menu" className={`toggle-items ${toggle ? "open" : ""}`}>
        {!user && (
          <Link to="/login">
            <p onClick={() => setToggle(false)}>Sign In</p>
          </Link>
        )}
        <Link to="/orders">
          <p onClick={() => setToggle(false)}>Orders</p>
        </Link>
        <Link to="/contact">
          <p onClick={() => setToggle(false)}>Contact Us</p>
        </Link>
        {user && (
          <button className="menu-btn" onClick={handleClickLogout}>
            Logout
          </button>
        )}
      </div>
      </div>
    
  );
};

export default Navbar;
