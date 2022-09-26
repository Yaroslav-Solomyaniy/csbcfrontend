export const SelectStylesDesktop:any = {
  pagination: {
    control: (provided: any) => ({
      ...provided,
      background: '#fff',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      maxWidth: 75,
      minHeight: '100%',
      height: '32px',
      borderRadius: '8px',
      fontWeight: 400,
      color: 'rgba(0, 0, 0, 0.75)',
      boxShadow: 'none',
      '&:hover': {
        borderWidth: '1px',
        borderColor: 'rgba(39, 111, 173, 1)',
      },
      '&:focus': {
        borderWidth: '1px',
        borderColor: 'rgba(39, 111, 173, 1)',
      },
      '&:active': {
        borderWidth: '1px',
        borderColor: 'rgba(39, 111, 173, 1)',
      },
    }),
    indicatorSeparator: (provided: any) => ({
      ...provided,
      display: 'none',
    }),
    indicatorsContainer: (provided: any) => ({
      ...provided,
      height: '32px',
    }),
    option: (base: any, state: any) => ({
      ...base,
      background: state.isSelected ? '#428BCA' : '#FEFEFE',
      '&:hover': {
        cursor: 'pointer',
        background: state.isSelected ? '#428BCA' : '#D7E7F4',
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
  filter: {
    control: (provided: any) => ({
      ...provided,
      background: '#fff',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      height: '42px',
      width: '280px',
      borderRadius: '8px',
      boxShadow: 'none',
      fontWeight: 400,
      color: 'rgba(0, 0, 0, 0.75)',
      '&:hover': {
        borderWidth: '1px',
        borderColor: 'rgba(39, 111, 173, 1)',
      },
      '&:focus': {
        borderWidth: '1px',
        borderColor: 'rgba(39, 111, 173, 1)',
      },
      '&:active': {
        borderWidth: '1px',
        borderColor: 'rgba(39, 111, 173, 1)',
      },
    }),
    indicatorSeparator: (provided: any) => ({
      ...provided,
      display: 'none',
    }),
    option: (base: any, state: any) => ({
      ...base,
      background: state.isSelected ? '#428BCA' : '#FEFEFE',
      '&:hover': {
        cursor: 'pointer',
        background: state.isSelected ? '#428BCA' : '#D7E7F4',
      },
    }),
    menu: (base: any) => ({
      ...base,
      background: '#FEFEFE',
      overflow: 'hidden',
      zIndex: 980,
    }),
    menuList: (base: any) => ({
      ...base,
      background: '#FEFEFE',
      zIndex: 980,
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      padding: '9px 16px',
      fontSize: '14px',
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
  modal: {
    control: (provided: any) => ({
      ...provided,
      background: '#fff',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      minHeight: '32px',
      height: '32px',
      borderRadius: '8px',
      marginTop: 16,
      boxShadow: 'none',
      fontWeight: 400,
      color: 'rgba(0, 0, 0, 0.75)',
      '&:hover': {
        borderWidth: '1px',
        borderColor: 'rgba(39, 111, 173, 1)',
      },
      '&:focus': {
        borderWidth: '1px',
        borderColor: 'rgba(39, 111, 173, 1)',
      },
      '&:active': {
        borderWidth: '1px',
        borderColor: 'rgba(39, 111, 173, 1)',
      },
    }),
    indicatorSeparator: (provided: any) => ({
      ...provided,
      display: 'none',
    }),
    option: (base: any, state: any) => ({
      ...base,
      background: state.isSelected ? '#428BCA' : '#FEFEFE',
      '&:hover': {
        cursor: 'pointer',
        background: state.isSelected ? '#428BCA' : '#D7E7F4',
      },
    }),
    menu: (base: any) => ({
      ...base,
      background: '#FEFEFE',
      overflow: 'hidden',
      zIndex: 980,
    }),
    menuList: (base: any) => ({
      ...base,
      background: '#FEFEFE',
      zIndex: 980,
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      padding: '8px 16px',
      fontSize: '14px',
      height: '32px',
    }),
    input: (provided: any) => ({
      ...provided,
      margin: '0px',
      padding: '0',
    }),
    indicatorsContainer: (provided: any) => ({
      ...provided,
      height: '32px',
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
export const SelectStylesTablet:any = {
  pagination: {
    ...SelectStylesDesktop.pagination,
  },
  filter: {
    ...SelectStylesDesktop.filter,
    control: (provided: any) => ({
      ...provided,
      background: '#fff',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      height: '42px',
      width: '100%',
      borderRadius: '8px',
      boxShadow: 'none',
      fontWeight: 400,
      color: 'rgba(0, 0, 0, 0.75)',
      '&:hover': {
        borderWidth: '1px',
        borderColor: 'rgba(39, 111, 173, 1)',
      },
      '&:focus': {
        borderWidth: '1px',
        borderColor: 'rgba(39, 111, 173, 1)',
      },
      '&:active': {
        borderWidth: '1px',
        borderColor: 'rgba(39, 111, 173, 1)',
      },
    }),
  },
  modal: {
    ...SelectStylesDesktop.modal,
    control: (provided: any) => ({
      ...provided,
      height: '42px',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      boxShadow: 'none',
      fontWeight: 400,
      color: 'rgba(0, 0, 0, 0.75)',
      '&:hover': {
        borderWidth: '1px',
        borderColor: 'rgba(39, 111, 173, 1)',
      },
      '&:focus': {
        borderWidth: '1px',
        borderColor: 'rgba(39, 111, 173, 1)',
      },
      '&:active': {
        borderWidth: '1px',
        borderColor: 'rgba(39, 111, 173, 1)',
      },
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      height: '42px',
      padding: '5px 16px',
    }),
    indicatorsContainer: (provided: any) => ({
      ...provided,
      height: '42px',
    }),
  },
};
export const SelectStylesPhone:any = {
  pagination: {
    ...SelectStylesTablet.pagination,
  },
  filter: {
    ...SelectStylesTablet.filter,
    control: (provided: any) => ({
      ...provided,
      background: '#fff',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      height: '42px',
      width: '100%',
      borderRadius: '8px',
      boxShadow: 'none',
      fontWeight: 400,
      color: 'rgba(0, 0, 0, 0.75)',
      '&:hover': {
        borderWidth: '1px',
        borderColor: 'rgba(39, 111, 173, 1)',
      },
      '&:focus': {
        borderWidth: '1px',
        borderColor: 'rgba(39, 111, 173, 1)',
      },
      '&:active': {
        borderWidth: '1px',
        borderColor: 'rgba(39, 111, 173, 1)',
      },
    }),
  },
  modal: {
    ...SelectStylesTablet.modal,
    control: (provided: any) => ({
      ...provided,
      height: '42px',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      boxShadow: 'none',
      fontWeight: 400,
      color: 'rgba(0, 0, 0, 0.75)',
      '&:hover': {
        borderWidth: '1px',
        borderColor: 'rgba(39, 111, 173, 1)',
      },
      '&:focus': {
        borderWidth: '1px',
        borderColor: 'rgba(39, 111, 173, 1)',
      },
      '&:active': {
        borderWidth: '1px',
        borderColor: 'rgba(39, 111, 173, 1)',
      },
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      height: '42px',
      padding: '5px 16px',
    }),
    indicatorsContainer: (provided: any) => ({
      ...provided,
      height: '42px',
    }),
  },
};
