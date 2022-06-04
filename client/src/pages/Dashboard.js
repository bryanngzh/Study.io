import Task from "../components/Task";
import Timetable from "../components/Timetable";
import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { Heading } from '@chakra-ui/react'
import { Stack, HStack, VStack, StackDivider} from '@chakra-ui/react'
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

  function FeatureTimetable({ title, desc, display, ...rest }) {
    return (
      
      <Box p={5} shadow='md' borderWidth='1px' width='80%' {...rest}  >
        <Timetable/>
        <Heading fontSize='xl'>{title}</Heading>
        <Text mt={4}>{desc}</Text>
        </Box>
        
    )
  }

  return (
    <>
      
      <VStack spacing={10} padding='10px'divider={<StackDivider borderColor='gray.200' />}
  >
        {/* <Heading size="md">Welcome back, {authState.username.toUpperCase()}</Heading> */}
        <Timetable />
        <FeatureTask />      
      </VStack>
     
    </>
    
  )
}

export default Dashboard