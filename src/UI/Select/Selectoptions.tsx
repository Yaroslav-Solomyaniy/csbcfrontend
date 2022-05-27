import React, {FC} from 'react';
import Select from 'react-select';
import './Selectoptions.css';



export interface IselectOptions{
    select:{value:string,label:string}[],
    placeholder:string
}

const Selectoptions:FC<IselectOptions> = (props) => {
    return (
        <div>
            <Select options={props.select}
                    placeholder={props.placeholder}
                    classNamePrefix='custom-select'/>
        </div>
    );
};

export default Selectoptions;