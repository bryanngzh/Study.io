import axios from "axios"
import { Alert } from "bootstrap";
import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

const Registration = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { authState } = useContext(AuthContext);

    let navigate = useNavigate();

    useEffect(() => {
        if (authState.status) {
          navigate('/dashboard')
        }
    })

    const registerUser = (event) => {
        event.preventDefault()
        axios.post("http://localhost:3001/auth", {username, email, password}).then((response) => {
            console.log(response.data)
            if (response.data.error) {
                Alert(response.data.error)
            } else {
                navigate("/login")
            }
        })
    }

    return (
        <div>
             <h1 className="large text-primary">Sign Up</h1>
                <p className="lead">
                    <i className="fas fa-user"></i> Create Your Account
                </p>
            <form className="form" onSubmit={registerUser}>
              <div className="form-group">
                <input 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    placeholder="Username" 
                />
              </div>
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
                <input type="submit" className="btn btn-primary" value="Register" />      
            </form>
            <p className="my-1">
              Already have an account? <Link to ="/login">Sign In</Link>
            </p>
        </div>
    )
}

export default Registration