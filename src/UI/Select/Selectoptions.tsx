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

const Selectoptions = ({ select, placeholder }: IselectOptions):JSX.Element => (
  <div>
    <Select
      options={select}
      placeholder={placeholder}
      classNamePrefix="custom-select"
    />
  </div>
);

export default Selectoptions;
