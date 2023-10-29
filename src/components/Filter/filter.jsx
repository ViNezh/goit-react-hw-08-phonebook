import React from 'react';
import css from './filter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from 'components/redux/phonebook/selectors';
import { updateFilter } from 'components/redux/phonebook/slice';

export const Filter = () => {
  const value = useSelector(selectFilter);
  const dispatch = useDispatch();
  return (
    <label className={css.filterLabel}>
      {'Find contact by name  '}
      <input
        type="text"
        value={value}
        onChange={evt => {
          dispatch(updateFilter(evt.currentTarget.value));
        }}
        className={css.inputFilter}
      />
    </label>
  );
};
