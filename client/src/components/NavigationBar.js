import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';
import { ReactNode } from 'react';
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
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';

const Links = ['dashboard'];

const NavigationBar = () => {

  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { authState, setAuthState } = useContext(AuthContext);

  const logout = () => {
    localStorage.removeItem("accessToken")
    setAuthState({ username: "", id: 0, status: false });
  }

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
              <Box boxSize='50px'>
                <Image src='https://i.imgur.com/G6ByvaT.png' alt='Dan Abramov' />
              </Box>
            </Link>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {authState.status ? (
                Links.map((link) => (
                  <Link to={"/" + link}>{link.charAt(0).toUpperCase() + link.slice(1)}</Link>
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
                    src={
                      'https://media-exp1.licdn.com/dms/image/C4E03AQHwlfUhM7x8RA/profile-displayphoto-shrink_200_200/0/1621594176290?e=1658966400&v=beta&t=hWt-GG3mf4Ds_BIKuGsOfgOqs81wJQtCW-r6hSZwAoU'
                    }
                  />
                </MenuButton>
              ) : <></>}
              <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://media-exp1.licdn.com/dms/image/C4E03AQHwlfUhM7x8RA/profile-displayphoto-shrink_200_200/0/1621594176290?e=1658966400&v=beta&t=hWt-GG3mf4Ds_BIKuGsOfgOqs81wJQtCW-r6hSZwAoU'}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{authState.username}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </MenuList>
              </Menu>
              </Stack>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
            {authState.status ? (
                Links.map((link) => (
                  <Link to={"/" + link}>{link.charAt(0).toUpperCase() + link.slice(1)}</Link>
                )) 
              ) : <></>}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}

export default NavigationBar