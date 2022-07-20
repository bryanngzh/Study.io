import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';
import { ImageContext } from '../helpers/ImageContext';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Image,
  // Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { set } from 'mongoose';

const Links = ['dashboard','notes'];

const NavigationBar = () => {

  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { authState, setAuthState } = useContext(AuthContext);
  const { imageState, setImageState } = useContext(ImageContext)
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');

  let navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("accessToken")
    setAuthState({ username: "", id: 0, status: false});
  }

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
  }, [imageState])

  return (
    <>
      <Box bg={useColorModeValue('white.100', 'black.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Link to={authState.status?"/dashboard":"/"}>
              <Box>
                <Image src={ colorMode === 'light' ? 'https://i.postimg.cc/85JHBVQ5/logo-2.png' : 'https://i.postimg.cc/vHLvvzjW/image-3.png'} height='50' alt='logo' />
              </Box>
            </Link>
            <HStack
              as={'nav'}
              spacing={8}
              display={{ base: 'none', md: 'flex' }}>
              {authState.status ? (
                Links.map((link) => (
                  <Link
                    fontSize={'sm'}
                    fontWeight={500}
                    color={linkColor}
                    _hover={{
                      textDecoration: 'none',
                      color: linkHoverColor,
                    }} 
                    to={"/" + link}>{link.charAt(0).toUpperCase() + link.slice(1)}</Link>
                )) 
              ) : <></>}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
          <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
            <Menu>
              {authState.status ? (
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={imageState}
                  />
                </MenuButton>
              ) : <></>}
              <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={imageState}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{authState.username}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem onClick={() => navigate("/profile") }>Profile</MenuItem>
                  {/* <MenuItem>Account Settings</MenuItem> */}
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </MenuList>
              </Menu>
              </Stack>
          </Flex>
        </Flex>
          <Drawer
            isOpen={isOpen}
            placement='left'
            onClose={onClose}
            size="xs"
          >
            <DrawerOverlay />
              <DrawerContent w="200px" maxW="200px">
                <Stack as={'nav'} spacing={4} p={5}>
                  {authState.status ? (
                      Links.map((link) => (
                        <Link to={"/" + link} onClick={onClose} >{link.charAt(0).toUpperCase() + link.slice(1)}</Link>
                      )) 
                    ) : <></>}
                </Stack>
              <DrawerCloseButton />
            </DrawerContent>
          </Drawer>
    

        {/* {isOpen ? (
          <Box pb={4} display={{ md: 'none' }} z-index={10} position="absolute">
            <Stack as={'nav'} spacing={4} >
            {authState.status ? (
                Links.map((link) => (
                  <Link to={"/" + link}  >{link.charAt(0).toUpperCase() + link.slice(1)}</Link>
                )) 
              ) : <></>}
            </Stack>
          </Box>
        ) : null} */}
      </Box>
    </>
  );
}

export default NavigationBar