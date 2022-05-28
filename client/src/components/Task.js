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
    Center,
  } from '@chakra-ui/react'
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { IconButton } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'



const Task = () => {

    const [inputVal, setInputVal] = useState("")
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            axios.get("http://localhost:3001/task", {
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
            axios.post("http://localhost:3001/task/addTask", {
            text: inputVal, completed: false,
            }, {
                headers: {
                    accessToken: localStorage.getItem("accessToken")
                },
            }).then((response) => {
                if (response.data.error) {
                    alert(response.data.error)
                } else {
                    setTasks([...tasks, response.data])
                    setInputVal("")
                }
            })
        } else {
            alert("Please add a task!")
        }
        
    }

    const toggleTask = (event) => {
        axios.post("http://localhost:3001/task/toggle", {
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
        axios.post("http://localhost:3001/task/deleteTask", {
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

    return (
        <div>
            <Box bg={useColorModeValue('white.100', 'yellow.50')}  align={'center'} justify={'center'} w='40%' p={4} >
                <form className="form" onSubmit={addTask}>
                    <FormControl>
                        <FormLabel>Tasks</FormLabel>
                        <Input
                            size="sm" 
                            placeholder="Add a task..." 
                            value={inputVal}
                            type="text"
                            onChange={e => setInputVal(e.target.value)}
                        />
                    </FormControl>
                </form>
                <TableContainer>
                    <Table variant='striped' colorScheme='telegram' size="sm">
                        <Thead>
                        <Tr>
                            <Th>Completed</Th>
                            <Th>Task</Th>
                            <Th isNumeric> </Th>
                        </Tr>
                        </Thead>
                        <Tbody>
                            {tasks.map(task => (
                                <Tr>
                                    <><Td>
                                        <Box onClick={() => toggleTask(task)}>
                                            <Checkbox defaultChecked isChecked={task.completed}> </Checkbox>
                                        </Box>
                                    </Td>
                                    <Td>
                                        {task.completed ? <del>{task.text}</del> : task.text}
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
                            <Th> </Th>
                            <Th isNumeric>{tasks.filter(task => task.completed).length}/{tasks.length} Task{tasks.length > 1 ? "s" : ""} Done</Th>
                        </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    )
    
}

export default Task