import { Box, Button, Text } from '@chakra-ui/react';
import { selectAuthUser } from 'components/redux/auth/authSelectors';
import { logOutThunk } from 'components/redux/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const UserMenu = () => {
  const user = useSelector(selectAuthUser);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(logOutThunk());
  };
  return (
    <Box display="flex" gap="3" alignItems="center">
      <Text fontSize="xl">{user.email}</Text>
      <Button
        colorScheme="blue"
        variant="solid"
        size="sm"
        onClick={handleClick}
      >
        Logout
      </Button>
    </Box>
  );
};
export default UserMenu;
