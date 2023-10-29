import React from 'react';
import css from './contactList.module.css';
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
import { ErrorComponent } from 'components/onError/onError';

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
      {error && <ErrorComponent error={error} />}
      <ul className={css.contactList}>
        {filteredContacts.length > 0 &&
          filteredContacts.map(contact => (
            <li key={contact.name}>
              <div className={css.contactListItem}>
                <span className={css.fieldName}>{contact.name}:</span>
                <span className={css.fieldNumber}>{contact.phone}</span>
                <button
                  className={css.deleteBtn}
                  onClick={() => {
                    dispatch(deleteContact(contact.id));
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};
