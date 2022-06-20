import React from 'react'
import {
    Button,
    HStack,
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText, useDisclosure, 
    NumberInput, NumberInputField, NumberIncrementStepper, NumberDecrementStepper, NumberInputStepper
} from '@chakra-ui/react';
import { useState, useContext, useEffect } from 'react'
import { SettingsContext } from "../helpers/SettingsContext";
import axios from "axios"


// Settings Modal
const PomodoroSettings = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const { newTimer, setNewTimer } = useContext(SettingsContext);

    const [workVal, setWorkVal] = useState(newTimer.work)
    const [shortVal, setShortVal] = useState(newTimer.short)
    const [longVal, setLongVal] = useState(newTimer.long)
    const handleSubmit = (e) => {
        e.preventDefault();
        setNewTimer({
        work: workVal,
        short: shortVal,
        long: longVal,
        active: newTimer.active,
        })
        onClose();
        console.log(newTimer)
    }

    return (
    <>
        <Button onClick={onOpen} variant='outline'>SETTINGS</Button>
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Pomodoro Settings</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <form
                id="new-form"
                onSubmit={handleSubmit}>
                <FormControl>
                    <HStack>
                    <Box>
                    <FormLabel htmlFor='amount'>Pomodoro</FormLabel>
                    <NumberInput max={120} min={0} value={workVal} onChange={e => setWorkVal(e)}>
                        <NumberInputField id='amount' />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    </Box>
                    <Box>
                    <FormLabel htmlFor='amount'>Short Break</FormLabel>
                    <NumberInput max={15} min={0} value={shortVal} onChange={e => setShortVal(e)}>
                        <NumberInputField id='amount' />
                        <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    </Box>
                    <Box>
                    <FormLabel htmlFor='amount'>Long Break</FormLabel>
                    <NumberInput max={30} min={0} value={longVal} onChange={e => setLongVal(e)}>
                        <NumberInputField id='amount' />
                        <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    </Box>
                    </HStack>
                </FormControl>
            </form>
            </ModalBody>
            <ModalFooter>
            <Button type="submit" form="new-form">Save</Button>
            </ModalFooter>
        </ModalContent>
        </Modal>
    </>
)
}

export default PomodoroSettings