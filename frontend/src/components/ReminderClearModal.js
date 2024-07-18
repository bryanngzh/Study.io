import { useState, useEffect } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, useDisclosure, Button, HStack, VStack, FormControl, Box, Select, Stack, Input,
    FormLabel, Heading, useClipboard, Flex, Center,
  } from '@chakra-ui/react'
import axios from 'axios'
import { FaTelegram } from 'react-icons/fa'

const ReminderClearModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [token, setToken] = useState(" ")
    const { hasCopied, onCopy } = useClipboard(token)
    const [reminders, setReminders] = useState([])

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

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            axios.get("/api/reminder", {
                headers: {
                    accessToken: localStorage.getItem("accessToken")
                },
            }).then((response) => {
            if (response.data.error) {
                alert(response.data.error)
            } else {
                setReminders(response.data)
            }
        })
        }
    }, [reminders])

    const deleteReminder = (event) => {
        axios.post("/api/reminder/deleteReminder", {
            _id: event._id, 
        }, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            },
        }).then((response) => {
            if (response.data.error) {
                alert(response.data.error)
            } else {
                setReminders([...reminders])
            }
        })
      }
      
      const clearExpired = () => {
        reminders.filter(x => x.isExpired === true).map(y => deleteReminder(y));
      }

    return (
        <div title="ReminderClearModal">
        <Button colorScheme='black' onClick={onOpen} size='md' variant='outline'>
            Clear All
        </Button>
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Clear Events?</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                Are you sure you want to delete all expired reminders?
            </ModalBody>
            <ModalFooter>
                <HStack>
                    <Button onClick={() => clearExpired()}>Yes</Button>
                    <Button onClick={onClose}>No</Button>
                </HStack>
            </ModalFooter>
        </ModalContent>
        </Modal>
    </div>
    )
}

export default ReminderClearModal