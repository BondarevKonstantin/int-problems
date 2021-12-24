import { Box, Text } from '@chakra-ui/react'

const Logo: React.FC = (props) => {
  return (
    <Box {...props}>
      <Text fontSize="lg" fontWeight="bold">
        IntProblems
      </Text>
    </Box>
  )
}

export default Logo
