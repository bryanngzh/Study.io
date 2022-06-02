import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Registration from "./pages/Registration"
import Dashboard from "./pages/Dashboard"
import LandingPage from './pages/LandingPage';
import NavigationBar from './components/NavigationBar';
import Profile from "./pages/Profile";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from 'react'
import axios from 'axios'


function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  })

  useEffect(() => {
    axios.get('/api/auth/auth', {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((response) => {
      if (response.data.error) {
        setAuthState({...authState, status: false});
      } else {
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
      }
    })
  }, [])

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <BrowserRouter>
          <NavigationBar />
          <Routes>
            <Route path="/" exact element={ <LandingPage />} />
            <Route path="/register" exact element={<Registration />} />
            <Route path="/dashboard" exact element={<Dashboard />} />
            <Route path="/profile" exact element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
