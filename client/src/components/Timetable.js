import {
  Grid,
  GridItem,
  SimpleGrid,
  Flex,
  Box,
  Container,
  Text,
  Spacer,
  VStack,
  HStack,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Center,
  LightMode,
  useColorModeValue,
  Switch,
  FormControl,
  FormLabel,
  Stack,
  ButtonGroup,
  Select,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
  Textarea,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import axios from "axios"
import { SettingsIcon } from '@chakra-ui/icons'
import Nusmods from './Nusmods';
import TimetableSettings from './TimetableSettings';
import timeArray from "./Time";
import TimetableEdit from './TimetableEdit';

const Timetable = () => {

  //day and time 
  const timeDisplay = [];
  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const time = ["0000", "0100", "0200", "0300", "0400", "0500", "0600", "0700", "0800",
                "0900", "1000", "1100", "1200", "1300", "1400", "1500", "1600", "1700",
    "1800", "1900", "2000", "2100", "2200", "2300"]
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
  
  //color settings
  const evenColor = useColorModeValue("gray.100", "gray.600");
  const oddColor = useColorModeValue("gray.200", "gray.700");
  const overlayColors = ['gray.500','blue.200','yellow.200','green.200','red.200','orange','teal','pink'];

  //weekend and time toggle settings
  const [weekend, setWeekend] = useState(false);
  const [startTime, setStartTime] = useState(8);

  //default drawer settings
  const [drawerDay, setDrawerDay] = useState(0);
  const [drawerTime, setDrawerTime] = useState(0);
  const [drawerEndTime, setDrawerEndTime] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure()

  //column to put info
  var mon = 1;
  var tue = 1; 
  var wed = 1;
  var thu = 1;
  var fri = 1;
  var sat = 1;
  var sun = 1;
  const dayStates = [mon, tue, wed, thu, fri, sat, sun];

  //to get timetable info from BE
  const [items, setItems] = useState([])

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
        axios.get("/api/timetable/info", {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            },
        }).then((response) => {
        if (response.data.error) {
            alert(response.data.error)
        } else {
            setItems(response.data)
        }
    })
    }
  }, [items])

  //set drawer settings for overlay button
  const setDrawerSettings = (i,j) => {
    setDrawerDay(i);
    setDrawerTime(j);
    setDrawerEndTime(j + 6);
  }
  
  //make background for timetable that is adjustable based on number of rows
  const makeBoxes = (i, multiplier) => {
    const boxes = [];
    const height = multiplier * 80 + (multiplier - 1) * 3.5 + "px"
    for (let j = 0; j < 16; j++) {
      if (j === 0) {
        boxes.push(<Center key={i + multiplier + j } bg={oddColor} height={height}>{days[i]}</Center>)
      } else {
        boxes.push(<Center key={i + multiplier + j } bg={j % 2 === 0 ? oddColor : evenColor} height={height}></Center>)
      }
    }
    return boxes;
  }

  //1 hr is 6 boxes
  const makeOverlay = (i) => {
    const boxes = [];
    for (let j = 0; j < 144; j++) {
      boxes.push(<GridItem
        role="button" id={days[i] + j}
        key = {new Date().getTime() + i + j}
        onClick={() => { onOpen(); setDrawerSettings(i,j)}}
        colSpan={1}
        opacity={0}
        bg='yellow.50'
        rounded='md'
        height={20}>
      </GridItem>)
    }
    return boxes;
  }

  //overlays for the boxes
  const mondayOverlay = makeOverlay(0);
  const tuesdayOverlay = makeOverlay(1);
  const wednesdayOverlay = makeOverlay(2);
  const thursdayOverlay = makeOverlay(3);
  const fridayOverlay = makeOverlay(4);
  const saturdayOverlay = makeOverlay(5);
  const sundayOverlay = makeOverlay(6);

  const mondayOverlay1 = makeOverlay(0);
  const tuesdayOverlay1 = makeOverlay(1);
  const wednesdayOverlay1 = makeOverlay(2);
  const thursdayOverlay1 = makeOverlay(3);
  const fridayOverlay1 = makeOverlay(4);
  const saturdayOverlay1 = makeOverlay(5);
  const sundayOverlay1 = makeOverlay(6);

  const mondayOverlay2 = makeOverlay(0);
  const tuesdayOverlay2 = makeOverlay(1);
  const wednesdayOverlay2 = makeOverlay(2);
  const thursdayOverlay2 = makeOverlay(3);
  const fridayOverlay2 = makeOverlay(4);
  const saturdayOverlay2 = makeOverlay(5);
  const sundayOverlay2 = makeOverlay(6);

  //set the boxes to be displayed
  const makeDisplay = (arr) => {
    const temp = [];
    for (let i = startTime * 6; i < startTime * 6 + 90; i++) {
      temp.push(arr[i%144])
    }
    return temp;
  }
  
  //toggle weekend options
  const toggleWeekend = () => {
    if (weekend) {
      setWeekend(false)
    } else {
      setWeekend(true)
    }
  }  

  //delete activity
  const deleteActivity = (event) => {
      axios.post("/api/timetable/delete", {
        _id: event._id, 
    }, {
        headers: {
            accessToken: localStorage.getItem("accessToken")
        },
    }).then((response) => {
        if (response.data.error) {
            alert(response.data.error)
        } else {
            setItems([...items])
        }
    })
  }

  //overlays for three rows 
  const overlaysOne = [mondayOverlay, tuesdayOverlay, wednesdayOverlay, thursdayOverlay, fridayOverlay, saturdayOverlay, sundayOverlay];
  const overlaysTwo = [mondayOverlay1, tuesdayOverlay1, wednesdayOverlay1, thursdayOverlay1, fridayOverlay1, saturdayOverlay1, sundayOverlay1];
  const overlaysThree = [mondayOverlay2, tuesdayOverlay2, wednesdayOverlay2, thursdayOverlay2, fridayOverlay2, saturdayOverlay2, sundayOverlay2];
  const overlays = [overlaysOne, overlaysTwo, overlaysThree];
  const empty = <></>;

  //edit function useStates
  const [editTitle, setEditTitle] = useState("");


  //using array overlap to fill in the activity block 
  const addActivity = (item) => {
    const startLimit = startTime * 6;
    var start = item.startTime;
    var end = item.endTime;
    var length = 0;
    if (start > end) {
      length = 144 - start + end;
    } else {
      length = end - start;
    }
    var temp = [];
    for (let i = start; i < start + length; i++) {
      temp[i % 144] = 1;
    }
    var first = -1;
    var finalLength = 0;
    //need to check for gap in array 
    for (let i = startLimit; i < startLimit + 90; i++) {
      if (temp[i % 144] === 1) {
        if (first === -1) {
          first = i%144;
        }
        finalLength++;
      }
    }
    var firstRow = true;
    var secondRow = true;
    var thirdRow = true;
    var row = -1;
    //have to figure out how to shift to 2nd row!!!
    for (let i = first; i <= first + finalLength; i++) {
      if (overlays[0][item.day][i % 144] === empty) {
        firstRow = false;
      }
      if (overlays[1][item.day][i % 144] === empty) {
        secondRow = false;
      }
      if (overlays[2][item.day][i % 144] === empty) {
        thirdRow = false;
      }
    }
    if (firstRow) {
      row = 0;
    } else if (secondRow) {
      row = 1;
      if (item.day === 0) {
        mon = Math.max(2, mon);
      } else if (item.day === 1) {
        tue = Math.max(2, tue);;
      } else if (item.day === 2) {
        wed = Math.max(2, wed);;
      } else if (item.day === 3) {
        thu = Math.max(2, thu);;
      } else if (item.day === 4) {
        fri = Math.max(2, fri);;
      } else if (item.day === 5) {
        sat = Math.max(2, sat);;
      } else if (item.day === 6) {
        sun = Math.max(2, sun);;
      }
    } else if (thirdRow) {
      row = 2;
      if (item.day === 0) {
        mon = 3
      } else if (item.day === 1) {
        tue = 3;
      } else if (item.day === 2) {
        wed = 3;
      } else if (item.day === 3) {
        thu = 3;
      } else if (item.day === 4) {
        fri = 3;
      } else if (item.day === 5) {
        sat = 3;
      } else if (item.day === 6) {
        sun = 3;
      }
    }

    if (row >= 0) {
      const arr = overlays[row][item.day];
      arr[first] =
        <Popover>
          <PopoverTrigger >
            <GridItem
              role="button" colSpan={finalLength}
              boxShadow='md'
              bg={overlayColors[item.colour]} color="black" rounded='md' height={20}
            >
              <Text fontSize='sm'>{finalLength > 4 ? item.name.split(" ")[0] : ""}</Text>
              <Text fontSize='xs'>{finalLength > 4 ? detailedTime[item.startTime] + " - " + detailedTime[item.endTime]: ""}</Text>
              <Text fontSize='xs'>{finalLength > 4 ? item.code : ""}</Text>
              <Text fontSize='xs'>{finalLength > 4 ? item.location : ""}</Text>
            </GridItem>
          </PopoverTrigger>
          <PopoverContent color='white' bg='blue.800' borderColor='blue.800'>
            <PopoverHeader pt={4} fontWeight='bold' border='0'>
                {item.name}
            </PopoverHeader>
              <PopoverCloseButton />
                <PopoverBody>
                <Text fontSize='xs'>{detailedTime[item.startTime] + " - " + detailedTime[item.endTime]}</Text>
                <Text fontSize='xs'>{item.code}</Text>
                <Text fontSize='xs'>{item.location}</Text>
                <Text fontSize='xs'>{item.frequency}</Text>
                <Text fontSize='xs'>{item.additionalInfo}</Text>
              </PopoverBody>
              <PopoverFooter
                border='0'
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                pb={4}
              >
              <Box fontSize='sm'></Box>
            <ButtonGroup size='sm'>
                <TimetableEdit details={item} />
              <Button colorScheme='red' onClick={() => deleteActivity(item)}>
                Delete
            </Button>
          </ButtonGroup>
        </PopoverFooter>
            </PopoverContent>
    </Popover>
      for (let i = first + 1; i < first + finalLength; i++) {
        arr[i % 144] = empty;
      }
    }
  }

  //function used to display all the items!
  items.map(item => {return(addActivity(item))})

  //responsive timing changes
  const makeTiming = (start) => {
    timeDisplay.push(<Text key="timing"></Text>)
    for (let i = start; i < start+15; i++) {
      timeDisplay.push(<Text key={"time" + i}>{time[i % 24]}</Text>)
    }
    timeDisplay.push(<Text key="timing2"></Text>)
    return timeDisplay;
  }

  //function to change start time
  const setStart = () => {
    if (startTime < 23) {
      setStartTime(startTime+1);
    } else {
      setStartTime(0)
    }
  }

  //function to make all the timings available
  const makeDetailedTiming = () => {
    const box = [];
    for (let i = 0; i < detailedTime.length; i++) {
      box.push(<option value={i} key={"detailed" + i}>{detailedTime[i]}</option>)
    }
    return box;
  }

  //functionality to add items to the timetable
  const [activityName, setActivityName] = useState("");
  const [activityLocation, setActivityLocation] = useState("");
  const [activityFrequency, setActivityFrequency] = useState("");
  const [activityInfo, setActivityInfo] = useState("");
  const [activityColour, setActivityColour] = useState(0);

  let handleInfoChange = (e) => {
    let inputValue = e.target.value;
    setActivityInfo(inputValue);
  }

  const addTimetableActivity = () => {
    var length = 0;
    if (+drawerTime > +drawerEndTime) {
      length = +144 - +drawerTime + +drawerEndTime;
    } else {
      length = +drawerEndTime - +drawerTime;
    }
    if (length === 0) {
      alert("Please input a valid time period")
      return
    } else if (length > 36) {
      alert("Activity cannot be longer than 6 hours")
      return
    }
    if (activityName.length > 0) {
      axios.post("/api/timetable/add", {
        name: activityName,
        day: drawerDay,
        startTime: drawerTime,
        endTime: drawerEndTime,
        location: activityLocation,
        frequency: activityFrequency,
        additionalInfo: activityInfo,
        colour: activityColour,
        nusmods: false,
      }, {
        headers: {
          accessToken: localStorage.getItem("accessToken")
        },
      }).then((response) => {
        if (response.data.error) {
          alert(response.data.error)
        } else {
          setItems([...items])
          setActivityName("");
          setActivityFrequency("");
          setActivityInfo("");
          setActivityLocation("");
          setActivityColour(0);
        }
      })
      onClose();
    } else {
      alert("Please input a name!")
    }
  } 
  
  return (
    <Container overflowX="auto" overflowY="auto" minWidth = "1600" title="timetable">
      <VStack spacing = {0.3}>
        <HStack spacing='64px'>
          {makeTiming(startTime)}
        </HStack>
        <Container overflowX="auto" overflowY="hidden" minWidth = "1600">
          <SimpleGrid columns={16} spacing={1}>
            {mon === 1 ? makeBoxes(0, 1) : <></>}
            {mon === 2 ? makeBoxes(0, 2) : <></>}
            {mon === 3 ? makeBoxes(0, 3):<></>}
            
            {tue === 1 ? makeBoxes(1, 1) : <></>}
            {tue === 2 ? makeBoxes(1, 2) : <></>}
            {tue === 3 ? makeBoxes(1, 3) : <></>}
            
            {wed === 1 ? makeBoxes(2, 1) : <></>}
            {wed === 2 ? makeBoxes(2, 2) : <></>}
            {wed === 3 ? makeBoxes(2, 3) : <></>}
            
            {thu === 1 ? makeBoxes(3, 1) : <></>}
            {thu === 2 ? makeBoxes(3, 2) : <></>}
            {thu === 3 ? makeBoxes(3, 3) : <></>}
            
            {fri === 1 ? makeBoxes(4, 1) : <></>}
            {fri === 2 ? makeBoxes(4, 2) : <></>}
            {fri === 3 ? makeBoxes(4, 3) : <></>}

            
            {weekend ? sat === 1 ? makeBoxes(5, 1) : <></> : <></>}
            {weekend ? sat === 2 ? makeBoxes(5, 2) : <></> : <></>}
            {weekend ? sat === 3 ? makeBoxes(5, 3) : <></> : <></>}
            
            {weekend ? sun === 1 ? makeBoxes(6, 1) : <></> : <></>}
            {weekend ? sun === 2 ? makeBoxes(6, 2) : <></> : <></>}
            {weekend ? sun === 3 ? makeBoxes(6, 3) : <></> : <></>}
          </SimpleGrid>    
        </Container>
        <Container overflowX="auto" overflowY="hidden" minWidth = "1600" z-index = {1} position="absolute" top="98px">
          <SimpleGrid columns={96} spacing={1}>
            <GridItem colSpan={6} opacity={0} height={20}></GridItem>
            {makeDisplay(mondayOverlay)}
            {mon >= 2 ? <GridItem colSpan={6} opacity={0} height={20}></GridItem> : <></>}
            {mon >= 2 ? makeDisplay(mondayOverlay1) : <></>}
            {mon >= 3 ? <GridItem colSpan={6} opacity={0} height={20}></GridItem> : <></>}
            {mon >= 3 ? makeDisplay(mondayOverlay2) : <></>}
            
            <GridItem colSpan={6} opacity={0} height={20} ></GridItem>
            {makeDisplay(tuesdayOverlay)}
            {tue >= 2 ? <GridItem colSpan={6} opacity={0} height={20}></GridItem> : <></>}
            {tue >= 2 ? makeDisplay(tuesdayOverlay1) : <></>}
            {tue >= 3 ? <GridItem colSpan={6} opacity={0} height={20}></GridItem> : <></>}
            {tue >= 3 ? makeDisplay(tuesdayOverlay2) : <></>}  
            
            <GridItem colSpan={6} opacity={0} height={20}></GridItem>
            {makeDisplay(wednesdayOverlay)}
            {wed >= 2 ? <GridItem colSpan={6} opacity={0} height={20}></GridItem> : <></>}
            {wed >= 2 ? makeDisplay(wednesdayOverlay1) : <></>}
            {wed >= 3 ? <GridItem colSpan={6} opacity={0} height={20}></GridItem> : <></>}
            {wed >= 3 ? makeDisplay(wednesdayOverlay2) : <></>}
            
            <GridItem colSpan={6} opacity={0} height={20}></GridItem>
            {makeDisplay(thursdayOverlay)}
            {thu >= 2 ? <GridItem colSpan={6} opacity={0} height={20}></GridItem> : <></>}
            {thu >= 2 ? makeDisplay(thursdayOverlay1) : <></>}
            {thu >= 3 ? <GridItem colSpan={6} opacity={0} height={20}></GridItem> : <></>}
            {thu >= 3 ? makeDisplay(thursdayOverlay2) : <></>}

            <GridItem colSpan={6} opacity={0} height={20}></GridItem>
            {makeDisplay(fridayOverlay)}
            {fri >= 2 ? <GridItem colSpan={6} opacity={0} height={20}></GridItem> : <></>}
            {fri >= 2 ? makeDisplay(fridayOverlay1) : <></>}
            {fri >= 3 ? <GridItem colSpan={6} opacity={0} height={20}></GridItem> : <></>}
            {fri >= 3 ? makeDisplay(fridayOverlay2) : <></>}
            
            {weekend ? <GridItem colSpan={6} opacity={0} height={20}></GridItem> : <></>}
            {weekend ? makeDisplay(saturdayOverlay) : <></>}
            {weekend ? sat >= 2 ? <GridItem colSpan={6} opacity={0} height={20}></GridItem> : <></> : <></>}
            {weekend ? sat >= 2 ? makeDisplay(saturdayOverlay1) : <></> : <></>}
            {weekend ? sat >= 3 ? <GridItem colSpan={6} opacity={0} height={20}></GridItem> : <></> : <></>}
            {weekend ? sat >= 3 ? makeDisplay(saturdayOverlay2) : <></> : <></>}

            
            {weekend ? <GridItem colSpan={6} opacity={0} height={20}></GridItem> : <></>}
            {weekend ? makeDisplay(sundayOverlay) : <></>}
            {weekend ? sun >= 2 ? <GridItem colSpan={6} opacity={0} height={20}></GridItem> : <></> : <></>}
            {weekend ? sun >= 2 ? makeDisplay(sundayOverlay1) : <></> : <></>}
            {weekend ? sun >= 3 ? <GridItem colSpan={6} opacity={0} height={20}></GridItem> : <></> : <></>}
            {weekend ? sun >= 3 ? makeDisplay(sundayOverlay2) : <></> : <></>}
          </SimpleGrid>    
        </Container>
        
      </VStack>
        <Stack direction='row' spacing={4} align='center' p={4}>
          <Button colorScheme='teal' variant='solid' onClick={setStart}>
              Toggle Time
        </Button>
          <Spacer />
          <ButtonGroup gap='2'>
            <Button colorScheme='teal' variant='solid' onClick={toggleWeekend}>
              Toggle Weekend
            </Button>
            <Nusmods />
            <TimetableSettings />
          </ButtonGroup>
      </Stack>
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Add an activity!</DrawerHeader>

          <DrawerBody>
            <Stack spacing='10px'>
              <Box>
                <FormLabel htmlFor='username'>Name</FormLabel>
                <Input
                  id='username'
                  placeholder='Please enter the activity'
                  value = {activityName}
                  onChange={(e) => setActivityName(e.target.value)}
                />
              </Box>
              
              <Box>
                <FormLabel htmlFor='owner'>Day</FormLabel>
                <Select id='owner' value={drawerDay} onChange={(e) => setDrawerDay(e.target.value)}>
                  <option value={0}>Monday</option>
                  <option value={1}>Tuesday</option>
                  <option value={2}>Wednesday</option>
                  <option value={3}>Thursday</option>
                  <option value={4}>Friday</option>
                  <option value={5}>Saturday</option>
                  <option value={6}>Sunday</option>
                </Select>
              </Box>

              <Stack direction = "row" spacing={14}>
                <FormLabel htmlFor='owner'>Start time</FormLabel>
                <FormLabel htmlFor='owner'>End time</FormLabel>
              </Stack>

              <Stack direction='row' position="relative" top="-15px">
                <Select id='startTime' value={drawerTime} onChange={(e) => setDrawerTime(e.target.value)}>
                  {timeArray}
                </Select>
                <Select id='endTime' defaultValue={drawerEndTime} onChange={(e) => setDrawerEndTime(e.target.value)}>
                  {timeArray}
                </Select>
              </Stack>

              <Box position="relative" top="-15px">
                <FormLabel htmlFor='username'>Location</FormLabel>
                <Input
                  id='location'
                  placeholder='Optional'
                  value={activityLocation}
                  onChange = {(e) => setActivityLocation(e.target.value)}
                />
              </Box>
              <Box position="relative" top="-15px">
                <FormLabel htmlFor='username'>Frequency</FormLabel>
                <Input
                  id='frequency'
                  placeholder='Optional'
                  value={activityFrequency}
                  onChange = {(e) => setActivityFrequency(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel htmlFor='desc'>Additional Description</FormLabel>
                <Textarea
                  id='desc'
                  placeholder='Optional'
                  value={activityInfo}
                  onChange={handleInfoChange}
                />
              </Box>
              <Stack>
              <FormLabel htmlFor='desc'>Colour:</FormLabel>
              </Stack>
                <Select id='owner' value={activityColour} onChange={(e) => setActivityColour(e.target.value)}>
                  <option value={0}>Gray</option>
                  <option value={1}>Blue</option>
                  <option value={2}>Yellow</option>
                  <option value={3}>Green</option>
                  <option value={4}>Red</option>
                  <option value={5}>Orange</option>
                  <option value={6}>Teal</option>
                  <option value={7}>Pink</option>
                </Select>
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue' onClick={() => { addTimetableActivity() }}>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Container>
    )
}

export default Timetable