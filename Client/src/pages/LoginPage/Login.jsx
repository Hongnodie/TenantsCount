import axios from "axios";
import {useContext, useState} from "react";
import {authContext} from "../../context/authContext";
import "./login.css";

const Login = () => {
    const [credentialInfo, setCredentialInfo] = useState({
        username: undefined,
        password: undefined,
    })

    const {user, onLoading, error, authDispatcher} =useContext(authContext);

    const handleChange =(e) => {
        setCredentialInfo(prev=>({...prev,[e.target.id]:e.target.value}))
    }

    const handleClick =async (e) => {
        e.preventDefault();
        authDispatcher({type:"startlogin"})
        try {
            const res = await axios.post("/auth/login", credentialInfo)
            authDispatcher({type:"loginSuccess", payload: res.data})
        } catch (err) {
            authDispatcher({type:"loginFail", payload: err.response.data})
        }
        // TEST
        console.log(user);
    }

    return (
        <div className="login">
            <div className="lContainer">
                <input type="text" placeholder="username" id="username" className="username" onChange={handleChange} />
                <input type="text" placeholder="password" id="password" className="password" onChange={handleChange} />
                <button className="lButton" onClick={handleClick}>Login</button>
                {error && <span>{error.message}</span>}
            </div>
        </div>
    )
}

export default Login;
