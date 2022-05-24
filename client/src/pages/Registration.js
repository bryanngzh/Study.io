import axios from "axios"
import { useState } from "react"

const Registration = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const registerUser = (event) => {
        event.preventDefault()
        axios.post("http://localhost:3001/auth", {username, email, password}).then((response) => {
            console.log(response.data)
        })
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={registerUser}>
                <input 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="username"
                    placeholder="Username" 
                />
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
                <input type="submit" value="Register" />
            </form>
        </div>
    )
}

export default Registration