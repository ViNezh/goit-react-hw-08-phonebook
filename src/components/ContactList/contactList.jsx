import React from 'react';
import css from './contactList.module.css';
import { HiUserCircle } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectContacts,
  selectContactsError,
  selectContactsIsLoading,
  selectFilter,
} from 'components/redux/phonebook/selectors';
import { deleteContact, fetchContacts } from 'components/redux/phonebook/slice';
import { useEffect } from 'react';
import Loader from 'components/Loader/loader';
import ErrorComponent from 'components/onError/onError';
import { Box, Button, List, ListIcon, ListItem, Text } from '@chakra-ui/react';

export const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectContactsIsLoading);
  const error = useSelector(selectContactsError);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase().trim())
  );

  return (
    <>
      {isLoading && <Loader />}
      {error && <ErrorComponent />}
      <List className={css.contactList}>
        {filteredContacts.length > 0 &&
          filteredContacts.map(contact => (
            <ListItem key={contact.name} className={css.contactListItem}>
              <ListIcon as={HiUserCircle} color="blue.500" />
              <Box className={css.contactWrapper}>
                <Text>{contact.name}:</Text>
                <Text className={css.fieldNumber}>{contact.number}</Text>
                <Button
                  type="button"
                  colorScheme="blue"
                  size="xs"
                  onClick={() => {
                    dispatch(deleteContact(contact.id));
                  }}
                >
                  Delete
                </Button>
              </Box>
            </ListItem>
          ))}
      </List>
    </>
  );
};
