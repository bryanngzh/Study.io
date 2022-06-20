import React from 'react'
import axios from "axios"
import { useState } from 'react'
import { SingleDatepicker } from 'chakra-dayzed-datepicker'
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
  Center, HStack, VStack, Stack, Button
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

const Reminder = () => {
  const [date, setDate] = useState(new Date());
  const [message, setMessage] = useState("");
  const [tag, setTag] = useState("");
  const [note, setNote] = useState("");
  const [reminders, setReminders] = useState([])
    
  const addReminder = (event) => {
    event.preventDefault()
    if (message.length > 0 && tag.length > 0) {
        axios.post("/api/reminder/addReminder", {
        remindAt: date, reminderMsg: message, tag: tag, notes: note, isReminded: false,
        }, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            },
        }).then((response) => {
            if (response.data.error) {
                alert(response.data.error)
            } else {
                // setTasks([...tasks, response.data])
                setReminders([...reminders])
                setDate(new Date())
                setMessage("")
                setTag("")
                setNote("")
            }
        })
    } else {
        alert("Please add a reminder!")
    }  
  }
  
  return (
    <div> 
        <Box>
          <form className="form">
              <FormControl>
                  <FormLabel>Reminders</FormLabel>
                  <HStack>
                    <SingleDatepicker
                      name="date-input"
                      date={date}
                      onDateChange={setDate}
                    />
                    <Input
                        size="sm" 
                        placeholder="Add a reminder..." 
                        value={message}
                        type="text"
                        onChange={e => setMessage(e.target.value)}
                    />
                    <Input
                        size="sm" 
                        placeholder="Add a tag..." 
                        value={tag}
                        type="text"
                        onChange={e => setTag(e.target.value)}
                    />
                    <Input
                        size="sm" 
                        placeholder="Add a note..." 
                        value={note}
                        type="text"
                        onChange={e => setNote(e.target.value)}
                    />
                    <Button type="submit" form="new-form">Add</Button>
                  </HStack>  
              </FormControl>
          </form>
          
        </Box> 
        
        
    </div>
  )
}

export default Reminder