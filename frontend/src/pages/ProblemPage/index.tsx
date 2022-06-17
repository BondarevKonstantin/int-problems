import Board from 'components/Board'
import { Container, Box, VStack, Heading, Text } from '@chakra-ui/react'

interface InfoBoxProps {
  title: string
  desc: string
}

const InfoBox = ({ title, desc }: InfoBoxProps) => (
  <Box p={5} shadow="lg" borderWidth="1px" w="100%">
    <Heading fontSize="xl">{title}</Heading>
    <Text mt={4}>{desc}</Text>
  </Box>
)

const ProblemPage = () => {
  return (
    <div className="Problem__container">
      <Container
        maxWidth="100%"
        centerContent
        flexDirection="row"
        justifyContent="space-around"
      >
        <VStack w="100%" h="100%" margin="0 50px">
          <InfoBox title="Автор" desc="BondarevKonstantin" />
          <InfoBox title="Решено раз" desc="50" />
          <InfoBox title="ЭЛО задачи" desc="1132" />
        </VStack>
        <Board />
        <VStack w="100%" h="100%" margin="0 50px">
          <InfoBox title="Цель" desc="Фатум в 2 хода" />
          <Box
            p={5}
            shadow="lg"
            borderWidth="1px"
            w="100%"
            height="220px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            backgroundColor="green.300"
          >
            <Heading fontSize="xl">Задача решена</Heading>
            <Text mt={4}>Перейти к следующей задаче</Text>
          </Box>
        </VStack>
      </Container>
    </div>
  )
}
export default ProblemPage
