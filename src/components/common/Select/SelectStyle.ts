export const SelectStylesDesktop:Record<string, object> = {
  pagination: {
    control: (provided: object) => ({
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
    indicatorSeparator: (provided: object) => ({
      ...provided,
      display: 'none',
    }),
    indicatorsContainer: (provided: object) => ({
      ...provided,
      height: '32px',
    }),
    option: (base: object) => ({
      ...base,
      color: 'rgba(0, 0, 0, 0.75)',
      background: '#FEFEFE',
      '&:hover': {
        cursor: 'pointer',
        background: '#D7E7F4',
      },
    }),
    menu: (base: object) => ({
      ...base,
      background: '#FEFEFE',
      overflow: 'hidden',
    }),
    menuList: (base: object) => ({
      ...base,
      background: '#FEFEFE',
    }),
    clearIndicator: (provided: object) => ({
      ...provided,
      '&:hover': {
        backgroundColor: 'transparent',
        color: 'rgba(45, 112, 169, 1)',
      },
    }),
    dropdownIndicator: (provided: object) => ({
      ...provided,
      '&:hover': {
        backgroundColor: 'transparent',
        color: 'rgba(45, 112, 169, 1)',
      },
    }),
  },
  filter: {
    control: (provided: object) => ({
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
    indicatorSeparator: (provided: object) => ({
      ...provided,
      display: 'none',
    }),
    option: (base: object, state:Record<string, object>) => ({
      ...base,
      background: state.isSelected ? '#428BCA' : '#FEFEFE',
      '&:hover': {
        cursor: 'pointer',
        background: state.isSelected ? '#428BCA' : '#D7E7F4',
      },
    }),
    menu: (base: object) => ({
      ...base,
      background: '#FEFEFE',
      overflow: 'hidden',
      zIndex: 980,
    }),
    menuList: (base: object) => ({
      ...base,
      background: '#FEFEFE',
      zIndex: 980,
    }),
    valueContainer: (provided: object) => ({
      ...provided,
      padding: '9px 16px',
      fontSize: '14px',
    }),
    clearIndicator: (provided: object) => ({
      ...provided,
      '&:hover': {
        backgroundColor: 'transparent',
        color: 'rgba(45, 112, 169, 1)',
      },
    }),
    dropdownIndicator: (provided: object) => ({
      ...provided,
      '&:hover': {
        backgroundColor: 'transparent',
        color: 'rgba(45, 112, 169, 1)',
      },
    }),
  },
  modal: {
    control: (provided: object) => ({
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
    indicatorSeparator: (provided: object) => ({
      ...provided,
      display: 'none',
    }),
    option: (base: object, state:Record<string, object>) => ({
      ...base,
      background: state.isSelected ? '#428BCA' : '#FEFEFE',
      '&:hover': {
        cursor: 'pointer',
        background: state.isSelected ? '#428BCA' : '#D7E7F4',
      },
    }),
    menu: (base: object) => ({
      ...base,
      background: '#FEFEFE',
      overflow: 'hidden',
      zIndex: 980,
    }),
    menuList: (base: object) => ({
      ...base,
      background: '#FEFEFE',
      zIndex: 980,
    }),
    valueContainer: (provided: object) => ({
      ...provided,
      padding: '8px 16px',
      fontSize: '14px',
      height: '32px',
    }),
    input: (provided: object) => ({
      ...provided,
      margin: '0px',
      padding: '0',
    }),
    indicatorsContainer: (provided: object) => ({
      ...provided,
      height: '32px',
    }),
    clearIndicator: (provided: object) => ({
      ...provided,
      '&:hover': {
        backgroundColor: 'transparent',
        color: 'rgba(45, 112, 169, 1)',
      },
    }),
    dropdownIndicator: (provided: object) => ({
      ...provided,
      '&:hover': {
        backgroundColor: 'transparent',
        color: 'rgba(45, 112, 169, 1)',
      },
    }),
  },
  mini: {
    control: (provided: object) => ({
      ...provided,
      background: '#fff',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      height: '42px',
      width: '180px',
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
    indicatorSeparator: (provided: object) => ({
      ...provided,
      display: 'none',
    }),
    option: (base: object, state:Record<string, object>) => ({
      ...base,
      background: state.isSelected ? '#428BCA' : '#FEFEFE',
      '&:hover': {
        cursor: 'pointer',
        background: state.isSelected ? '#428BCA' : '#D7E7F4',
      },
    }),
    menu: (base: object) => ({
      ...base,
      background: '#FEFEFE',
      overflow: 'hidden',
      zIndex: 980,
    }),
    menuList: (base: object) => ({
      ...base,
      background: '#FEFEFE',
      zIndex: 980,
    }),
    valueContainer: (provided: object) => ({
      ...provided,
      padding: '9px 16px',
      fontSize: '14px',
    }),
    clearIndicator: (provided: object) => ({
      ...provided,
      '&:hover': {
        backgroundColor: 'transparent',
        color: 'rgba(45, 112, 169, 1)',
      },
    }),
    dropdownIndicator: (provided: object) => ({
      ...provided,
      '&:hover': {
        backgroundColor: 'transparent',
        color: 'rgba(45, 112, 169, 1)',
      },
    }),
  },
};
export const SelectStylesTablet:Record<string, object> = {
  pagination: {
    ...SelectStylesDesktop.pagination,
  },
  filter: {
    ...SelectStylesDesktop.filter,
    control: (provided: object) => ({
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
    control: (provided: object) => ({
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
    valueContainer: (provided: object) => ({
      ...provided,
      height: '42px',
      padding: '5px 16px',
    }),
    indicatorsContainer: (provided: object) => ({
      ...provided,
      height: '42px',
    }),
  },
  mini: {
    control: (provided: object) => ({
      ...provided,
      background: '#fff',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      height: '42px',
      width: '150px',
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
    indicatorSeparator: (provided: object) => ({
      ...provided,
      display: 'none',
    }),
    option: (base: object, state:Record<string, object>) => ({
      ...base,
      background: state.isSelected ? '#428BCA' : '#FEFEFE',
      '&:hover': {
        cursor: 'pointer',
        background: state.isSelected ? '#428BCA' : '#D7E7F4',
      },
    }),
    menu: (base: object) => ({
      ...base,
      background: '#FEFEFE',
      overflow: 'hidden',
      zIndex: 980,
    }),
    menuList: (base: object) => ({
      ...base,
      background: '#FEFEFE',
      zIndex: 980,
    }),
    valueContainer: (provided: object) => ({
      ...provided,
      padding: '9px 16px',
      fontSize: '14px',
    }),
    clearIndicator: (provided: object) => ({
      ...provided,
      '&:hover': {
        backgroundColor: 'transparent',
        color: 'rgba(45, 112, 169, 1)',
      },
    }),
    dropdownIndicator: (provided: object) => ({
      ...provided,
      '&:hover': {
        backgroundColor: 'transparent',
        color: 'rgba(45, 112, 169, 1)',
      },
    }),
  },
};
export const SelectStylesPhone:Record<string, object> = {
  pagination: {
    ...SelectStylesDesktop.pagination,
  },
  mini: {
    control: (provided: object) => ({
      ...provided,
      background: '#fff',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      height: '42px',
      width: '150px',
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
    indicatorSeparator: (provided: object) => ({
      ...provided,
      display: 'none',
    }),
    option: (base: object, state: Record<string, object>) => ({
      ...base,
      background: state.isSelected ? '#428BCA' : '#FEFEFE',
      '&:hover': {
        cursor: 'pointer',
        background: state.isSelected ? '#428BCA' : '#D7E7F4',
      },
    }),
    menu: (base: object) => ({
      ...base,
      background: '#FEFEFE',
      overflow: 'hidden',
      zIndex: 980,
    }),
    menuList: (base: object) => ({
      ...base,
      background: '#FEFEFE',
      zIndex: 980,
    }),
    valueContainer: (provided: object) => ({
      ...provided,
      padding: '9px 16px',
      fontSize: '14px',
    }),
    clearIndicator: (provided: object) => ({
      ...provided,
      '&:hover': {
        backgroundColor: 'transparent',
        color: 'rgba(45, 112, 169, 1)',
      },
    }),
    dropdownIndicator: (provided: object) => ({
      ...provided,
      '&:hover': {
        backgroundColor: 'transparent',
        color: 'rgba(45, 112, 169, 1)',
      },
    }),
  },
  filter: {
    ...SelectStylesTablet.filter,
    control: (provided: object) => ({
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
    control: (provided: object) => ({
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
    valueContainer: (provided: object) => ({
      ...provided,
      height: '42px',
      padding: '5px 16px',
    }),
    indicatorsContainer: (provided: object) => ({
      ...provided,
      height: '42px',
    }),
  },
};
