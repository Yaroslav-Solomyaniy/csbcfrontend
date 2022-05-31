import React from 'react';

interface Stringa {
  edb: string;
  eda: string;
  edg: string;
  ede: string;
}

function TableStud(ggg: Array<Stringa>) {
  return (
    <div>
      {ggg.map(({ edb, eda, edg, ede }) => (
        <>
          <div>{edb}</div>
          <div>{eda}</div>
          <div>{edg}</div>
          <div>{ede}</div>
        </>
      ))}
    </div>
  );
}

export default TableStud;
