import Logo from './components/Logo'
import LinkGroup from './components/LinkGroup'
import { Flex, Box } from '@chakra-ui/react'

const AppHeader: React.FC = () => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      h={50}
      bg="tomato"
      px={6}
      mb={5}
    >
      <Logo />
      <LinkGroup />
    </Flex>
  )
}

export default AppHeader
