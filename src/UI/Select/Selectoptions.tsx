import React from 'react';
import Select from 'react-select';
import './Selectoptions.css';

export interface IselectOptions{
    select:{
        value:string;
        label:string;
    }[];
    placeholder:string;
}

// eslint-disable-next-line react/function-component-definition
function Selectoptions({ select, placeholder }: IselectOptions) {
  return (
    <div>
      <Select
        options={select}
        placeholder={placeholder}
        classNamePrefix="custom-select"
      />
    </div>
  );
}

export default Selectoptions;
