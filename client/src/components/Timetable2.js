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
} from '@chakra-ui/react'
import { useState } from 'react';

const Timetable2 = () => {

  //const boxes = [];
  const timeDisplay = [];
  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const time = ["0000", "0100", "0200", "0300", "0400", "0500", "0600", "0700", "0800",
                "0900", "1000", "1100", "1200", "1300", "1400", "1500", "1600", "1700",
                "1800", "1900", "2000", "2100", "2200", "2300"]
  const evenColor = useColorModeValue("gray.100", "gray.600");
  const oddColor = useColorModeValue("gray.200", "gray.700");
  const [weekend, setWeekend] = useState(false);
  const [startTime, setStartTime] = useState(8);

  const makePopover = (i, j) => {
    return (
      <Popover>
            <PopoverTrigger>
              <Box
                id={days[i] + j}
                role='button'
                aria-label='Some box'
                p={0.4}
                height = '160px'
                bg={j%2===0?evenColor:oddColor}
              >
                <Text fontSize='sm'>{days[i] + j}</Text>
                <Text fontSize='xs'>TUT x-07</Text>
                <Text fontSize='xs'>SFAH-BEACON</Text>
                <Text fontSize='xs'>Weeks 2,4,6,8,12</Text>
              </Box>
            </PopoverTrigger>
            <PopoverContent bg='gray.100' color='black'>
              <PopoverHeader fontWeight='semibold'>Customization</PopoverHeader>
              <PopoverArrow bg='black' />
              <PopoverCloseButton bg='gray.200' />
              <PopoverBody>
                Tadaa!! The arrow color and background color is customized. Check the
                props for each component.
              </PopoverBody>
            </PopoverContent>
          </Popover>

    )
  }
  
  const makeBoxes = (i) => {
    const boxes = [];
      for (let j = 1; j < 24; j++) {
        if (j === 0) {
          boxes.push(<Center id={days[i]} bg ={oddColor} height='80px'>{days[i]}</Center>)
        } else {
          boxes.push(makePopover(i,j))
        }
      }
    return boxes;
  }
  const monday = makeBoxes(0);
  const tuesday = makeBoxes(1);
  const wednesday = makeBoxes(2);
  const thursday = makeBoxes(3);
  const friday = makeBoxes(4);
  const saturday = makeBoxes(5);
  const sunday = makeBoxes(6);

  const toggleWeekend = () => {
    if (weekend) {
      setWeekend(false)
    } else {
      setWeekend(true)
    }
  }  

  const makeTiming = (start) => {
    timeDisplay.push(<Text></Text>)
    for (let i = start; i < start+15; i++) {
      timeDisplay.push(<Text>{time[i % 24]}</Text>)
    }
    timeDisplay.push(<Text></Text>)
    return timeDisplay;
  }

  const setStart = (time) => {
    setStartTime(time);
  }
  
  return (
    <Container overflowX="auto" overflowY="auto" minWidth = "1600">
      <VStack spacing = {0.3}>
        <HStack spacing='64px'>
          {makeTiming(startTime)}
        </HStack>
        <Container overflowX="auto" overflowY="hidden" minWidth = "1600">
          <SimpleGrid columns={16} spacing={1}>
          <Center bg ={oddColor} height='80px'>{days[0]}</Center>
            {monday.slice(startTime - 1, startTime + 14 % 24)}
            <Center bg ={oddColor} height='80px'>{days[1]}</Center>
            {tuesday.slice(startTime - 1, startTime + 14 % 24)}
            <Center bg ={oddColor} height='80px'>{days[2]}</Center>
            {wednesday.slice(startTime - 1, startTime + 14 % 24)}
            <Center bg ={oddColor} height='80px'>{days[3]}</Center>
            {thursday.slice(startTime - 1, startTime + 14 % 24)}
            <Center bg ={oddColor} height='80px'>{days[4]}</Center>
            {friday.slice(startTime - 1, startTime + 14 % 24)}
            {weekend ? <Center bg ={oddColor} height='80px'>{days[5]}</Center> : <></>}
            {weekend ? saturday.slice(startTime - 1, startTime + 14 % 24) : <></>}
            {weekend ? <Center bg ={oddColor} height='80px'>{days[6]}</Center> : <></>}
            {weekend ? sunday.slice(startTime - 1, startTime + 14 % 24): <></>}
          </SimpleGrid>    
        </Container>
        
      </VStack>
        <Stack direction='row' spacing={4} align='center' p={4}>
          <Select placeholder='Default' width="20%">
            <option value='option1'>Even Week</option>
            <option value='option2'>Odd Week</option>
          </Select>
          <Spacer />
          <ButtonGroup gap='2'>
            <Button colorScheme='teal' variant='solid' onClick={toggleWeekend}>
              Toggle Weekend
            </Button>
            <Button colorScheme='orange' variant='solid'>
              NUSMODS
            </Button>
          </ButtonGroup>
        </Stack>
    </Container>
    )
}

export default Timetable2