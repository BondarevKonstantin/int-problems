import { Link as ReactRouterLink } from 'react-router-dom'
import { Link, Text } from '@chakra-ui/react'

interface NavLinkProps {
  to: string
}

const NavLink: React.FC<NavLinkProps> = ({ children, to = '/', ...rest }) => {
  return (
    <Link as={ReactRouterLink} to={to}>
      <Text display="block" {...rest} ml={6}>
        {children}
      </Text>
    </Link>
  )
}

export default NavLink
