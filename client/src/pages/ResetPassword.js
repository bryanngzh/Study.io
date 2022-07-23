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

const ResetPassword = (props) => {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isReset, setisReset] = useState(false)

    const { authState } = useContext(AuthContext);

    let navigate = useNavigate();

    useEffect(() => {
        if (authState.status) {
          navigate('/dashboard')
        }
    })

    const changePassword = (event) => {

      axios.post("/api/auth/resetPassword", {userId: props.user.split("/")[2], resetString:props.user.split("/")[3], newPassword: password}).then((response) => {
        console.log(response.data)
        if (response.data.error) {
            alert(response.data.error)
        } else {
            navigate('/')
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
                Reset your password
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
                <FormControl id="password" isRequired>
                <FormLabel>New Password</FormLabel>
                <Tooltip label="Password must contain minimum 6 characters and 
                  have at least 1 special character. eg: !,?,@,$" aria-label='A tooltip'>
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
                  </Tooltip>
              </FormControl>
              <FormControl id="password" isRequired>
                  <FormLabel>Confirm New Password</FormLabel>
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
                    onClick={() => changePassword()}
                    size="lg"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}>
                    Change Password
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      );
}

export default ResetPassword