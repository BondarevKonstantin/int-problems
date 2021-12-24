import { Flex } from '@chakra-ui/react'
import NavLink from '../NavLink'
import { routerLinks } from '../../constants/routerConstants'

const LinkGroup: React.FC = () => {
  return (
    <Flex justifyContent="space-around">
      {routerLinks.map((route) => (
        <NavLink to={route.link}>{route.label}</NavLink>
      ))}
    </Flex>
  )
}

export default LinkGroup
