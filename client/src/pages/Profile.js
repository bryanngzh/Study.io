import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  useDisclosure,
  VStack,
  Tooltip
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [newUsername, setNewUsername] = useState("")
  const [currPassword, setCurrPassword] = useState("")
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { 
    isOpen: isOpenUserModal, 
    onOpen: onOpenUserModal, 
    onClose: onCloseUserModal 
} = useDisclosure()
  const { authState, setAuthState } = useContext(AuthContext);

  let navigate = useNavigate();

    useEffect(() => {
        if (!authState.status) {
          navigate('/')
        }
    })

  const updatePassword = () => {
    if (newPassword !== confirmNewPassword) {
      alert("New passwords do not match!")
    } else if (newPassword.length < 3){
      alert("New password has to have at least 3 characters!")
    } else {
      axios.post("/api/auth/updatePassword", {
        oldPassword: oldPassword,
        newPassword: newPassword,
      },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          }
        }
      ).then((res => {
        if (res.data.error) {
          alert(res.data.error);
        }
      }))
      onClose()
    }
  }

  const updateUser = () => {
    if (newUsername.length < 1) {
      alert("Username cannot be empty!")
    } else {
      axios.post("/api/auth/updateUsername", {
        Password: currPassword,
        newUsername: newUsername,
      },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          }
        }
      ).then((res => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          setAuthState({ ...authState, username: newUsername });
        }
      }))
      onCloseUserModal()
    }
  }

  return (
    <Flex
      minH={'85vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          User Profile Edit
        </Heading>
        <FormControl id="userName">
          <FormLabel>User Icon</FormLabel>
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar size="xl" src="https://bit.ly/sage-adebayo">
                <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<SmallCloseIcon />}
                />
              </Avatar>
            </Center>
            <Center w="full">
              <Button w="full">Change Icon</Button>
            </Center>
          </Stack>
        </FormControl>
        {/* <FormControl id="userName" isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            placeholder="UserName"
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            type="email"
          />
        </FormControl> */}
        {/* <FormControl id="password" isRequired>
          <FormLabel>Old Password</FormLabel>
          <Input
            placeholder="password"
            _placeholder={{ color: 'gray.500' }}
            type="password"
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>New Password</FormLabel>
          <Input
            placeholder="password"
            _placeholder={{ color: 'gray.500' }}
            type="password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </FormControl>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'red.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'red.500',
            }}>
            Cancel
          </Button>
          <Button
            bg={'blue.400'}
            color={'white'}
            w="full"
            onClick={updatePassword}
            _hover={{
              bg: 'blue.500',
            }}>
            Submit
          </Button>
        </Stack> */}
        <VStack bg={useColorModeValue('gray.50', 'gray.800')} rounded={'lg'} >
          <HStack spacing = {220}>
          <Text p='4' >
          <Tooltip label={authState.username} aria-label='A tooltip' fontSize='md'>
            Username
          </Tooltip>
          </Text>
          <Button onClick={onOpenUserModal}>Edit</Button>
          <Modal
            isOpen={isOpenUserModal}
            onClose={onCloseUserModal}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Update your Username</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Username</FormLabel>
                    <Input
                      defaultValue={authState.username}
                      onChange={(e) => setNewUsername(e.target.value)}
                    />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Current password</FormLabel>
                    <Input
                      type="password"
                      onChange={(e) => setCurrPassword(e.target.value)}
                    />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={updateUser}>
                  Save
                </Button>
                <Button onClick={onCloseUserModal}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
            </Modal>
          </HStack>

          <HStack spacing = "225px">
          <Text p='4' >
          <Tooltip label="******" aria-label='A tooltip' fontSize='md'>
            Password
          </Tooltip>
          </Text>
          <Button onClick={onOpen}>Edit</Button>
          <Modal
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Update your password</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel fontSize='xs'>CURRENT PASSWORD</FormLabel>
                    <Input
                      type="password"
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel fontSize='xs'>NEW PASSWORD</FormLabel>
                    <Input
                      type="password"
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </FormControl>
                  
                <FormControl mt={4}>
                  <FormLabel fontSize='xs'>CONFIRM NEW PASSWORD</FormLabel>
                    <Input
                      type="password"
                      onChange={(e) => setConfirmNewPassword(e.target.value)} 
                    />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={updatePassword}>
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
            </Modal>
            </HStack>
          
        </VStack>
        
      </Stack>
    </Flex>
  );
}

export default Profile