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
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'

const ForgotPassword = (props) => {
    const [email, setEmail] = useState("")
    const [sent, setSent] = useState(false)

    const { authState } = useContext(AuthContext);

    let navigate = useNavigate();

    useEffect(() => {
        if (authState.status) {
          navigate('/dashboard')
        }
    })

    const sendEmail = (event) => {

      axios.post("/api/auth/requestPasswordReset", {email: email, redirectUrl: "http://localhost:3000"}).then((response) => {
        console.log(response.data)
        if (response.data.error) {
          alert(response.data.error)
        } else {
          setSent(true)
          setEmail("")
        }
      })
    }

    return (
        <>
          <Flex
            minH={'60vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('white.100', 'black.900')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
              <Stack align={'center'}>
                <Heading fontSize={'4xl'} textAlign={'center'}>
                  Reset Password
                </Heading>
                <Text fontSize={'lg'} color={'gray.600'}>
                  It seems like you have forgotten your password. 
                </Text>
                <Text fontSize={'lg'} color={'gray.600'}>
                  Don't worry we got your back! ✌️
                </Text>
              </Stack>
              <Box
                rounded={'lg'}
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'lg'}
                p={8}>
                <Stack spacing={4}>
                  <FormControl id="email" isRequired>
                    <FormLabel>Email address</FormLabel>
                      <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                      />
                  </FormControl>
                  <Stack spacing={10} pt={2}>
                    <Button
                      onClick={() => sendEmail()}
                      size="lg"
                      bg={'blue.400'}
                      color={'white'}
                      _hover={{
                        bg: 'blue.500',
                      }}>
                      Reset Password
                    </Button>
                  </Stack>
                </Stack>
              </Box>
              {!sent ? <> </> : 
            <Alert status='success'>
              <AlertIcon />
              Please check your email for instructions on how to reset your password.
            </Alert>}
            </Stack>
          </Flex>
        </>
        
      );
}

export default ForgotPassword