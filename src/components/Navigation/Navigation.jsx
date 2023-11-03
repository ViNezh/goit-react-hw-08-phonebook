import { Link } from 'react-router-dom';
import { Link as ChakraLink, Tab, TabList, Tabs } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { selectAuthentificated } from 'components/redux/auth/authSelectors';
import UserMenu from 'components/UserMenu/UserMenu';

const Navigation = () => {
  const isAuthentificated = useSelector(selectAuthentificated);
  return (
    <header>
      <Tabs isLazy size="lg">
        <TabList>
          <Tab fontSize="2xl">
            <ChakraLink as={Link} to="/">
              Home
            </ChakraLink>
          </Tab>
          {isAuthentificated ? (
            <>
              <Tab fontSize="2xl">
                <ChakraLink as={Link} to="/contacts">
                  Contacts
                </ChakraLink>
              </Tab>
              <UserMenu />
            </>
          ) : (
            <>
              <Tab fontSize="2xl">
                <ChakraLink as={Link} to="/login">
                  Login
                </ChakraLink>
              </Tab>
              <Tab fontSize="2xl">
                <ChakraLink as={Link} to="/registration">
                  Registration
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
