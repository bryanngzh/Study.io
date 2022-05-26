import Task from "../components/Task";
import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

const Dashboard = () => {

  const { authState } = useContext(AuthContext);

  let navigate = useNavigate();

    useEffect(() => {
        if (!authState.status) {
          navigate('/')
        }
    })

  return (
    <>
      <div>Dashboard, Welcome {authState.username}</div>
      <Task />
    </>
    
  )
}

export default Dashboard