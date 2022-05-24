import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Registration from "./pages/Registration"
import Dashboard from "./pages/Dashboard"
import LandingPage from './pages/LandingPage';
import NavigationBar from './pages/NavigationBar';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" exact element={ <LandingPage />} />
          <Route path="/login" exact element={ <Login />  } />
          <Route path="/register" exact element={ <Registration />  } />
          <Route path="/dashboard" exact element={ <Dashboard />  } />
         </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
