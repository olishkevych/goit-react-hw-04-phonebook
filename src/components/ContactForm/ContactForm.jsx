import { Component, useState } from 'react';
import styles from './ContactForm.module.css';

export const ContactForm = props => {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');

  const onInputChange = event => {
    event.target.name === 'number'
      ? setNumber(event.target.value)
      : setName(event.target.value);
  };

  const onSubmit = event => {
    event.preventDefault();
    props.addContact({ name, number });
    setName('');
    setNumber([]);
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={onInputChange}
          placeholder="Name"
        />

        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={onInputChange}
          placeholder="Phone number"
        />

        <button type="submit" className={styles.addBtn}>
          Add contact
        </button>
      </form>
    </div>
  );
};
