import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../../../redux/filter/filter-slice';
import { getFilter } from '../../../redux/filter/filter-selectors';
import styles from './filter.module.css';

const Filter = () => {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const handleFilter = ({ target: { value } }) => {
    dispatch(setFilter(value));
  };

  return (
    <div>
      <h2 className={styles.title}>Contacts</h2>
      <label>
        Find contacts by name:
        <input
          onChange={handleFilter}
          name="filter"
          placeholder="filter contacts..."
          value={filter}
          className={styles.input}
        />
      </label>
    </div>
  );
};

export default Filter;
