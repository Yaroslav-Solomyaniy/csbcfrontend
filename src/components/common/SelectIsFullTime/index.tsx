import Select from '../Select';
import { useStudentsContext } from '../../../context/students';

interface SelectCurator {
  type: 'filter' | 'modal';
  label?: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
}

const SelectPIB = ({
  type,
  label,
  onChange,
  value,
  placeholder,
  error,
}: SelectCurator): JSX.Element => {
  const options = [
    { value: 'Денна', label: 'Денна' },
    { value: 'Заочна', label: 'Заочна' },
  ];
  const { getStudents } = useStudentsContext();

  // useEffect(() => {
  //   if (getStudents?.data?.items.length) {
  //     setOptions(getStudents?.data?.items.map((name) => ({
  //       value: name.id,
  //       label: name.user.firstName,
  //     })));
  //   }
  // }, [getStudents?.data]);

  return (
    <Select
      type={type}
      label={label}
      onChange={onChange}
      value={value}
      options={options}
      placeholder={placeholder}
      isSearchable
      isClearable
      required
      error={error}
    />
  );
};

SelectPIB.defaultProps = {
  placeholder: '',
  label: '',
  error: '',
};

export default SelectPIB;
