import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Registration from "./pages/Registration"
import Dashboard from "./pages/Dashboard"
import LandingPage from './pages/LandingPage';
import NavigationBar from './components/NavigationBar';
import Profile from "./pages/Profile";
import Notes from "./pages/Notes"
import ResetPassword from "./pages/ResetPassword"
import ForgotPassword from "./pages/ForgotPassword";
import { AuthContext } from "./helpers/AuthContext";
import { SettingsContext } from "./helpers/SettingsContext";
import { ImageContext } from "./helpers/ImageContext";
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [password, setPassword] = useState([])

  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  })

  const [newTimer, setNewTimer] = useState({
    work: 20,
    short: 5,
    long: 10,
  })

  const [imageState, setImageState] = useState({
    image: "",
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

  useEffect(() => {
    axios.get('/api/auth/getPasswordReset').then((response) => {
      setPassword(response.data)
    })
  }, [password])

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
      <ImageContext.Provider value = {{imageState, setImageState}}>
      <SettingsContext.Provider value={{ 
          newTimer, setNewTimer
        }}>
        <BrowserRouter>
          <NavigationBar />
          <Routes>
            <Route path="/" exact element={ <LandingPage />} />
            <Route path="/register" exact element={<Registration />} />
            <Route path="/forgotPassword" exact element={<ForgotPassword />} />
            <Route path="/dashboard" exact element={<Dashboard />} />
            <Route path="/profile" exact element={<Profile />} />
            <Route path="/notes" exact element={<Notes />} />
            {password.map(item => "/resetPassword/" + item.userId + "/" + item.resetString).map(x =>
                  <Route path={x} exact element={<ResetPassword user={x}/>} />
            )}
          </Routes>
          </BrowserRouter>
          </SettingsContext.Provider>
          </ImageContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
