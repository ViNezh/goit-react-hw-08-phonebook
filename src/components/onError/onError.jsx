import { Box, Text } from '@chakra-ui/react';
import { selectAuthError } from 'components/redux/auth/authSelectors';
import { selectContactsError } from 'components/redux/phonebook/selectors';
import React from 'react';
import { useSelector } from 'react-redux';

export const ErrorComponent = () => {
  const errorContact = useSelector(selectContactsError);
  const errorAuth = useSelector(selectAuthError);
  return (
    <Box>
      {errorAuth && <Text>Помилка: {errorAuth}</Text>}
      {errorContact && <Text>Помилка: {errorContact}</Text>}
    </Box>
  );
};
