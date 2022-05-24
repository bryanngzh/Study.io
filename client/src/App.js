import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Registration from "./pages/Registration"
import Dashboard from "./pages/Dashboard"
import LandingPage from './pages/LandingPage';
import NavigationBar from './components/NavigationBar';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" exact element={ <LandingPage />} />
          <Route path="/dashboard" exact element={ <Dashboard />  } />
        </Routes>
        <section className="container">
          <Routes>
            <Route path="/login" exact element={ <Login />  } />
            <Route path="/register" exact element={<Registration />} />
          </Routes>
        </section>
       </BrowserRouter>
    </div>
  );
}

export default App;
