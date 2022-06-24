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
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const Registration = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { authState } = useContext(AuthContext);

    let navigate = useNavigate();

    useEffect(() => {
        if (authState.status) {
          navigate('/dashboard')
        }
    })


    const registerUser = (event) => {
      event.preventDefault()
      axios.post("/api/auth", {username, email, password, confirmPassword}).then((response) => {
        console.log(response.data)
        if (response.data.error) {
            alert(response.data.error)
        } else {
            navigate("/")
        }
      })
    }

    return (
        <Flex
          minH={'60vh'}
          align={'center'}
          justify={'center'}
          bg={useColorModeValue('white.100', 'black.900')}>
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
              <Heading fontSize={'4xl'} textAlign={'center'}>
                Sign up
              </Heading>
              <Text fontSize={'lg'} color={'gray.600'}>
                to enjoy all of our cool features ✌️
              </Text>
            </Stack>
            <Box
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={8}>
              <Stack spacing={4}>
                <HStack>
                  {/* <Box> */}
                    <FormControl id="username" isRequired>
                      <FormLabel>Username</FormLabel>
                      <Input 
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </FormControl>
                  {/* </Box> */}
                  {/* <Box>
                    <FormControl id="lastName">
                      <FormLabel>Last Name</FormLabel>
                      <Input type="text" />
                    </FormControl>
                  </Box> */}
                </HStack>
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'} 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}         
                    />
                    <InputRightElement h={'full'}>
                      <Button
                        variant={'ghost'}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }>
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
              </FormControl>
              <FormControl id="password" isRequired>
                  <FormLabel>Confirm Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'} 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}         
                    />
                    <InputRightElement h={'full'}>
                      <Button
                        variant={'ghost'}
                        onClick={() =>
                          setShowConfirmPassword((showConfirmPassword) => !showConfirmPassword)
                        }>
                        {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Stack spacing={10} pt={2}>
                  <Button
                    loadingText="Submitting"
                    onClick={registerUser}
                    size="lg"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}>
                    Sign up
                  </Button>
                </Stack>
                <Stack pt={6}>
                  <Text align={'center'}>
                    Already a user? <Link href="/" color={'blue.400'}>Login</Link>
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      );

    // return (
    //     <div>
    //          <h1 className="large text-primary">Sign Up</h1>
    //             <p className="lead">
    //                 <i className="fas fa-user"></i> Create Your Account
    //             </p>
    //         <form className="form" onSubmit={registerUser}>
    //           <div className="form-group">
    //             <input 
    //                 value={username}
    //                 onChange={(e) => setUsername(e.target.value)}
    //                 type="text"
    //                 placeholder="Username" 
    //             />
    //           </div>
    //           <div className="form-group">
    //             <input 
    //                 value={email}
    //                 onChange={(e) => setEmail(e.target.value)}
    //                 type="email"
    //                 placeholder="Email" 
    //             />
    //           </div>
    //           <div className="form-group">
    //             <input 
    //                 value={password}
    //                 onChange={(e) => setPassword(e.target.value)}
    //                 type="password"
    //                 placeholder="Password" 
    //                 />
    //             </div>
    //             <input type="submit" className="btn btn-primary" value="Register" />      
    //         </form>
    //         <p className="my-1">
    //           Already have an account? <Link to ="/login">Sign In</Link>
    //         </p>
    //     </div>
    // )
}

export default Registration