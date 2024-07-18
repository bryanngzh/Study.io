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
} from '@chakra-ui/react'
import { SettingsIcon } from '@chakra-ui/icons'
import { useState, useEffect } from 'react'
import axios from 'axios'

const TimetableSettings = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [items, setItems] = useState([])

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
        axios.get("/api/timetable/info", {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            },
        }).then((response) => {
        if (response.data.error) {
            console.log(response.data.error)
        } else {
            setItems(response.data)
        }
    })
    }
  }, [items])

  const deleteActivity = (event) => {
    axios.post("/api/timetable/delete", {
      _id: event._id, 
  }, {
      headers: {
          accessToken: localStorage.getItem("accessToken")
      },
  }).then((response) => {
      if (response.data.error) {
          alert(response.data.error)
      } else {
          setItems([...items])
      }
  })
}

  const clearTimetable = () => {
    items.map(x => deleteActivity(x));
  }

  const clearNusmods = () => {
    items.filter(x => x.nusmods === true).map(y => deleteActivity(y));
  }

  return (
    <div title="TimetableSettings">
      <Button onClick={onOpen} colorScheme="blue" variant="solid"><SettingsIcon /></Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Timetable Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <LightMode>
                <Tooltip hasArrow label='This will clear the entire timetable!' placement='right'>
                  <Button colorScheme="red" variant="solid" onClick={() => { clearTimetable(); onClose(); }}>Clear Timetable</Button>
                </Tooltip>
                <Tooltip hasArrow label='This will clear activities from NUSMODs' placement='right'>
                  <Button colorScheme="red" variant="solid" onClick={() => { clearNusmods(); onClose(); }}>Clear NUSMODs</Button>
                </Tooltip>
              </LightMode>
            </Stack>
            
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default TimetableSettings