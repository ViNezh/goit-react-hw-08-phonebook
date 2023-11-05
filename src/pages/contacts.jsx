import Form from '../components/Form/form';
import { ContactList } from '../components/ContactList/contactList';
import { Filter } from '../components/Filter/filter';
import { useSelector } from 'react-redux';
import { selectAuthentificated } from '../redux/auth/authSelectors';
import { Text } from '@chakra-ui/react';

const Contacts = () => {
  const isAuthentificated = useSelector(selectAuthentificated);
  return (
    isAuthentificated && (
      <main>
        <Text mt="5" fontSize="3xl" align="center">
          New contact
        </Text>
        <Form />

        <Text mt="5" fontSize="3xl" align="center">
          Contact list
        </Text>
        <Filter />
        <ContactList />
      </main>
    )
  );
};
export default Contacts;
