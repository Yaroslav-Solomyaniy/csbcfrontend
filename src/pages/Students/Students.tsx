import React from 'react';
import TitlePage from '../../components/TitlePage';
import TableStud, { Stringa } from '../../components/TableStud';
import '../../style/TableStud.css';

function Students() {
  const list: Array<Stringa> = [
    { edb: 'wevwdgbrsef', eda: 'wevsrgd wef', edg: 'wevdbdrwef', ede: 'wevsrvsrwef' },
    { edb: 'wevwdgbrsef', eda: 'wevsrgd wef', edg: 'wevdbdrwef', ede: 'wevsrvsrwef' },
    { edb: 'wevwdgbrsef', eda: 'wevsrgd wef', edg: 'wevdbdrwef', ede: 'wevsrvsrwef' },
  ];

  return (
    <div>
      <TitlePage title="Студенти" />

      <TableStud list={list} />
      {/* <div className="tableStud"> */}
      {/*  <div className="studentLine"> */}
      {/*    <div className="studentCell">ПІП студента</div> */}
      {/*    <div className="studentCell">Група</div> */}
      {/*    <div className="studentCell">Номер наказу</div> */}
      {/*    <div className="studentCell">Форма навчання</div> */}
      {/*    <div className="studentCell">E-Mail</div> */}
      {/*    <div className="studentCell">ЄДЕБО</div> */}
      {/*    <div className="studentCell">Дії</div> */}
      {/*  </div> */}
      {/* </div> */}
      {/* {list.map(({ edb, eda, edg, ede }) => ( */}
      {/*  <div className="studentLine"> */}
      {/*    <div className="studentCell">{edb}</div> */}
      {/*    <div className="studentCell">{eda}</div> */}
      {/*    <div className="studentCell">{edg}</div> */}
      {/*    <div className="studentCell">{ede}</div> */}
      {/*    <div className="studentCell">{ede}</div> */}
      {/*    <div className="studentCell">{ede}</div> */}
      {/*    <div className="studentCell">{ede}</div> */}
      {/*  </div> */}
      {/* ))} */}
    </div>
  );
}

export default Students;
