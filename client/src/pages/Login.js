import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios"
import { useNavigate } from "react-router"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    let navigate = useNavigate();

    const loginUser = (event) => {
        event.preventDefault()
        axios.post("http://localhost:3001/auth/login", {email, password}).then((response) => {
            if (response.data.error) {
                alert(response.data.error)
            } else {
                localStorage.setItem("accessToken", response.data)
                navigate("/dashboard")
            }
        })
    }

    return (
        <div>
        <h1>Login</h1>
        <form onSubmit={loginUser}>
            <input 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email" 
            />
            <input 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password" 
            />
            <input type="submit" value="Login" />
        </form>
    </div>
    )
}

export default Login