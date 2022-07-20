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

const TaskModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [token, setToken] = useState(" ")
    const [tasks, setTasks] = useState([])

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
            axios.get("/api/task", {
                headers: {
                    accessToken: localStorage.getItem("accessToken")
                },
            }).then((response) => {
            if (response.data.error) {
                alert(response.data.error)
            } else {
                setTasks(response.data)
            }
        })
        }
    }, [tasks])

    const deleteTask = (event) => {
        axios.post("/api/task/deleteTask", {
            _id: event._id, 
        }, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            },
        }).then((response) => {
            if (response.data.error) {
                alert(response.data.error)
            } else {
                setTasks([...tasks])
            }
        })
      }
      
      const clearCompleted = () => {
        tasks.filter(x => x.completed === true).map(y => deleteTask(y));
        onClose();
      }

    return (
        <div title="ReminderClearModal">
        <Button colorScheme='black' onClick={onOpen} size='md' variant='outline'>
            Clear Completed
        </Button>
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Clear Tasks?</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                Are you sure you want to clear all completed tasks?
            </ModalBody>
            <ModalFooter>
                <HStack>
                    <Button onClick={() => clearCompleted()}>Yes</Button>
                    <Button onClick={onClose}>No</Button>
                </HStack>
            </ModalFooter>
        </ModalContent>
        </Modal>
    </div>
    )
}

export default TaskModal