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
  Flex,
  Search,
  Text,
  useColorModeValue,
  HStack,
  Input,
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import axios from 'axios'

const SearchNote = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const color = useColorModeValue("gray.100", "gray.700");

  return (
    <div title="searchNote">
      <Tooltip label='Feature to be completed' fontSize='md'  placement='right'>
        <Flex role="button" _hover={{ bg: color}} height="35px" width="300px" onClick={onOpen}>
          <Center>
            &nbsp;
            &nbsp;
            &nbsp;
          <SearchIcon />
          &nbsp;
          <Text>Search</Text>
          </Center>
        </Flex>
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <HStack>
              <SearchIcon />
              &nbsp;
              <Text>Find your note</Text>
            </HStack>
          </ModalHeader>
          {/* <ModalCloseButton /> */}

          <ModalBody>
            
          </ModalBody>

          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default SearchNote;