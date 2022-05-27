import Task from "../components/Task";
import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { Heading } from '@chakra-ui/react'

const Dashboard = () => {

  const { authState } = useContext(AuthContext);

  let navigate = useNavigate();

    useEffect(() => {
        if (!authState.status) {
          navigate('/');
        }
    })

  return (
    <>
      <Heading size="md">Welcome back, {authState.username.toUpperCase()}</Heading>
      <Task />
    </>
    
  )
}

export default Dashboard