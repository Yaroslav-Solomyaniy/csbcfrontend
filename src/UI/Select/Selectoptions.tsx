import React, { FC } from 'react';
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
const Selectoptions: FC<IselectOptions> = ({ select, placeholder }) => (
  <div>
    <Select
      options={select}
      placeholder={placeholder}
      classNamePrefix="custom-select"
    />
  </div>
);

export default Selectoptions;
