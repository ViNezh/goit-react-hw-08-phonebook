import { NavLink as ReactRouterLink } from 'react-router-dom';
import { Box, Link as ChakraLink } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { selectAuthentificated } from '../../redux/auth/authSelectors';
import css from './Navigation.module.css';
import UserMenu from 'components/UserMenu/UserMenu';

const Navigation = () => {
  const isAuthentificated = useSelector(selectAuthentificated);
  return (
    <header>
      <Box className={css.navigationBox}>
        <ChakraLink
          as={ReactRouterLink}
          to="/"
          className={css.headerLink}
          variant="unstyled"
        >
          Home
        </ChakraLink>
        {isAuthentificated ? (
          <>
            <ChakraLink
              as={ReactRouterLink}
              to="/contacts"
              className={css.headerLink}
            >
              Contacts
            </ChakraLink>

            <UserMenu />
          </>
        ) : (
          <>
            <ChakraLink
              as={ReactRouterLink}
              to="/login"
              className={css.headerLink}
            >
              Login
            </ChakraLink>

            <ChakraLink
              as={ReactRouterLink}
              to="/registration"
              className={css.headerLink}
            >
              Registration
            </ChakraLink>
          </>
        )}
      </Box>
      <hr className={css.bottomLine} />
    </header>
  );
};
export default Navigation;
