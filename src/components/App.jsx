import { useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { Wrapper } from './App.styled';
import { useLocalStorage } from 'hooks/useLocalStorage';

export function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const addContact = ({ name, number }) => {
    const isInContacts = contacts.some(contact => {
      const existContact = contact.name.toLowerCase();
      const newContact = name.toLowerCase();
      return existContact === newContact;
    });

    if (isInContacts) {
      alert(`${name} is already in contacts.`);
      return;
    }
    const newContact = {
      name,
      number,
      id: nanoid(),
    };
    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const deleteContact = contactId => {
    setContacts(contacts =>
      contacts.filter(contact => contact.id !== contactId)
    );
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <Wrapper>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={getFilteredContacts()}
        onDeleteContact={deleteContact}
      />
    </Wrapper>
  );
}
