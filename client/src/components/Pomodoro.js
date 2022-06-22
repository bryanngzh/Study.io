import {Button,
    Heading,
    VStack, 
    Stack, 
    HStack,
    Box,
    CircularProgress, 
    Text,
    CircularProgressLabel, Progress } from '@chakra-ui/react';
import { set } from 'mongoose';
import { useState, useRef, useContext, useEffect } from 'react'
import { SettingsContext } from '../helpers/SettingsContext';
import PomodoroSettings from './PomodoroSettings';

// Pomodoro 
const Pomodoro = () => {

    //Timer
    const { newTimer, setNewTimer } = useContext(SettingsContext);
    const [isPaused, setIsPaused] = useState(true);
    const [minutes, setMinutes] = useState(newTimer.work);
    const [seconds, setSeconds] = useState(0);
    const [mode, setMode] = useState('work');
    const [counter, setCounter] = useState(0);

    const secondsLeftRef = useRef(minutes * 60 + seconds);
    const isPausedRef = useRef(isPaused);

    useEffect(() => {
        
        let interval = setInterval(() => {
            if (isPausedRef.current) {
                return;
            } 
            clearInterval(interval);
            secondsLeftRef.current--;
            if (seconds === 0) {
                if (minutes !== 0) {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                } else {
                    if (mode === 'work') {
                        if (counter === 3) {
                            let minutes = newTimer.long;
                            let seconds = 0;

                            setMinutes(minutes)
                            setSeconds(seconds)
                            setMode('long')
                            secondsLeftRef.current = minutes * 60 + seconds;
                            isPausedRef.current = true;
                            setIsPaused(true);
                            setCounter(counter + 1);
                            return () => clearInterval(interval);

                        } else {
                            let minutes = newTimer.short;
                            let seconds = 0;

                            setMinutes(minutes)
                            setSeconds(seconds)
                            setMode('short')
                            secondsLeftRef.current = minutes * 60 + seconds;
                            isPausedRef.current = true;
                            setIsPaused(true);
                            setCounter(counter + 1)
                            return () => clearInterval(interval);
                        }
                        
                    } else if (mode === 'short') {
                        let minutes = newTimer.work;
                        let seconds = 0;

                        setMinutes(minutes)
                        setSeconds(seconds)
                        setMode('work')
                        secondsLeftRef.current = minutes * 60 + seconds;
                        isPausedRef.current = true;
                        setIsPaused(true);
                        return () => clearInterval(interval);
                    } else if (mode === 'long') {
                        let minutes = newTimer.work;
                        let seconds = 0;

                        setMinutes(minutes)
                        setSeconds(seconds)
                        setMode('work')
                        secondsLeftRef.current = minutes * 60 + seconds;
                        isPausedRef.current = true;
                        setIsPaused(true);
                        setCounter(0)
                        return () => clearInterval(interval);
                    }
                }
            } else {
                setSeconds(seconds - 1);
            }
            
        }, 1000)
        return () => clearInterval(interval);
    }, [seconds, mode])

    const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;
    var totalSeconds = 0;
    var colour = "";
    if (mode === 'work') {
        totalSeconds = newTimer.work * 60;
        colour = 'red.400';
    } else if (mode === 'short') {
        totalSeconds = newTimer.short * 60;
        colour = 'green.400'
    } else {
        totalSeconds = newTimer.long * 60
        colour = 'blue.400'
    }
    const percentage = Math.round(secondsLeftRef.current / totalSeconds * 100);
    
    // Start / Pause    
    const handleButton = (e) => {
        e.preventDefault();
        if (isPaused) {
            setIsPaused(!isPaused);
            isPausedRef.current = false;
        } else {
            setIsPaused(!isPaused);
            isPausedRef.current = true;

        }
    }

    // Pomodoro Button
    const handlePomodoro = (e) => {
        e.preventDefault();
        setMode('work');
        let minutes = newTimer.work;
        let seconds = 0;

        setMinutes(minutes)
        setSeconds(seconds)
        secondsLeftRef.current = minutes * 60 + seconds;
        isPausedRef.current = true;
        setIsPaused(true);
    }

    // Short Break Button
    const handleShort = (e) => {
        e.preventDefault();
        setMode('short');
        let minutes = newTimer.short;
        let seconds = 0;

        setMinutes(minutes)
        setSeconds(seconds)
        secondsLeftRef.current = minutes * 60 + seconds;
        isPausedRef.current = true;
        setIsPaused(true);
    }
    
    // Long Break Button
    const handleLong = (e) => {
        e.preventDefault();
        setMode('long');
        let minutes = newTimer.long;
        let seconds = 0;

        setMinutes(minutes)
        setSeconds(seconds)
        secondsLeftRef.current = minutes * 60 + seconds;
        isPausedRef.current = true;
        setIsPaused(true);
    }

    return (
        <div>
            <Heading as='h4' size='md'> Pomodoro </Heading>
            <Stack spacing={7}>
                <VStack>
                    <HStack>
                    <Button variant='ghost' onClick={handlePomodoro}>
                        Pomodoro
                    </Button>
                    <Button variant='ghost' onClick={handleShort}>
                        Short Break
                    </Button>
                    <Button variant='ghost' onClick={handleLong}>
                        Long Break
                    </Button>
                    </HStack>
                    <CircularProgress value={percentage} color={colour} size='200px' thickness='10px'>
                        <CircularProgressLabel> 
                            <Text fontSize='3xl'>{timerMinutes}:{timerSeconds}</Text>
                        </CircularProgressLabel>
                    </CircularProgress>
                    <HStack>
                        <Button variant='outline' onClick={handleButton}>
                            { isPaused ? <div> START </div> : <div> STOP </div> }
                        </Button>
                        <PomodoroSettings />
                    </HStack>
                </VStack>
                <Progress value={counter * 25} size='xs' colorScheme='red' />
            </Stack>
        </div>
    )
}

export default Pomodoro