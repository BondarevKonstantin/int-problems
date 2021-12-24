import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Box,
  Button,
} from '@chakra-ui/react'

const AuthorizationPage = () => {
  return (
    <div className="Authorization__container">
      <Container maxWidth="100%" centerContent>
        <Box
          minW="xl"
          borderWidth="1px"
          borderRadius="lg"
          p={7}
          borderColor="tomato"
        >
          <Tabs variant="enclosed">
            <TabList>
              <Tab>Login</Tab>
              <Tab>Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <FormControl>
                  <FormLabel htmlFor="email">Username</FormLabel>
                  <Input id="email" type="email" />
                  <FormLabel htmlFor="email" mt={5}>
                    Password
                  </FormLabel>
                  <Input id="email" type="email" />
                  <Button colorScheme="red" variant="solid" mt={9} w="100%">
                    Login
                  </Button>
                </FormControl>
              </TabPanel>
              <TabPanel>
                <FormControl>
                  <FormLabel htmlFor="email">Username</FormLabel>
                  <Input id="email" type="email" />
                  <FormLabel htmlFor="email" mt={5}>
                    Password
                  </FormLabel>
                  <Input id="email" type="email" />
                  <FormLabel htmlFor="email" mt={5}>
                    Repeat Password
                  </FormLabel>
                  <Input id="email" type="email" />
                  <FormLabel htmlFor="email" mt={5}>
                    Enter your email
                  </FormLabel>
                  <Input id="email" type="email" />
                  <Button colorScheme="red" variant="solid" mt={9} w="100%">
                    Register
                  </Button>
                </FormControl>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </div>
  )
}
export default AuthorizationPage
