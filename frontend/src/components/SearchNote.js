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
  Divider,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Heading
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import axios from 'axios'
import { useEffect, useState } from 'react'

const SearchNote = ({ editorState, noteState, noteIDState}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const color = useColorModeValue("gray.100", "gray.700");
  const [noteDescriptions, setNoteDescriptions] = useState();
  const color2 = useColorModeValue("gray.100", "gray.600");
  const [search, setSearch] = useState("");
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
        axios.get("/api/notedescription", {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            },
        }).then((response) => {
        if (response.data.error) {
            alert(response.data.error)
        } else {
          setNoteDescriptions(response.data)
          setUpdated(true)
        }
    })
    }
  }, [noteDescriptions])

  const showResults = () => {
    var display = [];
    var count = 0;
    var searchField = search.toLowerCase();
    if (search === "") {
      return 
    }
    if (updated) {
      count = noteDescriptions.length
      for (let i = 0; i < count; i++) {
        let content = noteDescriptions[i].htmlContent
        if (content) {
          content = content.replace(/<[^>]*>?/gm, '')
          content = content.replaceAll('&nbsp;', "")
          content = content.toLowerCase()
        } 
        if (content) {
          if (content.includes(searchField)) {
            let temp = content.indexOf(searchField)
            var len = searchField.length;
            temp = temp + len
            display.push(
              <>
                <Tr>
                  <Td role="button" _hover={{ bg: color2 }}
                    onClick={() => {
                      onClose();
                      editorState(true);
                      noteState(noteDescriptions[i].note);
                      noteIDState(noteDescriptions[i]._id);
                      setSearch("")
                    }}>
                    <Heading as='h5' size='sm'>📄 {noteDescriptions[i].note ? noteDescriptions[i].note : "" }</Heading>
                    <Text fontSize='sm' opacity={0.8}>{"[" + noteDescriptions[i].folder + "] " + (noteDescriptions[i].unit ? noteDescriptions[i].unit : "")}</Text>
                    <Flex><Text as='mark'>{searchField}</Text><Text fontSize='sm' >{content.substring(temp, temp+70-len) + "..."} </Text></Flex>
                  </Td>
                </Tr>
                <Divider />
              </>
            )
          }
        }
      }
    }
    return display
  }
  
  return (
    <div title="searchNote">
      <Tooltip label='Find your notes' fontSize='md'  placement='right'>
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
      <Modal isOpen={isOpen} onClose={() => { onClose(); setSearch("")}} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <HStack>
              <SearchIcon />
              &nbsp;
              <Input
                variant='unstyled'
                placeholder="Find your notes..."
                size='lg'
                onChange={(e) => {setSearch(e.target.value)}}/>
            </HStack>
          </ModalHeader>
          <Divider/>
          <ModalBody>
          <TableContainer>
            <Table variant='unstyled'>
              {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
                <Tbody>
                {showResults()}
                {/* <Tr>
                    <Td role="button" _hover={{ bg: color2 }}>
                      <Heading as='h5' size='sm'>📄 Polymorphism</Heading>
                      <Text fontSize='sm' opacity={0.8}>[CS2030S] / OOP</Text>
                      <Text fontSize='sm'>What is Polymorphism? </Text>
                      <Button onClick={() => console.log(removeHTMLTags(noteDescriptions[0].htmlContent))}></Button>
                    </Td>
                  </Tr>
                  <Divider/>
                <Tr>
                  <Td role="button" _hover={{ bg: color2}}>feet</Td>
                  </Tr>
                  <Divider/>
                <Tr>
                  <Td role="button" _hover={{ bg: color2}}>yards</Td>
                </Tr> */}
              </Tbody>
              {/* <Tfoot>
                <Tr>
                  <Th>To convert</Th>
                  <Th>into</Th>
                  <Th isNumeric>multiply by</Th>
                </Tr>
              </Tfoot> */}
            </Table>
            </TableContainer>
            
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default SearchNote;