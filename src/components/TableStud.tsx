import React from 'react';
import '../style/TableStud.css';

export interface Stringa {
  edb: string;
  eda: string;
  edg: string;
  ede: string;
}

interface TableStud {
  list: Array<Stringa>;
}

function TableStud({ list }: TableStud) {
  return (
    <div className="tableStud">
      <div className="studentLine">
        <div className="studentCell">ПІП студента</div>
        <div className="studentCell">Група</div>
        <div className="studentCell">Номер наказу</div>
        <div className="studentCell">Форма навчання</div>
        <div className="studentCell">E-Mail</div>
        <div className="studentCell">ЄДЕБО</div>
        <div className="studentCell">Дії</div>
      </div>
      {list.map(({ edb, eda, edg, ede }) => (
        <div className="studentLine" key={edg + ede}>
          <div className="studentCell">{edb}</div>
          <div className="studentCell">{eda}</div>
          <div className="studentCell">{edg}</div>
          <div className="studentCell">{ede}</div>
          <div className="studentCell">{ede}</div>
          <div className="studentCell">{ede}</div>
          <div className="studentCell">{ede}</div>
        </div>
      ))}
    </div>
  );
}

export default TableStud;
