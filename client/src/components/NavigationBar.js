import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

const NavigationBar = () => {

  const { authState, setAuthState } = useContext(AuthContext);

  const logout = () => {
    localStorage.removeItem("accessToken")
    setAuthState({username:"", id: 0, status: false});
  }

    return (
      <nav className="navbar bg-dark">
      <h1>
        {!authState.status ? 
        (<Link to="/">
          <i className="fas fa-laptop-code"></i> Study.io
        </Link>)
            : 
        (<Link to="/dashboard">
          <i className="fas fa-home"></i> Dashboard
        </Link>)
        }
      </h1>
        <ul>
          {!authState.status ? (
            <>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          ) : (
              <>
              <h1>{ authState.username || "" }</h1>
            <button onClick={logout}> Logout </button>
            </>
          )}
        </ul>
    </nav>
    )
}

export default NavigationBar