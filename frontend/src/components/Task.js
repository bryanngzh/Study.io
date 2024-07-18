import { useState, useEffect } from "react"
import axios from "axios"
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    useColorModeValue,
    Center, Stack, HStack, Spacer, Flex
  } from '@chakra-ui/react'
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText, Heading,
  } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { IconButton } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import TaskModal from "./TaskModal"


const Task = () => {

    const [inputVal, setInputVal] = useState("")
    const [tasks, setTasks] = useState([])

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

    const addTask = (event) => {
        
        event.preventDefault()
        if (inputVal.length > 0) {
            axios.post("/api/task/addTask", {
            text: inputVal, completed: false,
            }, {
                headers: {
                    accessToken: localStorage.getItem("accessToken")
                },
            }).then((response) => {
                if (response.data.error) {
                    alert(response.data.error)
                } else {
                    // setTasks([...tasks, response.data])
                    setTasks([...tasks])
                    setInputVal("")
                }
            })
        } else {
            alert("Please add a task!")
        }
        
    }

    const toggleTask = (event) => {
        axios.post("/api/task/toggle", {
            _id: event._id, completed: !event.completed,
        }, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            },
        }).then((response) => {
            if (response.data.error) {
                alert(response.data.error)
            } else {
                const newTasks = tasks.map(task => {
                    if (task._id === event._id) {
                        task.completed = !event.completed
                    }
                    return task
                })
                setTasks([...newTasks])
            }
        })
    }

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

    const numberOfTasks = () => {
        if (tasks.length === 0) {
            return ("Press Enter to add a task")
        } else {
            if (tasks.length > 1) {
                return (tasks.filter(task => task.completed).length + "/" + tasks.length + " tasks completed")
            } else {
                return (tasks.filter(task => task.completed).length + "/" + tasks.length + " task completed")
            }
        }
    }

    return (
        <div title="taskbar">
            <Stack>

                <Heading as='h4' size='md'> Tasks 📝  </Heading>
                <Box bg={useColorModeValue('white.100')} align={'center'} justify={'center'} p={4} >
                    <form className="form" onSubmit={addTask}>
                        <FormControl>
                            <Input
                                size="md" 
                                placeholder="Add a task..." 
                                value={inputVal}
                                type="text"
                                onChange={e => setInputVal(e.target.value)}
                            />
                        </FormControl>
                    </form>
                    <TableContainer>
                        <Table variant='simple' size="md" className="table-tiny">
                            <Thead>
                            <Tr>
                                <Th></Th>
                                <Th isNumeric> </Th>
                            </Tr>
                            </Thead>
                            <Tbody>
                                {tasks.map(task => (
                                    <Tr>
                                        <>
                                        <Td>
                                            <Box>
                                                <Checkbox onChange={() => toggleTask(task)} isChecked={task.completed}>{task.completed ? <del>{task.text}</del> : task.text} </Checkbox>
                                            </Box>
                                        </Td>
                                        <Td isNumeric>
                                            <IconButton variant="ghost" size="sm" icon={<DeleteIcon />} onClick={() => deleteTask(task)} />
                                        </Td>
                                        </>
                                    </Tr>
                                ))}
                            </Tbody>
                            <Tfoot>
                            <Tr>
                                <Th> </Th>
                                <Th isNumeric>{numberOfTasks()}</Th>
                                {/* <Th isNumeric>{tasks.filter(task => task.completed).length}/{tasks.length} Task{tasks.length > 1 ? "s" : ""} Done</Th> */}
                            </Tr>
                            </Tfoot>
                        </Table>
                    </TableContainer>
                </Box>
                <Flex>  
                          <Spacer />
                          <HStack spacing={2}>
                          <TaskModal />
                          </HStack>
                </Flex>
            </Stack>

            
        </div>
    )
    
}

export default Task