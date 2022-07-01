import { useEffect, useState } from 'react';
import Select from '../Select';
import { Option } from '../../../types';
import { UseDropDownCurators } from '../../../hooks/useGroups';

interface SelectCurator {
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SelectCurator = ({ onChange, value, placeholder }: SelectCurator): JSX.Element => {
  const { curators, DropDownCurators } = UseDropDownCurators();
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    DropDownCurators();
  }, []);

  useEffect(() => {
    if (curators?.items.length) {
      setOptions(curators.items.map((curator) => ({ value: curator.id, label: curator.firstName })));
    }
  }, [curators]);

  return (
    <Select
      onChange={onChange}
      value={value}
      options={options}
      placeholder={placeholder}
    />
  );
};

SelectCurator.defaultProps = {
  placeholder: '',
};

export default SelectCurator;
