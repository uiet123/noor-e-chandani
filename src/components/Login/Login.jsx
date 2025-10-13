import React, {useState} from "react";
import { BASE_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import {addUser} from "../../store/userSlice"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css"
const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "Prince@gmail.com",
        password: "Prince@123"
    })
    const handleLogin = async () => {
        try{
            const res = await axios.post(`${BASE_URL}/login`, { 
            emailId: form.email,
            password: form.password
        }, {
            withCredentials: true
        });
        dispatch(addUser(res?.data?.data))
        navigate("/")
        console.log(res?.data?.data)
        }catch(err) {
            console.error(err.message)
        }
        

    }
  return (
    <div className="login">
      <div className="login-input">
        <label>Email Id</label>
        <input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})}/>
      </div>
      <div className="login-input">
        <label>Password</label>
        <input type="password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
