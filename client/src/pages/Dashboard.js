import Task from "../components/Task";
import Timetable from "../components/Timetable";
import Pomodoro from "../components/Pomodoro";
import Reminder from "../components/Reminder"
import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { Heading } from '@chakra-ui/react'
import { Stack, HStack, VStack, StackDivider} from '@chakra-ui/react'
import { Box, Text } from '@chakra-ui/react'
import axios from "axios";
import { ImageContext } from "../helpers/ImageContext";



const Dashboard = () => {

  const { authState } = useContext(AuthContext);
  const { setImageState} = useContext(ImageContext)

  let navigate = useNavigate();

    useEffect(() => {
        if (!authState.status) {
          navigate('/');
        }
    })
  
    useEffect(() => {
      axios.get('/api/auth/getPicture', {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((response) => {
        if (response.data.error) {
        } else {
          setImageState(response.data)
        }
      })
    }, [])

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

  function FeaturePomodoro({ title, desc, display, ...rest }) {
    return (
      <Box p={5} shadow='md' borderWidth='1px' width='80%' {...rest}>
        <Pomodoro />
        <Heading fontSize='xl'>{title}</Heading>
        <Text mt={4}>{desc}</Text>
      </Box>
    )
  }

  function FeatureReminder({ title, desc, display, ...rest }) {
    return (
      <Box p={5} shadow='md' borderWidth='1px' width='80%' {...rest}>
        <Reminder/>
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
        <VStack spacing={30} padding='10px' width='100%' height='100%'>
          <FeaturePomodoro />  
          <FeatureTask />   
          <FeatureReminder />
        </VStack>

      </VStack>
     
    </>
    
  )
}

export default Dashboard