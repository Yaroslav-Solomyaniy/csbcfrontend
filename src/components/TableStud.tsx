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
      <div className="studentLine borderRadTop">
        <div className="studentCell w187p">ПІП студента</div>
        <div className="studentCell w95p">Група</div>
        <div className="studentCell  w187p">Номер наказу</div>
        <div className="studentCell  w187p">Форма навчання</div>
        <div className="studentCell  w187p">E-Mail</div>
        <div className="studentCell  w187p">ЄДЕБО</div>
        <div className="studentCell doingsStud">Дії</div>
      </div>
      {list.map(({ edb, eda, edg, ede }) => (
        <div className="studentLine" key={edg + ede}>
          <div className="studentCell w187p">{edb}</div>
          <div className="studentCell w95p">{eda}</div>
          <div className="studentCell w187p">{edg}</div>
          <div className="studentCell w187p">{ede}</div>
          <div className="studentCell w187p">{ede}</div>
          <div className="studentCell w187p">{ede}</div>
          <div className="studentCell doingsStud">{ede}</div>
        </div>
      ))}
    </div>
  );
}

export default TableStud;
