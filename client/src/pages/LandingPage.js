import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router"
import axios from "axios"
//import { Link } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  IconProps,
  Icon,
  Link,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons'
const avatars = [
  {
    name: 'Ryan Florence',
    url: 'https://bit.ly/ryan-florence',
  },
  {
    name: 'Segun Adebayo',
    url: 'https://bit.ly/sage-adebayo',
  },
  {
    name: 'Kent Dodds',
    url: 'https://bit.ly/kent-c-dodds',
  },
  {
    name: 'Prosper Otemuyiwa',
    url: 'https://bit.ly/prosper-baba',
  },
  {
    name: 'Christian Nwamba',
    url: 'https://scontent.fsin5-1.fna.fbcdn.net/v/t1.18169-9/1520639_242116139290631_379303849_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=19026a&_nc_ohc=VDn5PKgsmqYAX9KfLTV&_nc_ht=scontent.fsin5-1.fna&oh=00_AT-wkVkZ0o35mWEjMLGqJrJ3r4Ao2sCaNeCoUgiZmhnJ1w&oe=62B5A5A4',
  },
];

const LandingPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { authState, setAuthState } = useContext(AuthContext);

  let navigate = useNavigate();

  useEffect(() => {
    if (authState.status) {
      navigate('/dashboard')
    }
  })

  const loginUser = (event) => {
    event.preventDefault()
    axios.post("http://localhost:3001/auth/login", {email, password}).then((response) => {
        if (response.data.error) {
            alert(response.data.error)
        } else {
          localStorage.setItem("accessToken", response.data.token)
          setAuthState({ username: response.data.username, id: response.data.id, status: true})
          navigate("/dashboard")
        }
    })
}

  return (
    <Box position={'relative'}>
      <Container
        as={SimpleGrid}
        maxW={'7xl'}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}>
        <Stack justify='center'>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}>
            Study.io{' '}
          </Heading>
          <Heading>
          <Text
              as={'span'}
              bgGradient="linear(to-r, red.400,pink.400)"
              bgClip="text">
              the all-in-one study platform
            </Text>{' '}
          </Heading>
          <Stack direction={'row'} spacing={4} align={'center'}>
            <AvatarGroup>
              {avatars.map((avatar) => (
                <Avatar
                  key={avatar.name}
                  name={avatar.name}
                  src={avatar.url}
                  // size={useBreakpointValue({ base: 'md', md: 'lg' })}
                  position={'relative'}
                  zIndex={2}
                  _before={{
                    content: '""',
                    width: 'full',
                    height: 'full',
                    rounded: 'full',
                    transform: 'scale(1.125)',
                    bgGradient: 'linear(to-bl, red.400,pink.400)',
                    position: 'absolute',
                    zIndex: -1,
                    top: 0,
                    left: 0,
                  }}
                />
              ))}
            </AvatarGroup>
            <Text fontFamily={'heading'} fontSize={{ base: '4xl', md: '6xl' }}>
              +
            </Text>
            <Flex
              align={'center'}
              justify={'center'}
              fontFamily={'heading'}
              fontSize={{ base: 'sm', md: 'lg' }}
              bg={'gray.800'}
              color={'white'}
              rounded={'full'}
              width={useBreakpointValue({ base: '44px', md: '60px' })}
              height={useBreakpointValue({ base: '44px', md: '60px' })}
              position={'relative'}
              _before={{
                content: '""',
                width: 'full',
                height: 'full',
                rounded: 'full',
                transform: 'scale(1.125)',
                bgGradient: 'linear(to-bl, orange.400,yellow.400)',
                position: 'absolute',
                zIndex: -1,
                top: 0,
                left: 0,
              }}>
              YOU
            </Flex>
          </Stack>
        </Stack>
        <Stack
          bg={'gray.50'}
          rounded={'xl'}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: 'lg' }}>
          <Stack spacing={4}>
            <Heading
              color={'gray.800'}
              lineHeight={1.1}
              fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
              Welcome back
              <Text
                as={'span'}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text">
                !
              </Text>
            </Heading>
            {/* <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
              We’re looking for amazing engineers just like you! Become a part
              of our rockstar engineering team and skyrocket your career!
            </Text> */}
          </Stack>
          <Box as={'form'} mt={10}>
            <Stack spacing={4}>
              <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
              />
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
              />
              <Button fontFamily={'heading'} bg={'blue.400'} color={'gray.800'} onClick={loginUser}>
                Login
              </Button>
            </Stack>
            {/* <Button
              fontFamily={'heading'}
              mt={8}
              w={'full'}
              bgGradient="linear(to-r, red.400,pink.400)"
              color={'white'}
              _hover={{
                bgGradient: 'linear(to-r, red.400,pink.400)',
                boxShadow: 'xl',
              }}>
              Submit
            </Button> */}
            <Stack pt={2}>
              <Text color={'gray.800'}>
                Don't have an account? <Link href="/register" color={'blue.400'}>
                Sign Up <ExternalLinkIcon mx='2px' />
                </Link>
              </Text> 
          </Stack>
          </Box>
        </Stack>
      </Container>
      <Blur
        position={'absolute'}
        top={300} // -10
        left={-10} // -10
        style={{ filter: 'blur(70px)' }}
      />
    </Box>
  );

    // return (
    //   <section className="landing">
    //     <div className="dark-overlay">
    //       <div className="landing-inner">
    //         <h1 className="x-large">Study.io</h1>
    //           <p className="lead">
    //             The all-in-one productivity platform 
    //           </p>
    //         <div className="buttons">
    //           <Link to="/register" className="btn btn-primary">Sign Up</Link>
    //           <Link to="/login" className="btn btn-light">Login</Link>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    // )
}

export const Blur = (props) => {
  return (
    <Icon
      width={useBreakpointValue({ base: '100%', md: '40vw', lg: '30vw' })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="400px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};

export default LandingPage