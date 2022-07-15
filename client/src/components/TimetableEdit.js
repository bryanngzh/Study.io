import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Stack,
  LightMode,
  Tooltip,
  Input,
  VStack,
  Text,
  HStack,
  Center,
  Select,
  Box,
  FormLabel,
  Textarea,
  ButtonGroup
} from '@chakra-ui/react'
import { SettingsIcon } from '@chakra-ui/icons'
import { useState, useEffect } from 'react'
import axios from 'axios'
import timeArray from './Time'

const TimetableEdit = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const info = props.details

  const [activityName, setActivityName] = useState(info.name);
  const [activityLocation, setActivityLocation] = useState(info.location);
  const [activityFrequency, setActivityFrequency] = useState(info.frequency);
  const [activityInfo, setActivityInfo] = useState(info.additionalInfo);
  const [activityColour, setActivityColour] = useState(info.colour);
  const [activityStartTime, setActivityStartTime] = useState(info.startTime);
  const [activityEndTime, setActivityEndTime] = useState(info.endTime);
  const [activityDay, setActivityDay] = useState(info.day);
  const [activityCode, setActivityCode] = useState(info.code);

  let handleInfoChange = (e) => {
    let inputValue = e.target.value;
    setActivityInfo(inputValue);
  }

  const editInfo = (id) => {
    var length = 0;
    if (+activityStartTime > +activityEndTime) {
      length = +144 - +activityStartTime + +activityEndTime;
    } else {
      length = +activityEndTime - +activityStartTime;
    }
    if (length === 0) {
      alert("Please input a valid time period")
      return
    } else if (length > 36) {
      alert("Activity cannot be longer than 6 hours")
      return
    }
    if (activityName.length > 0) {
      axios.post("api/timetable/change", {
        _id: id,
        name: activityName,
          day: activityDay,
          startTime: activityStartTime,
          endTime: activityEndTime,
          location: activityLocation,
          frequency: activityFrequency,
          additionalInfo: activityInfo,
          colour: activityColour,
          code: activityCode
        }, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            },
        }).then((response) => {
            if (response.data.error) {
                alert(response.data.error)
            } else {
              onClose();
            }
        })
    }
  }

  return (
    <div title="TimetableEdit">
      <Button onClick={onOpen} colorScheme="green" variant="solid">Edit</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Edit Activity
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Stack spacing='10px'>
              <Box>
                <FormLabel htmlFor='username'>Name</FormLabel>
                <Input
                  id='username'
                  placeholder='Please enter the activity'
                  value = {activityName}
                  onChange={(e) => setActivityName(e.target.value)}
                />
              </Box>
              {activityCode ? <Box>
                <FormLabel htmlFor='username'>Code</FormLabel>
                <Input
                  id='code'
                  placeholder='Code'
                  value={activityCode}
                  onChange={(e) => setActivityCode(e.target.value)}
                />
              </Box> : <></>}
              <Box>
                <FormLabel htmlFor='owner'>Day</FormLabel>
                <Select id='owner' value={activityDay} onChange={(e) => setActivityDay(e.target.value)}>
                  <option value={0}>Monday</option>
                  <option value={1}>Tuesday</option>
                  <option value={2}>Wednesday</option>
                  <option value={3}>Thursday</option>
                  <option value={4}>Friday</option>
                  <option value={5}>Saturday</option>
                  <option value={6}>Sunday</option>
                </Select>
              </Box>

              <Stack direction = "row" spacing={32}>
                <FormLabel htmlFor='owner'>Start time</FormLabel>
                <FormLabel htmlFor='owner'>End time</FormLabel>
              </Stack>

              <Stack direction='row' position="relative" top="-15px">
                <Select id='startTime' value={activityStartTime} onChange={(e) => setActivityStartTime(e.target.value)}>
                  {timeArray}
                </Select>
                <Select id='endTime' defaultValue={activityEndTime} onChange={(e) => setActivityEndTime(e.target.value)}>
                  {timeArray}
                </Select>
              </Stack>
  
              <Box position="relative" top="-15px">
                <FormLabel htmlFor='username'>Location</FormLabel>
                <Input
                  id='location'
                  placeholder='Optional'
                  value={activityLocation}
                  onChange = {(e) => setActivityLocation(e.target.value)}
                />
              </Box>
              <Box position="relative" top="-15px">
                <FormLabel htmlFor='username'>Frequency</FormLabel>
                <Input
                  id='frequency'
                  placeholder='Optional'
                  value={activityFrequency}
                  onChange = {(e) => setActivityFrequency(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel htmlFor='desc'>Additional Description</FormLabel>
                <Textarea
                  id='desc'
                  placeholder='Optional'
                  value={activityInfo}
                  onChange={handleInfoChange}
                />
              </Box>
              <Stack>
              <FormLabel htmlFor='desc'>Colour:</FormLabel>
              </Stack>
                <Select id='owner' value={activityColour} onChange={(e) => setActivityColour(e.target.value)}>
                  <option value={0}>Gray</option>
                  <option value={1}>Blue</option>
                  <option value={2}>Yellow</option>
                  <option value={3}>Green</option>
                  <option value={4}>Red</option>
                  <option value={5}>Orange</option>
                  <option value={6}>Teal</option>
                  <option value={7}>Pink</option>
                </Select>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup>
              <Button colorScheme='red' onClick={() => { editInfo(info._id);}}>Update</Button>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default TimetableEdit

{/* <PopoverContent color='white' bg='blue.800' borderColor='blue.800'>
            <PopoverHeader pt={4} fontWeight='bold' border='0'>
              Title <Input htmlSize={4} width='auto' defaultValue={item.name} />
            </PopoverHeader>
            <PopoverCloseButton />
              <PopoverBody>
                <Stack direction='row' position="relative">
                  <Center><Text>Time</Text></Center>
                  <Select id='editStartTime' defaultValue={item.startTime} onChange={(e) => setDrawerTime(e.target.value)}>
                    {timeArray}
                  </Select>
                  <Center><Text>-</Text></Center>
                  <Select id='editEndTime' defaultValue={item.endTime} onChange={(e) => setDrawerEndTime(e.target.value)}>
                    {timeArray}
                  </Select>
                </Stack>
                <Stack direction='row' position="relative">
                  <Center><Text>Location</Text></Center><Input width='auto' defaultValue={item.location} />
                </Stack>
                <Stack direction='row' position="relative">
                  <Center><Text>Frequency</Text></Center><Input width='auto' defaultValue={item.frequency} />
                </Stack>
                <Text>Additional Info</Text>
                <Textarea width='auto' defaultValue={item.additionalInfo} />

                
              </PopoverBody>
              <PopoverFooter
                border='0'
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                pb={4}
              >
              <Box fontSize='sm'></Box>
            <ButtonGroup size='sm'>
              {/* <Button colorScheme='green' onClick={() => }>Edit</Button> */}
      //         <Button colorScheme='orange'>
      //           Save
      //       </Button>
      //     </ButtonGroup>
      //   </PopoverFooter>
      // </PopoverContent> */}