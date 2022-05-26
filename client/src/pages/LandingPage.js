import React, { useContext, useEffect } from 'react';
import { useNavigate } from "react-router"
import { Link } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

const LandingPage = () => {

  const { authState } = useContext(AuthContext);

  let navigate = useNavigate();

  useEffect(() => {
    if (authState.status) {
      navigate('/dashboard')
    }
  })

    return (
      <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">Study.io</h1>
              <p className="lead">
                The all-in-one productivity platform 
              </p>
            <div className="buttons">
              <Link to="/register" className="btn btn-primary">Sign Up</Link>
              <Link to="/login" className="btn btn-light">Login</Link>
            </div>
          </div>
        </div>
      </section>
    )
}

export default LandingPage