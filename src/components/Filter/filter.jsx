import React from 'react';
import { Input } from '@chakra-ui/react';
import css from './filter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from '../../redux/phonebook/selectors';
import { updateFilter } from '../../redux/phonebook/slice';

export const Filter = () => {
  const value = useSelector(selectFilter);
  const dispatch = useDispatch();
  return (
    <label className={css.filterLabel}>
      {'Find contact by name  '}
      <Input
        type="text"
        variant="filled"
        value={value}
        className={css.filterInput}
        onChange={evt => {
          dispatch(updateFilter(evt.currentTarget.value));
        }}
      />
    </label>
  );
};
