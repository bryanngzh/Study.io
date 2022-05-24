import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Registration from "./pages/Registration"
import Dashboard from "./pages/Dashboard"


function App() {
  return (
    <div className="App">
       <BrowserRouter>
         <Routes>
          <Route path="/login" exact element={ <Login />  } />
          <Route path="/register" exact element={ <Registration />  } />
          <Route path="/dashboard" exact element={ <Dashboard />  } />
         </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
