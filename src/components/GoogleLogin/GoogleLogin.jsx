import React from 'react'
import {useGoogleLogin} from '@react-oauth/google';
import { BASE_URL } from '../../utils/constants';
import axios from 'axios';
import { addUser } from '../../store/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
                // You can now send this code to your backend to exchange for tokens
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
    <div>
        <button onClick={() => googleLoginButton()} type='button'>Sign Up with Google</button>
    </div>
  )
}

export default GoogleLogin