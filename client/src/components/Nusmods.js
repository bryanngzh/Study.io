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
  FormControl,
  FormLabel,
  Input,
  OrderedList,
  ListItem,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react';



const Nusmods = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [sharingLink, setSharingLink] = useState('');
  const modulesStore = [];

  const linkParser = () => {
    if (sharingLink !== "") {
      try {
        const String = sharingLink
        const arr = String.split("/share?");
        const modules = arr[1];
        const arrayOfModules = modules.split("&");
        for (let i = 0; i < arrayOfModules.length; i++) {
          const ans = [];
          const temp = arrayOfModules[i].split("=");
          ans.push(temp[0]);
          if (temp.length > 1) {
            const temp2 = temp[1].split(",");
            for (let i = 0; i < temp2.length; i++) {
              ans.push(temp2[i]);
            }
          }
          modulesStore[i] = ans;
        }
      } catch (err) {
        setSharingLink("");
        alert("Please input a valid sharing link!")
      }
    }
  }

  const [moduleInfo, setModuleInfo] = useState([]);

  const moduleFinder = (moduleName) => {
    const String = "https://api.nusmods.com/v2/2021-2022/modules/" + moduleName + ".json"
    fetch(String)
      .then((response) => response.json())
      .then((data) => setModuleInfo(data))
      .catch((error) => alert(error));

  }

  return (
    <>
      <Button onClick={onOpen} colorScheme='orange' variant='solid'>NUSMODS</Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Import modules</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            
            <FormControl>
              <FormLabel>NUSMODS sharing link</FormLabel>
                <Input
                  placeholder='https://nusmods.com/timetable/sem-2/share?ACC17'
                  value={sharingLink} 
                  onChange={(e) => setSharingLink(e.target.value)}
                />
            </FormControl>
            <FormLabel>Modules Retrieved:</FormLabel>
            {sharingLink !== "" ? linkParser() : <></>}
           
            <OrderedList>
              {modulesStore.length > 0 ? modulesStore.map(x => <ListItem>{x.map(y => y + " ")}</ListItem>) : <></>}
            </OrderedList>
            {/* {ModuleFinder("CS2030S")} */}
            {moduleInfo.length > 0? moduleInfo[0] : "hi"}
            
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme='orange' onClick={() => moduleFinder("CS2030S")}>Update</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )

}

export default Nusmods;