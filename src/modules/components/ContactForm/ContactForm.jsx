import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Notify } from 'notiflix';
import { addContacts } from '../../../redux/contacts/contacts-slice';
import { getAllContacts } from '../../../redux/contacts/contacts-selectors';
import styles from './contact-form.module.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(getAllContacts);
  const dispatch = useDispatch();

  const isDublicate = (name, number) => {
    const normalizedName = name.toLowerCase();
    const normalizedNumber = number.toLowerCase();
    return contacts.some(
      ({ name, number }) =>
        name.toLowerCase() === normalizedName ||
        number.toLowerCase() === normalizedNumber
    );
  };

  const handleAddContact = ({ name, number }) => {
    if (isDublicate(name, number)) {
      return Notify.warning(`Contact '${name}: ${number}' is already exist`);
    }
    dispatch(addContacts({ name, number }));
    setName('');
    setNumber('');
  };

  const handleChangeName = ({ target: { value } }) => {
    setName(value);
  };

  const handleChangeNumber = ({ target: { value } }) => {
    setNumber(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    handleAddContact({ name, number });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1 className={styles.title}>Phonebook</h1>
      <div className={styles.block}>
        <label className={styles.label}>
          Name
          <input
            onChange={handleChangeName}
            className={styles.input}
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            placeholder="Enter name"
          />
        </label>
      </div>

      <div className={styles.block}>
        <label className={styles.input_label}>
          Number
          <input
            onChange={handleChangeNumber}
            className={styles.input}
            type="tel"
            name="number"
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            placeholder="Enter number"
          />
        </label>
      </div>
      <button type="submit" className={styles.btn}>
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
