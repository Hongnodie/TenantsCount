import axios from "axios";
import {useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import {authContext} from "../../context/authContext";
import "./login.css";

axios.defaults.baseURL = 'http://localhost:5000';

const Login = () => {
    const [credentialInfo, setCredentialInfo] = useState({
        username: undefined,
        password: undefined,
    })

    const {user, onLoading, error, authDispatcher} =useContext(authContext);

    const navigate =useNavigate();

    const handleChange =(e) => {
        setCredentialInfo(prev=>({...prev,[e.target.id]:e.target.value}))
    }

    const handleClick =async (e) => {
        e.preventDefault();
        authDispatcher({type:"startlogin"})
        try {
            const res = await axios.post("/auth/login", credentialInfo)
            // console.log(res.data);
            authDispatcher({type:"loginSuccess", payload: res.data})
            navigate('/');
        } catch (err) {
            authDispatcher({type:"loginFail", payload: err.response.data})
            // console.log(err.response.data)
        }
        // console.log(user);
    }

    return (
        <div className="login">
            <div className="lContainer">
                <input type="text" placeholder="username" id="username" className="username" onChange={handleChange} />
                <input type="text" placeholder="password" id="password" className="password" onChange={handleChange} />
                <button className="lButton" onClick={handleClick} disabled={onLoading} >Login</button>
                {user && <span>{user.username} logged in</span>}
                {error && <span>{error}</span>}
            </div>
        </div>
    )
}

export default Login;
