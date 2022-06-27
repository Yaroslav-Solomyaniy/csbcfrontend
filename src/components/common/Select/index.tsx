import ReactSelect from 'react-select';
import React from 'react';
import styles from './index.module.scss';

interface Select {
  label?: string;
}

const Select = ({ label }: Select): JSX.Element => (
  <div className={styles.form__input}>
    {label ? (
      <>
        <label className={styles.input__label}>Група</label>
        <ReactSelect
          className={styles.input__select}
        />
      </>
    ) : (
      <ReactSelect />
    )}
  </div>
);

Select.defaultProps = {
  label: '',
};

export default Select;
