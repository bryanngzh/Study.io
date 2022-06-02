import { Grid, GridItem, SimpleGrid} from '@chakra-ui/react'

const Timetable = () => {
  return (
  <Grid templateColumns='repeat(5, 1fr)' gap={1}>
    <GridItem w='100%' h='10' bg='black.500' />
    <GridItem w='100%' h='10' bg='blue.500' />
    <GridItem w='100%' h='10' bg='blue.500' />
    <GridItem w='100%' h='10' bg='blue.500' />
    <GridItem w='100%' h='10' bg='blue.500' />
  </Grid>
  )
}

export default Timetable