import { useEffect, useState } from 'react';
import Select from '../Select';
import { Option } from '../../../types';

const useCuratorOptionsGet = () => ({
  curatorOptionsGet: () => undefined, data: [],
});

interface SelectCurator {
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SelectCurator = ({ onChange, value, placeholder }: SelectCurator): JSX.Element => {
  const { curatorOptionsGet, data } = useCuratorOptionsGet();

  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    curatorOptionsGet();

    //
    setOptions([
      { value: '5', label: '5' },
      { value: '11', label: '11' },
    ] /* convert data to options type */);
  }, []);

  useEffect(() => {
    if (data.length) {
      setOptions([
        { value: '5', label: '5' },
        { value: '11', label: '11' },
      ] /* convert data to options type */);
    }
  }, [data]);

  return <Select onChange={onChange} value={value} options={options} placeholder={placeholder} />;
};

SelectCurator.defaultProps = {
  placeholder: '',
};

export default SelectCurator;
