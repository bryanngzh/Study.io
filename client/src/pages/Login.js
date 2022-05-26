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
        <h1 className="large text-primary">Sign In</h1>
          <p className="lead">
            <i className="fas fa-user"></i> Log into Your Account
          </p>
          <form className="form" onSubmit={loginUser}>
            <div className="form-group">
              <input 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email" 
              />
            </div>
            <div className="form-group">
              <input 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password" 
              />
            </div>
            <input type="submit" className="btn btn-primary" value="Login" />
          </form>
          <p className="my-1">
            Don't have an account? <Link to ="/register">Sign Up</Link>
          </p>
    </div>
    )
}

export default Login