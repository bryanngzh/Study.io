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
    const detailedTime = ["00:00", "00:10", "00:20", "00:30", "00:40", "00:50", "01:00", "01:10", "01:20",
    "01:30", "01:40", "01:50", "02:00", "02:10", "02:20", "02:30", "02:40", "02:50", "03:00", "03:10",
    "03:20", "03:30", "03:40", "03:50", "04:00", "04:10", "04:20", "04:30", "04:40", "04:50", "05:00",
    "05:10", "05:20", "05:30", "05:40", "05:50", "06:00", "06:10", "06:20", "06:30", "06:40", "06:50",
    "07:00", "07:10", "07:20", "07:30", "07:40", "07:50", "08:00", "08:10", "08:20", "08:30", "08:40",
    "08:50", "09:00", "09:10", "09:20", "09:30", "09:40", "09:50", "10:00", "10:10", "10:20", "10:30",
    "10:40", "10:50", "11:00", "11:10", "11:20", "11:30", "11:40", "11:50", "12:00", "12:10", "12:20",
    "12:30", "12:40", "12:50", "13:00", "13:10", "13:20", "13:30", "13:40", "13:50", "14:00", "14:10",
    "14:20", "14:30", "14:40", "14:50", "15:00", "15:10", "15:20", "15:30", "15:40", "15:50", "16:00",
    "16:10", "16:20", "16:30", "16:40", "16:50", "17:00", "17:10", "17:20", "17:30", "17:40", "17:50",
    "18:00", "18:10", "18:20", "18:30", "18:40", "18:50", "19:00", "19:10", "19:20", "19:30", "19:40",
    "19:50", "20:00", "20:10", "20:20", "20:30", "20:40", "20:50", "21:00", "21:10", "21:20", "21:30",
    "21:40", "21:50", "22:00", "22:10", "22:20", "22:30", "22:40", "22:50", "23:00", "23:10", "23:20",
    "23:30", "23:40", "23:50"]
  
  const addReminder = (message, date, duration) => {
    if (date) {
      var temp = new Date(date) + "";
      var arr = temp.split(" ");
      var start = arr[4].substring(0, 5);
      var startTime = detailedTime.indexOf(start);
      var endTime = startTime + duration / 10;
      var event = message + " Finals"
      axios.post("/api/reminder/addReminder", {
        date: date, startTime: startTime, endTime: endTime, 
        event: event, tags: "exam", notes: "Finals", isExpired: false,
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
  
    }   
  

  async function moduleFinder(arr) {
    var moduleName = arr[0];
    const String = "https://api.nusmods.com/v2/2022-2023/modules/" + moduleName + ".json";
    const response = await fetch(String);
    const data = await response.json();
    moduleName = moduleName + " " + data.title
    const colour = Math.floor(Math.random() * 7);
    const examInfo = data.semesterData[sem].examDate
    const examDuration = data.semesterData[sem].examDuration
    addReminder(moduleName, examInfo, examDuration)
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
    <div title="Nusmods">
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
            <Button colorScheme='orange' onClick={() => { addAllModules(); onClose(); }}>Update</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )

}

export default Nusmods;