import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Center,
  ButtonGroup,
  LightMode
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import axios from 'axios'

const DeleteNote = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const deleteNote = () => {
    axios.post("/api/notedescription/deleteNoteDescription", {
      _id: props.id, 
  }, {
      headers: {
          accessToken: localStorage.getItem("accessToken")
      },
  }).then((response) => {
      if (response.data.error) {
          alert(response.data.error)
      } 
  })
}
  

  return (
    <>
      <Button onClick={onOpen} variant="ghost"><DeleteIcon/></Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <LightMode>
                <ButtonGroup gap='3'>
                  <Button colorScheme="green" onClick={() => { deleteNote(); onClose(); }}>Confirm</Button>
                  <Button onClick={onClose} colorScheme="red">Cancel</Button>
                </ButtonGroup>
              </LightMode>
            </Center>
            
          </ModalBody>

          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default DeleteNote;