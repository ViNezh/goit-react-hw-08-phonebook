import { Box, Center, IconButton, Text } from '@chakra-ui/react';
import { selectAuthError } from '../../redux/auth/authSelectors';
import { selectContactsError } from '../../redux/phonebook/selectors';
import { RepeatIcon } from '@chakra-ui/icons';
import React from 'react';
import { useSelector } from 'react-redux';

const ErrorComponent = () => {
  const errorContact = useSelector(selectContactsError);
  const errorAuth = useSelector(selectAuthError);
  return (
    <Box bg="red" w="100%" p={4} color="white">
      {errorAuth && <Text>Error: {errorAuth}</Text>}
      {errorContact && <Text>Помилка: {errorContact}</Text>}
      <Text>Something went wrong, press the button and try again</Text>
      <Center>
        {' '}
        <IconButton
          icon={<RepeatIcon />}
          type="button"
          colorScheme="gray"
          size="lg"
          onClick={() => {
            window.location.reload();
          }}
        />
      </Center>
    </Box>
  );
};

export default ErrorComponent;
