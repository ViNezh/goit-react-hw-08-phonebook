import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink, Flex, Tab, TabList, Tabs } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { selectAuthAuthentificated } from 'components/redux/auth/authSelectors';
import UserMenu from 'components/UserMenu/UserMenu';

const Navigation = () => {
  const isAuthentificated = useSelector(selectAuthAuthentificated);
  return (
    <header>
      <Tabs isLazy>
        <TabList>
          <Tab>
            <ChakraLink as={ReactRouterLink} to="/">
              Home
            </ChakraLink>
          </Tab>
          {isAuthentificated ? (
            <>
              <Tab>
                <ChakraLink as={ReactRouterLink} to="/contacts">
                  Contacts
                </ChakraLink>
              </Tab>
              <UserMenu />
            </>
          ) : (
            <>
              <Tab>
                <ChakraLink as={ReactRouterLink} to="/registration">
                  Registration
                </ChakraLink>
              </Tab>
              <Tab>
                <ChakraLink as={ReactRouterLink} to="/login">
                  Login
                </ChakraLink>
              </Tab>
            </>
          )}
        </TabList>
      </Tabs>
    </header>
  );
};
export default Navigation;

// <Flex align="center" justify="center" gap="20">
//   <ChakraLink as={ReactRouterLink} to="/">
//     Home
//   </ChakraLink>
//   <ChakraLink as={ReactRouterLink} to="/contacts">
//     Contacts
//   </ChakraLink>
//   <ChakraLink as={ReactRouterLink} to="/registration">
//     Registration
//   </ChakraLink>
//   <ChakraLink as={ReactRouterLink} to="/login">
//     Login
//   </ChakraLink>
// </Flex>;
