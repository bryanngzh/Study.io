import { useState, useEffect } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, useDisclosure, Button, HStack, VStack, FormControl, Box, Select, Stack, Input,
    FormLabel, Heading,
  } from '@chakra-ui/react'
import axios from 'axios'
import { FaTelegram } from 'react-icons/fa'

const TelegramModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [token, setToken] = useState(" ")

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            axios.get("/api/auth/token", {
                headers: {
                    accessToken: localStorage.getItem("accessToken")
                },
            }).then((response) => {
            if (response.data.error) {
                alert(response.data.error)
            } else {
                setToken(response.data)
            }
        })
        }
    }, [token])

    return (
        <>
        <Button colorScheme='telegram' leftIcon={<FaTelegram />} onClick={onOpen} size='md' variant='outline'>
            Telegram
        </Button>
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>@studyio_reminder_bot</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <FormLabel htmlFor='amount'>Your unique token_id:</FormLabel>
            <Input
                size="md" 
                value={token}
                type="text"
            />
            </ModalBody>
            <ModalFooter>
            <Button onClick={onClose}>Close</Button>
            </ModalFooter>
        </ModalContent>
        </Modal>
    </>
    )
}

export default TelegramModal