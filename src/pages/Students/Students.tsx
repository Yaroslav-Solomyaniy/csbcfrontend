import React from 'react';
import TitlePage from '../../components/TitlePage';
import TableStud, { Stringa } from '../../components/TableStud';
import '../../style/TableStud.css';

function Students() {
  const list: Array<Stringa> = [
    { edb: 'wevwdgbrsef', eda: '2П-18', edg: 'wevdbdrwef', ede: 'wevsrvsrwef' },
    { edb: 'wevwdgbrsef', eda: '2П-18', edg: 'wevdbdrwef', ede: 'wevsrvsrwef' },
    { edb: 'wevwdgbrsef', eda: '2П-18', edg: 'wevdbdrwef', ede: 'wevsrvsrwef' },
  ];

  return (
    <div>
      <TitlePage title="Студенти" />
      <TableStud list={list} />
    </div>
  );
}

export default Students;
