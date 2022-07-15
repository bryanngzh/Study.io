import ReminderModal from './ReminderModal'
import axios from "axios"
import { useState, useEffect } from 'react'
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
  Center, HStack, VStack, Stack, Button, Heading, Badge, Flex, Spacer
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
import { FaTelegram } from 'react-icons/fa'
import TelegramModal from './TelegramModal'
import ReminderClearModal from './ReminderClearModal'
import { Divider } from '@chakra-ui/react'
import { Text, Highlight } from '@chakra-ui/react'



const Reminder = () => {
  
  const [reminders, setReminders] = useState([])
  const [toggle, setToggle] = useState(false)

  const colors = ["green", "yellow", "blue", "purple", "cyan", "pink", "orange", "teal"]

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

// const clearExpired = () => {
//   reminders.filter(x => x.isExpired === true).map(y => deleteReminder(y));
// }
  
  return (
    <div title="reminder"> 
      <Stack spacing={4}>
        <Box>
        <Stack spacing={4}>
          <Heading as='h4' size='md'> Upcoming Events </Heading>
          <Box>
            <TableContainer>
                      <Table variant='simple' size="md" className="table-tiny">
                          <Thead>
                          <Tr>
                              <Th> Date </Th>
                              <Th> Event </Th>
                              <Th> Tags </Th>
                              <Th> Notes </Th>
                              <Th> </Th>
                          </Tr>
                          </Thead>
                          <Tbody>
                              {reminders.filter(x => !x.isExpired).sort(function(a,b){
                                  return a.startTime - b.startTime
                                }).sort(function(a,b){
                                  return new Date(a.date) - new Date(b.date)
                                }).map(reminder => (
                                  <Tr>
                                      <>
                                        <Td>
                                            {reminder.date + " @ " + detailedTime[reminder.startTime] + " - " + detailedTime[reminder.endTime]}
                                        </Td>
                                        <Td>
                                            {reminder.event}
                                        </Td>
                                        <Td>
                                            <Badge colorScheme={colors[reminder.event.charCodeAt(0)%8]}> { reminder.tags }</Badge>
                                        </Td>
                                        <Td>
                                            {reminder.notes}
                                        </Td>
                                        <Td>
                                          <IconButton variant="ghost" size="sm" icon={<DeleteIcon />} onClick={() => deleteReminder(reminder)} />
                                        </Td>
                                      </>
                                  </Tr>
                              ))}
                          </Tbody>
                          <Tfoot>
                            <Tr>
                                <Th> </Th>
                                <Th isNumeric> </Th>
                                <Th> </Th>
                                <Th> </Th>
                            </Tr>
                          </Tfoot>
                      </Table>
                  </TableContainer>
                    <Flex>  
                      <Spacer />
                      <HStack spacing={2}>
                      <Button colorScheme='black' onClick={() => setToggle(!toggle)} variant='outline'> {!toggle ? <Text> Show Expired</Text> : <Text> Hide Expired</Text> }  </Button>
                      <ReminderModal />
                      <TelegramModal />
                      </HStack>
                    </Flex>
                  </Box> 
                </Stack>
          </Box>
          <Box>
            
          </Box>
          { toggle 
            ?
              reminders.filter(x => x.isExpired).length > 0 ?
              <>
              <Divider />
              <Box>
              <Stack spacing={4}>
              <Heading as='h4' size='md'> Expired Events </Heading>
              <Box>
                <TableContainer>
                          <Table variant='simple' size="md" className="table-tiny">
                              <Thead>
                              <Tr>
                                  <Th> Date </Th>
                                  <Th> Event </Th>
                                  <Th> Tags </Th>
                                  <Th> Notes </Th>
                                  <Th> </Th>
                              </Tr>
                              </Thead>
                              <Tbody>
                                  {reminders.filter(x => x.isExpired).sort(function(a,b){
                                      return a.startTime - b.startTime
                                    }).sort(function(a,b){
                                      return new Date(a.date) - new Date(b.date)
                                    }).map(reminder => (
                                      <Tr>
                                          <>
                                            <Td>
                                                <Text color='red'>
                                                  {reminder.date + " @ " + detailedTime[reminder.startTime] + " - " + detailedTime[reminder.endTime]}
                                                </Text>
                                            </Td>
                                            <Td>
                                                <Text color='red'>
                                                  {reminder.event}
                                                </Text>
                                            </Td>
                                            <Td>
                                                <Badge colorScheme='red'> { reminder.tags }</Badge>
                                            </Td>
                                            <Td>
                                                <Text color='red'>
                                                  {reminder.notes}
                                                </Text>
                                            </Td>
                                            <Td>
                                              <IconButton variant="ghost" size="sm" icon={<DeleteIcon />} onClick={() => deleteReminder(reminder)} />
                                            </Td>
                                          </>
                                      </Tr>
                                  ))}
                              </Tbody>
                              <Tfoot>
                                <Tr>
                                    <Th> </Th>
                                    <Th isNumeric> </Th>
                                    <Th> </Th>
                                    <Th> </Th>
                                </Tr>
                              </Tfoot>
                          </Table>
                      </TableContainer>
                      </Box> 
                    </Stack>
                    <Flex>  
                          <Spacer />
                          <HStack spacing={2}>
                          {/* <Button colorScheme='black' variant='outline' size='md' onClick={() => clearExpired()}>
                            Clear All
                          </Button> */}
                          <ReminderClearModal />
                          </HStack>
                        </Flex>
                    
              </Box>
              </>
              : 
              <>
              <Divider />
              <Center>
                <Heading  size='md'>
                  <Highlight
                    query='You do not have any expired events.'
                    styles={{ px: '2', py: '1', rounded: 'full', bg: 'red.100' }}
                  >
                    You do not have any expired events.
                  </Highlight>
                </Heading>
              </Center>
              </>
            : <> </>
            }
        </Stack>
    </div>
  )
}

export default Reminder