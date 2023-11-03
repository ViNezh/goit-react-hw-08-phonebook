import Form from '../Form/form';
import { ContactList } from '../ContactList/contactList';
import { Filter } from '../Filter/filter';
import { useSelector } from 'react-redux';
import { selectAuthentificated } from 'components/redux/auth/authSelectors';
import { Text } from '@chakra-ui/react';

const Contacts = () => {
  const isAuthentificated = useSelector(selectAuthentificated);
  return (
    isAuthentificated && (
      <>
        <Text mt="5" fontSize="3xl">
          New contact
        </Text>
        <Form />

        <Text mt="5" fontSize="3xl">
          Contact list
        </Text>
        <Filter />
        <ContactList />
      </>
    )
  );
};
export default Contacts;
