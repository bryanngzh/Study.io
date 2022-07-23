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
  Tooltip,
  Divider,
  HStack,
} from '@chakra-ui/react'
import {
  ArrowLeftIcon,
  HamburgerIcon,
  SearchIcon,
  SettingsIcon,
  SmallAddIcon,
  ExternalLinkIcon,
} from '@chakra-ui/icons'
import { FaHome, FaTrash, FaExpandAlt, FaFilePdf } from 'react-icons/fa';
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../helpers/AuthContext';
import axios from 'axios';
import NoteEditor from '../components/NoteEditor';
import DeleteNote from '../components/DeleteNote';
import DeleteFolder from '../components/DeleteFolder';
import SearchNote from '../components/SearchNote';
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const { authState } = useContext(AuthContext)
  const [open, setOpen] = useState(true);
  const color = useColorModeValue("gray.100", "gray.700");
  const [notefolder, setNotefolder] = useState([])
  const [name, setName] = useState('Add a page')
  const [currentFolder, setCurrentFolder] = useState("Home")
  const [noteDescriptions, setNoteDescriptions] = useState([])
  const [week, setWeek] = useState("")
  const [unit, setUnit] = useState("")
  const [topic, setTopic] = useState("")
  const [buttonOpacity, setButtonOpacity] = useState(0);
  const [currentFocus, setCurrentFocus] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [noteName, setNoteName] = useState("")
  const [noteID, setNoteID] = useState("");
  const [settings, setSettings] = useState(false);
  const [fullEditor, setFullEditor] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
      if (!authState.status) {
        navigate('/')
      }
  })

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
    if (text === "Home") {
      alert("Cannot have folders with the same name!")
      return
    }
    if (text === "Trash") {
      alert("Cannot have folders with the same name!")
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
    <Stack direction="row" height="100vh" title="notes">
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
            <Tooltip label='Home Page' fontSize='md'  placement='right'>
              <Flex role="button" _hover={{ bg: color }} height="35px" width="300px" onClick={() => { setCurrentFolder("Home"); setFullEditor(false); }}>
                <Center>
                  &nbsp;
                  &nbsp;
                  &nbsp;
                <FaHome />
                &nbsp;
                <Text>Home</Text>
                </Center>
              </Flex>
            </Tooltip>
            {/* <Tooltip label='Feature to be completed' fontSize='md'  placement='right'>
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
            </Tooltip> */}
            <SearchNote editorState={setFullEditor} noteState={setNoteName} noteIDState={setNoteID} />
            <Tooltip label='Click to toggle delete' fontSize='md'  placement='right'>
              <Flex role="button" _hover={{ bg: color }} height="35px" width="300px" onClick={() => {setSettings(!settings)}}>
                <Center>
                  &nbsp;
                  &nbsp;
                  &nbsp;
                <SettingsIcon />
                &nbsp;
                <Text>Settings</Text>
                </Center>
              </Flex>
            </Tooltip>
          </Stack>
          <Stack spacing={0}>
            <Heading p={4} as='h4' size='md'>Notefolder's</Heading>
            {notefolder.map(x =>
              <Flex>
                <Flex
                  role="button"
                  _hover={{ bg: color }}
                  height="35px"
                  width="300px"
                  onClick={() => { setCurrentFolder(x.title); setFullEditor(false) }}>
                  &nbsp;
                  &nbsp;
                  <Center>{x.title}</Center>
                  </Flex>
                  {settings ? <>
                  <Spacer /><DeleteFolder id={x._id} />
                  </>
                  : <></>}
              </Flex>)}
            <Tooltip label='Click on the text to add' fontSize='md'  placement='right'>
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
            </Tooltip>
            
            <Tooltip label='Restore Deleted Notes' fontSize='md'  placement='right'>
              <Flex
                top="20px"
                position="relative"
                role="button"
                _hover={{ bg: color }}
                height="35px"
                width="300px"
                onClick={() => { setCurrentFolder("Trash"); setFullEditor(false) }}>
                <Center>
                  &nbsp;
                  &nbsp;
                  &nbsp;
                <FaTrash />
                &nbsp;
                <Text>Trash</Text>
                </Center>
              </Flex>
            </Tooltip>
          </Stack>
        </Box> :
        <Box p={2}>
          <Button onClick={() => setOpen(true)} variant='ghost' top="6px" left="9px" >
            <HamburgerIcon w={5} h={5} />
          </Button>
        </Box>}
      
      {fullEditor ?
        <Box p={5} w="100%" height="100%" overflowY="auto">
          <Center>
            <Stack minWidth="800px" maxWidth="800px">
              <Flex>
                <Heading>{noteName ? noteName : "Untitled"}</Heading>
                <Spacer />
              </Flex>
              <NoteEditor name={noteName} id={noteID} />
            </Stack>
          </Center>
        </Box>
      : <Box p={5} width='100%' height="100%">
        <Box left={40}>
          <Heading>{currentFolder ? currentFolder : "Click/Create a Notefolder to get Started!"}</Heading>
        </Box>
        <TableContainer>
          <Table variant='simple' size="md">
            <TableCaption role="button" _hover={{ bg: color }} onClick={() => { addRow(currentFolder) }}>+ New</TableCaption>
            <Thead>
              <Tr>
                <Th>Week</Th>
                <Th>Topic/Lesson</Th>
                <Th>Unit/modules</Th>
                {settings ? <Th isNumeric>Delete</Th> : <></>}
              </Tr>
            </Thead>
            <Tbody>
              {noteDescriptions.filter(note => note.folder === currentFolder).map(note => {
                return (
                  <Tr>
                    {/* <Td role="button" _hover={{ bg: color }}><Tag colorScheme='blue'>Week {note.week}</Tag></Td> */}
                    <Td>
                      <Menu isLazy>
                        <Tooltip label="Click to Edit">
                          <MenuButton onClick={() => { note.week ? setWeek(note.week) : setWeek("click to edit") }}>
                            {note.week ? note.week : <Text as="em">untitled</Text>}
                          </MenuButton>
                        </Tooltip>
                        <MenuList>
                          <Editable value={week} p={2} onSubmit={() => { editWeek(note, week) }} >
                            <EditablePreview />
                            <EditableInput onChange={(e) => setWeek(e.target.value)} />
                          </Editable>
                        </MenuList>
                      </Menu>
                    </Td>

                    <Td
                      _hover={{ bg: color }}
                      onMouseOver={() => { setButtonOpacity(1); setCurrentFocus(note._id) }}
                      onMouseLeave={() => { setButtonOpacity(0); setCurrentFocus("") }}>
                      <Flex>
                        <Menu isLazy>
                          <Tooltip label="Click to Edit">
                            <MenuButton onClick={() => { note.note ? setTopic(note.note) : setTopic("click to edit") }}>
                              {note.note ? note.note : <Text as="em">untitled</Text>}
                            </MenuButton>
                          </Tooltip>
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
                        <Tooltip label="Click to Edit">
                          <MenuButton onClick={() => { note.unit ? setUnit(note.unit) : setUnit("click to edit") }}>
                            {note.unit ? note.unit : <Text as="em">untitled</Text>}
                          </MenuButton>
                        </Tooltip>
                        <MenuList>
                          <Editable value={unit} p={2} onSubmit={() => { editUnit(note, unit) }} >
                            <EditablePreview />
                            <EditableInput onChange={(e) => setUnit(e.target.value)} />
                          </Editable>
                        </MenuList>
                      </Menu>
                    </Td>
                    {settings ?
                      <Td isNumeric><DeleteNote id={note._id} folder={currentFolder} /></Td>
                      : <></>}
                  </Tr>
                )
              })}
              <>
                <Modal isOpen={isOpen} onClose={onClose} >
                  <ModalOverlay bg='blackAlpha.300' />
                  <ModalContent maxW="56rem" h="80vh" overflowY="auto">
                    <ModalHeader>
                      <Flex>
                        {noteName ? noteName : "Untitled"}
                          <Spacer />
                          <Tooltip label='Open as full page'>
                            <Button variant='ghost' onClick={() => { setFullEditor(true); onClose(); }}><FaExpandAlt /></Button>
                          </Tooltip>
                      </Flex>
                    </ModalHeader>
                    {/* <ModalCloseButton /> */}
                    
                    <ModalBody>
                      <NoteEditor name={noteName} id={noteID} />
                    </ModalBody>
                    <ModalFooter>
                      {/* <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                      </Button>
                      <Button variant='ghost'>Secondary Action</Button> */}
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
      </Box>}
    </Stack>
  )
}

export default Notes