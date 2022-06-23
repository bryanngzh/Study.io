import React from 'react'
import { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, useDisclosure, Button, HStack, VStack, FormControl, Box, Select, Stack, Input,
    FormLabel, 
  } from '@chakra-ui/react'
import { SingleDatepicker } from 'chakra-dayzed-datepicker'
import axios from 'axios'

const ReminderModal = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    //default drawer settings
    const [drawerDay, setDrawerDay] = useState(0);
    const [drawerTime, setDrawerTime] = useState(0);
    const [drawerEndTime, setDrawerEndTime] = useState(0);

    const [date, setDate] = useState(new Date());
    const [message, setMessage] = useState("");
    const [tag, setTag] = useState("");
    const [note, setNote] = useState("");

    const detailedTime = ["00:00", "00:10", "00:20", "00:30", "00:40", "00:50", "01:00", "01:10", "01:20",
    "01:30", "01:40", "01:50", "02:00", "02:10", "02:20", "02:30", "02:40", "02:50", "03:00", "03:10",
    "03:20", "03:30", "03:40", "03:50", "04:00", "04:10", "04:20", "04:30", "04:40", "04:50", "05:00",
    "05:10", "05:20", "05:30", "05:40", "05:50", "06:00", "06:10", "06:20", "06:30", "06:40", "06:50",
    "07:00", "07:10", "07:20", "07:30", "07:40", "07:50", "08:00", "08:10", "08:20", "08:30", "08:40",
    "08:50", "09:00", "09:10", "09:20", "09:30", "09:40", "09:50", "10:00", "10:10", "10:20", "10:30",
    "10:40", "10:50", "11:00", "11:10", "11:20", "11:30", "11:40", "11:50", "12:00", "12:10", "12:20",
    "12:30", "12:40", "12:50", "13:00", "13:10", "13:20", "13:30", "13:40", "13:50", "14:00", "14:10",
    "14:20", "14:30", "14:40", "14:50", "15:00", "15:10", "15:20", "15:30", "15:40", "15:50", "16:00",
    "16:10", "16:20", "16:30", "16:40", "16:50", "17:00", "17:10", "17:20", "17:30", "17:40", "17:50",
    "18:00", "18:10", "18:20", "18:30", "18:40", "18:50", "19:00", "19:10", "19:20", "19:30", "19:40",
    "19:50", "20:00", "20:10", "20:20", "20:30", "20:40", "20:50", "21:00", "21:10", "21:20", "21:30",
    "21:40", "21:50", "22:00", "22:10", "22:20", "22:30", "22:40", "22:50", "23:00", "23:10", "23:20",
    "23:30", "23:40", "23:50"]

    const makeDetailedTiming = () => {
        const box = [];
        for (let i = 0; i < detailedTime.length; i++) {
          box.push(<option value={i}>{detailedTime[i]}</option>)
        }
        return box;
    }

    const addReminder = (e) => {
        e.preventDefault()
        if (message.length > 0 && tag.length > 0) {
            axios.post("/api/reminder/addReminder", {
            date: date, startTime: drawerTime, endTime: drawerEndTime, 
            event: message, tags: tag, notes: note, isReminded: false,
            }, {
                headers: {
                    accessToken: localStorage.getItem("accessToken")
                },
            }).then((response) => {
                if (response.data.error) {
                    alert(response.data.error)
                } else {
                    // setReminders([...reminders, response.data])
                    setDate(new Date())
                    setMessage("")
                    setTag("")
                    setNote("")
                }
            })
        } else {
            alert("Please add a reminder!")
        }
        onClose();  
    }

    return (
    <>
        <Button onClick={onOpen} variant='outline' size='md'> + </Button>
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Add a Reminder</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <form
                id="new-form"
                onSubmit={addReminder}
                >
                <FormControl>
                    <Stack>
                        <Box>
                            <FormLabel htmlFor='amount'>Date</FormLabel>
                            <SingleDatepicker
                                name="date-input"
                                date={date}
                                onDateChange={setDate}
                            />
                        </Box>  
                        <Box>
                            <FormLabel htmlFor='amount'>Time</FormLabel>
                                <HStack>
                                    <Select id='startTime' value={drawerTime} onChange={(e) => setDrawerTime(e.target.value)}>
                                        {makeDetailedTiming()}
                                    </Select>
                                    <Select id='endTime' defaultValue={drawerEndTime} onChange={(e) => setDrawerEndTime(e.target.value)}>
                                        {makeDetailedTiming()}
                                    </Select>
                                </HStack>
                        </Box>
                        <Box>
                            <FormLabel htmlFor='amount'>Event</FormLabel>
                                <Input
                                    size="md" 
                                    placeholder="Add a reminder..." 
                                    value={message}
                                    type="text"
                                    onChange={e => setMessage(e.target.value)}
                                />
                        </Box>
                        <Box>
                            <FormLabel htmlFor='amount'>Tags</FormLabel>
                            <Input
                                size="md" 
                                placeholder="Add a tag..." 
                                value={tag}
                                type="text"
                                onChange={e => setTag(e.target.value)}
                            />
                        </Box>
                        <Box>
                            <FormLabel htmlFor='amount'>Notes</FormLabel>
                            <Input
                                size="md" 
                                placeholder="Add a note..." 
                                value={note}
                                type="text"
                                onChange={e => setNote(e.target.value)}
                            />
                        </Box>
                    </Stack>
                </FormControl>
            </form>
            </ModalBody>
            <ModalFooter>
            <Button type="submit" form="new-form">Add</Button>
            </ModalFooter>
        </ModalContent>
        </Modal>
    </>
    )
}

export default ReminderModal