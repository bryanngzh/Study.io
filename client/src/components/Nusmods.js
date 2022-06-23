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
import axios from 'axios';
import { useState } from 'react';



const Nusmods = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [sharingLink, setSharingLink] = useState('');
  const modulesStore = [];
  var sem = 0;

  const linkParser = () => {
    if (sharingLink !== "") {
      try {
        const String = sharingLink
        const arr = String.split("/share?");
        sem = Number(arr[0].slice(-1)) - 1
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

  const addTimetableActivity = (name, day, start, end, location, frequency, colour, code) => {
      axios.post("/api/timetable/add", {
        name: name,
        day: day,
        startTime: start,
        endTime: end,
        location: location,
        frequency: frequency,
        colour: colour,
        code: code,
        nusmods: true,
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

  var map = {
    "TUT": "Tutorial",
    "LEC": "Lecture",
    "REC": "Recitation",
    "LAB": "Laboratory",
    "SEC": "Sectional Teaching"
  }
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const time = ["0000", "0010", "0020", "0030", "0040", "0050", "0100", "0110", "0120",
    "0130", "0140", "0150", "0200", "0210", "0220", "0230", "0240", "0250", "0300", "0310",
    "0320", "0330", "0340", "0350", "0400", "0410", "0420", "0430", "0440", "0450", "0500",
    "0510", "0520", "0530", "0540", "0550", "0600", "0610", "0620", "0630", "0640", "0650",
    "0700", "0710", "0720", "0730", "0740", "0750", "0800", "0810", "0820", "0830", "0840",
    "0850", "0900", "0910", "0920", "0930", "0940", "0950", "1000", "1010", "1020", "1030",
    "1040", "1050", "1100", "1110", "1120", "1130", "1140", "1150", "1200", "1210", "1220",
    "1230", "1240", "1250", "1300", "1310", "1320", "1330", "1340", "1350", "1400", "1410",
    "1420", "1430", "1440", "1450", "1500", "1510", "1520", "1530", "1540", "1550", "1600",
    "1610", "1620", "1630", "1640", "1650", "1700", "1710", "1720", "1730", "1740", "1750",
    "1800", "1810", "1820", "1830", "1840", "1850", "1900", "1910", "1920", "1930", "1940",
    "1950", "2000", "2010", "2020", "2030", "2040", "2050", "2100", "2110", "2120", "2130",
    "2140", "2150", "2200", "2210", "2220", "2230", "2240", "2250", "2300", "2310", "2320",
    "2330", "2340", "2350"]

  async function moduleFinder(arr) {
    const moduleName = arr[0];
    const String = "https://api.nusmods.com/v2/2022-2023/modules/" + moduleName + ".json";
    const response = await fetch(String);
    const data = await response.json();
    const colour = Math.floor(Math.random()*7);
    for (let i = 1; i < arr.length; i++) {
      const modInfo = arr[i].split(":");
      const jsonInfo = data.semesterData[sem].timetable
        .filter(x => x.lessonType === map[modInfo[0]])
        .filter(y => y.classNo === modInfo[1])
      for (let i = 0; i < jsonInfo.length; i++) {
        const startTime = time.indexOf(jsonInfo[i].startTime);
        const endTime = time.indexOf(jsonInfo[i].endTime);
        const location = jsonInfo[i].venue;
        const frequency = "Weeks [" + jsonInfo[i].weeks + "]";
        const day = days.indexOf(jsonInfo[i].day);
        const code = modInfo[0] + " [" + modInfo[1] + "]"
        addTimetableActivity(moduleName, day, startTime, endTime, location, frequency, colour, code)
      }
    }
  }

  const addAllModules = () => {
    for (let i = 0; i < modulesStore.length; i++) {
      moduleFinder(modulesStore[i])
    }
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
            <FormLabel>Semester {sem + 1}</FormLabel>
            
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme='orange' onClick={() => addAllModules()}>Update</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )

}

export default Nusmods;