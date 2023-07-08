import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { useState, useEffect } from 'react';
import styles from './App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const strigifiedContacts = localStorage.getItem('contacts');
    const contacts = JSON.parse(strigifiedContacts) ?? [];
    setContacts(contacts);
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts.length]);

  const addContact = ({ name, number }) => {
    const isExisting = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isExisting) {
      alert(`${isExisting.name} is already in contacts`);
      return;
    } else {
      const contactToAdd = {
        name: name,
        number: Number(number),
        id: nanoid(),
      };

      localStorage.setItem(
        'contacts',
        JSON.stringify([...contacts, contactToAdd])
      );
      setContacts([...contacts, contactToAdd]);
    }
  };

  const removeContact = id => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    setContacts(updatedContacts);
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
