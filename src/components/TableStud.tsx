import React from 'react';

function Table(list: Array<any>) {
  return (
    <div>
      {list.map((strl: any) => {
        <div>
          {strl.map((elem: any) => {
            <span>{elem}</span>;
          })}
        </div>;
      })}
    </div>
  );
}

export default Table;
