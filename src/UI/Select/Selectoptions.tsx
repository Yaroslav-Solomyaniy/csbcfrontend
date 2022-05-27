import React, { FC } from 'react';
import Select from 'react-select';
import './Selectoptions.css';

export interface Iselectoptions{
    select:{value:string;label:string;}[];
    placeholder:string;
}

const Selectoptions:FC<Iselectoptions> = (select:Iselectoptions) => (
  <div>
    <Select
      options={select.select}
      placeholder={select.placeholder}
      classNamePrefix="custom-select"
    />
  </div>
);

export default Selectoptions;
