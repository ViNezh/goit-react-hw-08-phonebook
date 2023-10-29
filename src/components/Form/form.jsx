import { useState } from 'react';
import css from './form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'components/redux/phonebook/selectors';
import { addContact } from 'components/redux/phonebook/slice';

// Перевірка валідності введених значень в поля вводу за допомогою RegExp
const isValidName = data => {
  const patternName =
    /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
  return patternName.test(data);
};
const isValidNumber = data => {
  const patternNumber =
    /^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/gm;
  return patternNumber.test(data);
};

const Form = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  // Функція обробки відправки форми
  const handleSubmit = evt => {
    // Відміняємо дії браузера за замовчуванням
    evt.preventDefault();
    // Перевіряємо валідність введених значень
    if (!isValidName(name)) {
      alert('Field "name" must by filled corectly!!!');
      return;
    } else if (!isValidNumber(phone)) {
      alert('Field "phone number" must by filled corectly!!!');
      return;
    }
    // Перевіряємо повторне введення імені контакту
    if (contactIsPresent(name)) {
      alert(`Contact with name "${name}" already exists.`);
      return;
    }

    // Створення об'єкту контакта
    const newContact = {
      name,
      phone,
    };

    // Виклик функції додавання контакта в store
    dispatch(addContact(newContact));

    // Очищаємо поля вводу
    reset();
  };
  // Функція перевірки повторного вводу імені контакту в записник
  const contactIsPresent = name => {
    return contacts.some(contact => contact.name === name);
  };
  // Функція контролю введених значень в поля імені та номеру телефону
  const handleChange = evt => {
    const { name, value } = evt.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      default:
        return;
    }
  };
  // Функція очистки полів вводу
  const reset = () => {
    setName('');
    setPhone('');
  };

  return (
    <form className={css.formData} onSubmit={handleSubmit}>
      <label>
        {'Name  '}
        <input
          type="text"
          name="name"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          className={css.inputData}
          value={name}
          onChange={handleChange}
        />
      </label>
      <label>
        {'Phone  '}
        <input
          type="tel"
          name="phone"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          className={css.inputNumber}
          value={phone}
          onChange={handleChange}
        />
      </label>
      <button type="submit" className={css.submitButton}>
        Add contact
      </button>
    </form>
  );
};
export { Form };
