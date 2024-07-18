import axios from "axios"
import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom";
//import { Link } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    Tooltip,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'

const Verification = (props) => {
    const [verified, setVerified] = useState()

    const { authState } = useContext(AuthContext);

    let navigate = useNavigate();

    useEffect(() => {
        if (authState.status) {
          navigate('/dashboard')
        }
    })

    useEffect(() => {
        axios.post("/api/auth/verify", {
            userId: props.user.split("/")[2],
            uniqueString: props.user.split("/")[3],
        }).then((response) => {
            if (response.data.error) {
                setVerified(false)
            } else {
                setVerified(true)
            }
        })
    }, [verified])

    console.log(verified)
    console.log(props.user.split("/")[2])
    console.log(props.user.split("/")[3])


    return (
        verified ? <> <Alert status='success'>
        <AlertIcon />
        Your account has been verified. 
      </Alert> </> : <> <Alert status='error'>
        <AlertIcon />
        There was an error verifying your account / Your account is already verified. Please try again later, or contact support. 
      </Alert> </>
      );
}

export default Verification