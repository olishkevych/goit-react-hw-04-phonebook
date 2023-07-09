import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { useState, useEffect } from 'react';
import styles from './App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const isExisting = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isExisting) {
      alert(`${isExisting.name} is already in contacts`);
      return;
    }
    const contactToAdd = {
      name: name,
      number: Number(number),
      id: nanoid(),
    };

    setContacts(prevContacts => [...prevContacts, contactToAdd]);
  };

  const removeContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const onFilterInput = event => {
    setFilter(event.target.value);
  };

  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <div className={styles.wrapper}>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <h2>Contacts</h2>
      <Filter onFilterInput={onFilterInput} />
      <ContactList
        contacts={getFilteredContacts()}
        removeContact={removeContact}
      />
    </div>
  );
};
