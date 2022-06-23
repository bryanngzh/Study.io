import {
  Flex,
  Spacer,
  Center,
  Text,
  Box,
  Heading,
  Stack,
  Button,
  useColorModeValue,
  Editable,
  EditableInput,
  EditablePreview,
  LightMode,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Tag,
  Menu,
  MenuButton,
  MenuList,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import {
  ArrowLeftIcon,
  HamburgerIcon,
  SearchIcon,
  SettingsIcon,
  SmallAddIcon,
  ExternalLinkIcon,
} from '@chakra-ui/icons'
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../helpers/AuthContext';
import Note from "../components/Note";
import axios from 'axios';
import NoteEditor from '../components/NoteEditor';

const Notes = () => {
  const { authState } = useContext(AuthContext)
  const [open, setOpen] = useState(true);
  const color = useColorModeValue("gray.100", "gray.700");
  const [notefolder, setNotefolder] = useState([])
  const [name, setName] = useState('Add a page')
  const [currentFolder, setCurrentFolder] = useState("")
  const [noteDescriptions, setNoteDescriptions] = useState([])
  const [week, setWeek] = useState("")
  const [unit, setUnit] = useState("")
  const [topic, setTopic] = useState("")
  const [buttonOpacity, setButtonOpacity] = useState(0);
  const [currentFocus, setCurrentFocus] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [noteName, setNoteName] = useState("")
  const [noteID, setNoteID] = useState("");

  //include the adding of the editor storage json when adding row 
  const addRow = (folder) => {
    if (folder === "") {
      return
    }
    axios.post("api/notedescription/addNoteDescription", {
      folder: folder,
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

  const editTopic = (note, value) => {
    axios.post("api/notedescription/editNoteDescription", {
      _id: note._id,
      note: value,
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

  const editWeek = (note, value) => {
    axios.post("api/notedescription/editNoteDescription", {
      _id: note._id,
      week: value,
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

  const editUnit = (note, value) => {
    axios.post("api/notedescription/editNoteDescription", {
      _id: note._id,
      unit: value,
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

  const addNoteFolder = (text) => {
    if (text === "Add a page") {
      return
    }
    for (let i = 0; i < notefolder.length; i++) {
      if (text === notefolder[i].title) {
        alert("Cannot have folders with the same name!")
        return
      }
    }
    if (text.length === 0) {
      alert("Please input a name for the notebook")
    } else {
      axios.post("/api/notefolder/addNoteFolder", {
        title: text
        }, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            },
        }).then((response) => {
            if (response.data.error) {
                alert(response.data.error)
            } else {
                setNotefolder([...notefolder])
            }
        })
    }
  }

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
        axios.get("/api/notefolder", {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            },
        }).then((response) => {
        if (response.data.error) {
            alert(response.data.error)
        } else {
          setNotefolder(response.data)
        }
    })
    }
  }, [notefolder])
  
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
        }
    })
    }
}, [noteDescriptions])

  return (
    <Stack direction="row" height="100vh" >
      {open ?
        <Box shadow='md' borderWidth='1px' width='17%' minWidth="300px" overflowX="hidden" overflowY="auto">
          <Stack direction="row">
            <Heading p={5} fontSize='xl'>{authState.username.split(" ")[0] + "'s"} Notes</Heading>
            <Spacer />
            <Button p={5} onClick={() => setOpen(false)} variant='ghost' top="10px" left = "-5px">
              <ArrowLeftIcon w={3} h={3} />
            </Button>
          </Stack>
          <Stack spacing={0}>
            <Flex role="button" _hover={{ bg: color}} height="35px" width="300px">
              <Center>
                &nbsp;
                &nbsp;
                &nbsp;
              <SearchIcon />
              &nbsp;
              <Text>Search</Text>
              </Center>
            </Flex>
            <Flex role="button" _hover={{ bg: color }} height="35px" width="300px">
              <Center>
                &nbsp;
                &nbsp;
                &nbsp;
              <SettingsIcon />
              &nbsp;
              <Text>Settings</Text>
              </Center>
            </Flex>
          </Stack>
          <Stack spacing={0}>
            <Text p={4}>Notefolder</Text>
            {notefolder.map(x =>
              <Flex
                role="button"
                _hover={{ bg: color }}
                height="35px"
                width="300px"
                onClick={() => { setCurrentFolder(x.title) }}>
                &nbsp;
                &nbsp;
                <Center>{x.title}</Center>
              </Flex>)}
            <Flex role="button" _hover={{ bg: color }} height="35px" width="300px">
                <Center>
                &nbsp;
                <SmallAddIcon />
                  &nbsp;
                <Editable value={name} onSubmit={() => { addNoteFolder(name);  setName("Add a page")}} width="250px">
                  <EditablePreview />
                  <EditableInput onChange={(e) => setName(e.target.value)}/>
                </Editable>
                </Center>
            </Flex>
          </Stack>

        </Box> :
        <Box p={2}>
          <Button onClick={() => setOpen(true)} variant='ghost' top="6px" left="9px" >
            <HamburgerIcon w={5} h={5} />
          </Button>
        </Box>}
      <Box p={5}   width = '100%' height = "100%">
        <Box left={40}>
          <Heading>{currentFolder}</Heading>
          </Box>
          <TableContainer>
            <Table variant='simple' size="md">
              <TableCaption role="button" _hover={{ bg: color }} onClick={() => {addRow(currentFolder)}}>+ New</TableCaption>
              <Thead>
                <Tr>
                  <Th>Week</Th>
                  <Th>Topic/Lesson</Th>
                  <Th>Unit/modules</Th>
                </Tr>
              </Thead>
            <Tbody>
              {noteDescriptions.filter(note => note.folder === currentFolder).map(note => {
                return (
                  <Tr>
                    {/* <Td role="button" _hover={{ bg: color }}><Tag colorScheme='blue'>Week {note.week}</Tag></Td> */}
                    <Td>
                      <Menu isLazy>
                          <MenuButton onClick={() => {note.week ? setWeek(note.week) : setWeek("click to edit")}}>
                            {note.week ? note.week : <Text as="em">untitled</Text>}
                          </MenuButton>
                          <MenuList>
                            <Editable value={week} p={2} onSubmit={() => {editWeek(note, week)}} >
                              <EditablePreview/>
                            <EditableInput onChange={(e) => setWeek(e.target.value)}/>
                            </Editable>
                          </MenuList>
                      </Menu>
                    </Td>

                    <Td
                      _hover={{ bg: color }}
                      onMouseOver={() => { setButtonOpacity(1); setCurrentFocus(note._id) }}
                      onMouseLeave={() => { setButtonOpacity(0); setCurrentFocus("")}}>
                      <Flex>
                        <Menu isLazy>
                          <MenuButton onClick={() => { note.note ? setTopic(note.note) : setTopic("click to edit") }}>
                            {note.note ? note.note : <Text as="em">untitled</Text>}
                          </MenuButton>
                          <MenuList>
                            <Editable value={topic} p={2} onSubmit={() => { editTopic(note, topic) }} >
                              <EditablePreview />
                              <EditableInput onChange={(e) => setTopic(e.target.value)} />
                            </Editable>
                          </MenuList>
                        </Menu>
                        <Spacer />
                        <Button
                          rightIcon={<ExternalLinkIcon />}
                          variant='link'
                          size="sm"
                          opacity={currentFocus === note._id ? buttonOpacity : 0}
                          onClick={() => { onOpen(); setNoteName(note.note); setNoteID(note._id); }}
                        >
                          open
                        </Button>
                        
                      </Flex>
                    </Td>
                    <Td>
                      <Menu isLazy>
                        <MenuButton onClick={() => {note.unit ? setUnit(note.unit) : setUnit("click to edit")}}>
                          {note.unit ? note.unit : <Text as="em">untitled</Text>}
                        </MenuButton>
                        <MenuList>
                          <Editable value={unit} p={2} onSubmit={() => {editUnit(note, unit)}} >
                            <EditablePreview/>
                            <EditableInput onChange={(e) => setUnit(e.target.value)}/>
                          </Editable>
                        </MenuList>
                      </Menu>
                    </Td>
                  </Tr>
                )
              })}
              <>
                <Modal isOpen={isOpen} onClose={onClose} > 
                  <ModalOverlay bg='blackAlpha.300'/>
                  <ModalContent maxW="56rem" h="80vh" overflowY="auto">
                      <ModalHeader>{noteName}</ModalHeader>
                    <ModalCloseButton />
                      <ModalBody>
                      <NoteEditor name={noteName} id={noteID } />
                    </ModalBody>
                    <ModalFooter>
                      <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                      </Button>
                      <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter>
                  </ModalContent>
                  </Modal>
                </>
              </Tbody>
              {/* <Tfoot >
                <Tr >
                  <Th >New</Th>
                </Tr>
              </Tfoot> */}
            </Table>
          </TableContainer>
        <Flex></Flex>
      </Box>
    </Stack>
  )
  
}

export default Notes