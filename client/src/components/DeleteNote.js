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
  LightMode,
  Tooltip,
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import axios from 'axios'

const DeleteNote = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const temporaryDelete = () => {
    axios.post("api/notedescription/editNoteDescription", {
      _id: props.id,
      folder: "Trash",
      }, {
          headers: {
              accessToken: localStorage.getItem("accessToken")
          },
      }).then((response) => {
          if (response.data.error) {
              alert(response.data.error)
          } else {
          }
      })
  }

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
    <div title="deleteNote">
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
                  {props.folder === "Trash" ?
                    <Tooltip label="This will permanently delete the note!" aria-label='A tooltip'>
                      <Button colorScheme="green" onClick={() => { deleteNote(); onClose(); }}>Confirm</Button>
                    </Tooltip> : 
                    <Tooltip label="You can still find this note in the Trash folder." aria-label='A tooltip'>
                    <Button colorScheme="green" onClick={() => { temporaryDelete(); onClose(); }}>Confirm</Button>
                    </Tooltip>}
                  <Button onClick={onClose} colorScheme="red">Cancel</Button>
                </ButtonGroup>
              </LightMode>
            </Center>
            
          </ModalBody>

          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default DeleteNote;