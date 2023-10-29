import { Form } from './Form/form';
import { ContactList } from './ContactList/contactList';
import { Filter } from './Filter/filter';

const App = () => {
  return (
    <>
      <h1>Phonebook</h1>
      <Form />

      <h2>Contact list</h2>
      <Filter />
      <ContactList />
    </>
  );
};
export default App;
