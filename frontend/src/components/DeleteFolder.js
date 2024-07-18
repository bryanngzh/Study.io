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
import React from 'react'

const DeleteFolder = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const deleteFolder = () => {
    axios.post("/api/notefolder/deleteNoteFolder", {
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
    <div title="deletefolder">
      <Button onClick={onOpen} variant='ghost' size='sm'><DeleteIcon/></Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <LightMode>
                <ButtonGroup gap='3'>
                  <Button colorScheme="green" onClick={() => { deleteFolder(); onClose(); }}>Confirm</Button>
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

export default DeleteFolder;