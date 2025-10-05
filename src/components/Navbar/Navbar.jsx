import assests from "../../assets/assets";
import { PiShoppingCartSimpleThin } from "react-icons/pi";
import "./Navbar.css";

const Navbar = () => {

  return (
    <div className="navbar">
      <div className="logo-wrapper">
        <img
          className="logo"
          height={80}
          width={140}
          src={assests.logo}
          alt="logo"
        />
      </div>

      <ul className="navbar-icons">
        <li className="cart">
          <PiShoppingCartSimpleThin size={40} />
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
