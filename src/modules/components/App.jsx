import { Provider } from 'react-redux';
import { store } from 'redux/store';

import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

const App = () => {
  return (
    <Provider store={store}>
      <ContactForm />
      <Filter />
      <ContactList />
    </Provider>
  );
};

export default App;
