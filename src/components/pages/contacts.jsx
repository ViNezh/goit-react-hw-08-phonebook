import Form from '../Form/form';
import { ContactList } from '../ContactList/contactList';
import { Filter } from '../Filter/filter';
import { useSelector } from 'react-redux';
import { selectAuthAuthentificated } from 'components/redux/auth/authSelectors';

const Contacts = () => {
  const isAuthentificated = useSelector(selectAuthAuthentificated);
  return (
    isAuthentificated && (
      <>
        <h1>Phonebook</h1>
        <Form />

        <h2>Contact list</h2>
        <Filter />
        <ContactList />
      </>
    )
  );
};
export default Contacts;
