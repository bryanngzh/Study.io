import Task from "../components/Task";
import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { Heading } from '@chakra-ui/react'
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { Box, Text } from '@chakra-ui/react'


const Dashboard = () => {

  const { authState } = useContext(AuthContext);

  let navigate = useNavigate();

    useEffect(() => {
        if (!authState.status) {
          navigate('/');
        }
    })

  function FeatureTask({ title, desc, display, ...rest }) {
    return (
      <Box p={5} shadow='md' borderWidth='1px' width='80%' {...rest}>
        <Task/>
        <Heading fontSize='xl'>{title}</Heading>
        <Text mt={4}>{desc}</Text>
      </Box>
    )
  }

  return (
    <>
      <VStack spacing={10} padding='10px'>
        {/* <Heading size="md">Welcome back, {authState.username.toUpperCase()}</Heading> */}
        <FeatureTask />
      </VStack>
      
    </>
    
  )
}

export default Dashboard