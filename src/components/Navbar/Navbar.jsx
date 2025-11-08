import { PiShoppingCartSimpleThin } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../../store/userSlice";
import axios from "axios";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user)
  const handleClickLogout = async () => {
    try{
      await axios.post(`${BASE_URL}/logout`, {}, {
        withCredentials: true
      })
      dispatch(removeUser())
      navigate("/")
    }catch(err){
      console.error(err.message)
    }
  }
  return (
    <div className="navbar">
      <div className="logo-wrapper">
        <Link to="/">
        <img
          className="logo"
          height={80}
          width={140}
          src="/logo.png"
          alt="logo"
        />
        </Link>
      </div>
      {user && <p style={{color: "white"}}>Hello, {user.firstName}</p>}

      <ul className="navbar-icons">
        <Link to="/cart"> <li className="cart">
          <PiShoppingCartSimpleThin size={40} />
        </li></Link>
        
          
            <CgProfile style={{color:"white"}} size={40} onClick={() => setToggle(prev => !prev)}> </CgProfile>
            {toggle && (
              <div className="toggle-items">
            <Link to="/login"><p>Login</p></Link>
            <Link to="/orders"><p>Orders</p></Link>
            <Link onClick={handleClickLogout}><p>Logout</p></Link>
            </div>
            )}
            
         
     
      </ul>
      
       
    </div>
  );
};

export default Navbar;
