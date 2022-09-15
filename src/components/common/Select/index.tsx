import React from 'react';
import { Option, SelectType } from '../../../types';
import { useDeviceContext } from '../../../context/TypeDevice';
import DesktopSelect from './typeDisplay/Desktop/DesktopSelect';
import NotebookSelect from './typeDisplay/Notebook/NotebookSelect';

interface ISelect {
  options: Option[];
  value: string | number | boolean | null | undefined;
  onChange: (value: string) => void;
  type: SelectType;
  label?: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
  isSearchable?: boolean;
  isClearable?: boolean;
  isDisabled?: boolean;
  menuPos?: 'fixed' | 'absolute';
  menuPlace?: 'top' | 'auto' | 'bottom';
  isFilter?: boolean;
  isSemesterInMultiSelect?: boolean;
}

const Select = ({
  label,
  options,
  value,
  onChange,
  required,
  error,
  placeholder,
  isSearchable,
  isClearable,
  type,
  isDisabled,
  menuPos,
  menuPlace,
  isFilter,
}: ISelect): JSX.Element => {
  const { isDesktop, isNotebook } = useDeviceContext();

  return (
    <>
      {isDesktop && (
        <DesktopSelect
          options={options}
          value={value}
          onChange={onChange}
          type={type}
          label={label || ''}
          required={required || false}
          error={error || ''}
          placeholder={placeholder || ''}
          isSearchable={isSearchable || false}
          isClearable={isClearable || false}
          isDisabled={isDisabled || false}
          menuPos={menuPos || 'fixed'}
          menuPlace={menuPlace || 'auto'}
          isFilter={isFilter || false}
        />
      )}
      {isNotebook && (
        <NotebookSelect
          options={options}
          value={value}
          onChange={onChange}
          type={type}
          label={label || ''}
          required={required || false}
          error={error || ''}
          placeholder={placeholder || ''}
          isSearchable={isSearchable || false}
          isClearable={isClearable || false}
          isDisabled={isDisabled || false}
          menuPos={menuPos || 'fixed'}
          menuPlace={menuPlace || 'auto'}
          isFilter={isFilter || false}
        />
      )}
    </>
  );
};

Select.defaultProps = {
  label: '',
  error: '',
  required: false,
  placeholder: '',
  isSearchable: false,
  isClearable: false,
  menuPos: 'fixed',
  menuPlace: 'auto',
  isDisabled: false,
  isFilter: false,
  isSemesterInMultiSelect: false,
};

export default Select;
