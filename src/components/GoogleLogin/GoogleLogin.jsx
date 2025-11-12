import React from 'react'
import {useGoogleLogin} from '@react-oauth/google';
import { BASE_URL } from '../../utils/constants';
import axios from 'axios';
import { addUser } from '../../store/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "./GoogleLogin.css"

const GoogleLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const responseGoogle = async (authResult) => {
        try{
            if(authResult?.code){
                const code = authResult.code;
                const res = await axios.get(`${BASE_URL}/googleLogin`, {
                    params: {code},
                    withCredentials: true
                })
                const {email, name, image} = res.data
                console.log("Google login success:", JSON.stringify(res.data, null, 2));
                dispatch(addUser(res.data.data));
                navigate("/");
               
            }
            
        }catch(err){
            console.error("Google login failed:", err);
        }
    }
    const googleLoginButton = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: 'auth-code'
    })

    
  return (
   <div className="google-login">
  <button className="google-login__btn" onClick={googleLoginButton} type="button">
    <img className="google-login__logo" src="/google_logo.png" alt="Google logo" />
    Sign in with Google
  </button>
</div>

  )
}

export default GoogleLogin