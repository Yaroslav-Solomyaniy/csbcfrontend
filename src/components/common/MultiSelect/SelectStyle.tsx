export const MultiSelectDesktopStyle: any = {
  modal: {
    control: (provided: any) => ({
      ...provided,
      background: '#fff',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      minHeight: 25,
      boxSizing: 'border-box',
      borderRadius: '8px',
      marginTop: 16,
      color: 'rgba(0, 0, 0, 0.75)',
      boxShadow: 'none',
      '&:hover': {
        border: '1px solid rgba(39, 111, 173, 1)',
      },
      '&:focus': {
        border: '1px solid rgba(39, 111, 173, 1)',
      },
      '&:active': {
        border: '1px solid rgba(39, 111, 173, 1)',
      },
    }),
    multiValue: (base: any) => ({
      ...base,
      backgroundColor: 'white',
      fontSize: '14px',
      border: '1px solid rgba(66, 139, 202, 1)',
      overflow: 'hidden',
      borderRadius: 4,
      margin: '2px 2px',
      minWidth: '45%',
      width: 'auto',
      display: 'flex',
      justifyContent: 'space-Between',
    }),
    multiValueLabel: (base: any) => ({
      ...base,
      backgroundColor: 'white',
    }),
    multiValueRemove: (base: any) => ({
      ...base,
      color: 'rgba(0, 0, 0, 0.75)',
      '&:hover': {
        color: 'rgba(39, 111, 173, 1)',
      },
    }),
    menu: (base: any) => ({
      ...base,
      background: '#FEFEFE',
      overflow: 'hidden',
    }),
    menuList: (base: any) => ({
      ...base,
      background: '#FEFEFE',
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      padding: '0 15px',
    }),
    indicatorSeparator: (provided: any) => ({
      ...provided,
      display: 'none',
    }),
    indicatorsContainer: (provided: any) => ({
      ...provided,
      minHeight: 30,
      maxHeight: 30,
    }),
    input: (provided: any) => ({
      ...provided,
      margin: '0px',
      padding: '0',
    }),
    clearIndicator: (provided: any) => ({
      ...provided,
      '&:hover': {
        backgroundColor: 'transparent',
        color: 'rgba(45, 112, 169, 1)',
      },
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      '&:hover': {
        backgroundColor: 'transparent',
        color: 'rgba(45, 112, 169, 1)',
      },
    }),
  },
};

export const MultiSelectMobileStyle: any = {
  modal: {
    ...MultiSelectDesktopStyle.modal,
    control: (provided: any) => ({
      ...provided,
      background: '#fff',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      minHeight: 42,
      boxSizing: 'border-box',
      marginTop: '5px',
      borderRadius: '8px',
      color: 'rgba(0, 0, 0, 0.75)',
      boxShadow: 'none',
      '&:hover': {
        border: '1px solid rgba(39, 111, 173, 1)',
      },
      '&:focus': {
        border: '1px solid rgba(39, 111, 173, 1)',
      },
      '&:active': {
        border: '1px solid rgba(39, 111, 173, 1)',
      },
    }),
    indicatorsContainer: (provided: any) => ({
      ...provided,
      minHeight: 40,
      maxHeight: 40,
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      padding: '0 20px',
    }),
  },
};
