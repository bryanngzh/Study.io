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
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react';

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
  const evenColorOverlay = useColorModeValue("gray.50", "gray.500");
  const oddColorOverlay = useColorModeValue("gray.150", "gray.650");

  //weekend and time toggle settings
  const [weekend, setWeekend] = useState(false);
  const [startTime, setStartTime] = useState(8);

  //default drawer settings
  const [drawerDay, setDrawerDay] = useState(0);
  const [drawerTime, setDrawerTime] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure()

  //additional drawer settings for input

  
  //number of rows for timetable
  const [mon, setMon] = useState(1);
  const [tue, setTue] = useState(1);
  const [wed, setWed] = useState(1);
  const [thu, setThu] = useState(1);
  const [fri, setFri] = useState(1);
  const [sat, setSat] = useState(1);
  const [sun, setSun] = useState(1);

  const setDrawerSettings = (i,j) => {
    setDrawerDay(i);
    setDrawerTime(j);
  }
  
  const makeBoxes = (i, multiplier) => {
    const boxes = [];
    const height = multiplier * 80 + (multiplier - 1) * 3.5 + "px"
    for (let j = 0; j < 16; j++) {
      if (j === 0) {
        boxes.push(<Center bg={oddColor} height={height}>{days[i]}</Center>)
      } else {
        boxes.push(<Center bg={j % 2 === 0 ? oddColor : evenColor} height={height}>{height}</Center>)
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
        onClick={() => { onOpen(); setDrawerSettings(i,j)}}
        colSpan={1}
        opacity={0.4}
        bg='yellow.50'
        rounded='md'
        height={20}>
        {j}
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

  const changeSize = () => {
    mondayOverlay[7] = <GridItem role="button" colSpan={3} opacity={0.5} bg='yellow.50' rounded='md' height={20}>1</GridItem>
    mondayOverlay[8] = <></>
    mondayOverlay[9] = <></>;
  }

  //responsive timing changes
  const makeTiming = (start) => {
    timeDisplay.push(<Text></Text>)
    for (let i = start; i < start+15; i++) {
      timeDisplay.push(<Text>{time[i % 24]}</Text>)
    }
    timeDisplay.push(<Text></Text>)
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
      box.push(<option value={i}>{detailedTime[i]}</option>)
    }
    return box;
  }

  const toggleMon = () => {
    setSat(1);
  }
  
  return (
    <Container overflowX="auto" overflowY="auto" minWidth = "1600">
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
            {mon >= 2 ? makeDisplay(mondayOverlay1) : <></>}
            {mon >= 3 ? makeDisplay(mondayOverlay2) : <></>}
            {/* {changeSize()} */}
            
            <GridItem colSpan={6} opacity={0} height={20}></GridItem>
            {makeDisplay(tuesdayOverlay)}
            {tue >= 2 ? makeDisplay(tuesdayOverlay1) : <></>}
            {tue >= 3 ? makeDisplay(tuesdayOverlay2) : <></>}  
            
            <GridItem colSpan={6} opacity={0} height={20}></GridItem>
            {makeDisplay(wednesdayOverlay)}
            {wed >= 2 ? makeDisplay(wednesdayOverlay1) : <></>}
            {wed >= 3 ? makeDisplay(wednesdayOverlay2) : <></>}
            
            <GridItem colSpan={6} opacity={0} height={20}></GridItem>
            {makeDisplay(thursdayOverlay)}
            {thu >= 2 ? makeDisplay(thursdayOverlay1) : <></>}
            {thu >= 3 ? makeDisplay(thursdayOverlay2) : <></>}

            <GridItem colSpan={6} opacity={0} height={20}></GridItem>
            {makeDisplay(fridayOverlay)}
            {fri >= 2 ? makeDisplay(fridayOverlay1) : <></>}
            {fri >= 3 ? makeDisplay(fridayOverlay2) : <></>}
            
            {weekend ? <GridItem colSpan={6} opacity={0} height={20}></GridItem> : <></>}
            {weekend ? makeDisplay(saturdayOverlay) : <></>}
            {weekend ? sat >= 2 ? makeDisplay(saturdayOverlay1) : <></> : <></>}
            {weekend ? sat >= 3 ? makeDisplay(saturdayOverlay2) : <></> : <></>}

            
            {weekend ? <GridItem colSpan={6} opacity={0} height={20}></GridItem> : <></>}
            {weekend ? makeDisplay(sundayOverlay) : <></>}
            {weekend ? sun >= 2 ? makeDisplay(sundayOverlay1) : <></> : <></>}
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
            <Button colorScheme='orange' variant='solid' onClick={toggleMon} >
              NUSMODS
            </Button>
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
          <DrawerHeader>Add activity!</DrawerHeader>

          <DrawerBody>
            <Stack spacing='24px'>
              <Box>
                <FormLabel htmlFor='username'>Name</FormLabel>
                <Input
                  id='username'
                  placeholder='Please enter the activity'
                />
              </Box>
              
              <Box>
                <FormLabel htmlFor='owner'>Day</FormLabel>
                <Select id='owner' defaultValue={days[drawerDay]}>
                  <option value={days[0]}>Monday</option>
                  <option value={days[1]}>Tuesday</option>
                  <option value={days[2]}>Wednesday</option>
                  <option value={days[3]}>Thursday</option>
                  <option value={days[4]}>Friday</option>
                  <option value={days[5]}>Saturday</option>
                  <option value={days[6]}>Sunday</option>
                </Select>
              </Box>

              <Stack direction = "row" spacing={14}>
                <FormLabel htmlFor='owner'>Start time</FormLabel>
                <FormLabel htmlFor='owner'>End time</FormLabel>
              </Stack>

              <Stack direction='row' position="relative" top="-25px">
                <Select id='startTime' defaultValue={drawerTime}>
                  {makeDetailedTiming()}
                </Select>
                <Select id='endTime' defaultValue={drawerTime + 6}>
                  {makeDetailedTiming()}
                </Select>
              </Stack>

              <Box position="relative" top="-25px">
                <FormLabel htmlFor='username'>Location</FormLabel>
                <Input
                  id='username'
                  placeholder='Optional'
                />
              </Box>
              <Box position="relative" top="-25px">
                <FormLabel htmlFor='username'>Frequency</FormLabel>
                <Input
                  id='username'
                  placeholder='Optional'
                />
              </Box>
              <Box>
                <FormLabel htmlFor='desc'>Additional Description</FormLabel>
                <Textarea id='desc' />
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Container>
    )
}

export default Timetable