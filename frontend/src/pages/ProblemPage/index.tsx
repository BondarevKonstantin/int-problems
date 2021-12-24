import Board from 'components/Board'
import { Container } from '@chakra-ui/react'

const ProblemPage = () => {
  return (
    <div className="Problem__container">
      <Container maxWidth="100%" centerContent>
        <Board />
      </Container>
    </div>
  )
}
export default ProblemPage
