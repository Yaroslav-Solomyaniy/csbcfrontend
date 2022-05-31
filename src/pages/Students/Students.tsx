import React from 'react';
import TitlePage from '../../components/TitlePage';
import TableStud from '../../components/TableStud';

interface Stringa {
  edb: string;
  eda: string;
  edg: string;
  ede: string;
}

function Students() {
  // const list: Array<Stringa> = [
  //   { edb: 'wevwdgbrsef', eda: 'wevsrgd wef', edg: 'wevdbdrwef', ede: 'wevsrvsrwef' },
  //   { edb: 'wevwdgbrsef', eda: 'wevsrgd wef', edg: 'wevdbdrwef', ede: 'wevsrvsrwef' },
  //   { edb: 'wevwdgbrsef', eda: 'wevsrgd wef', edg: 'wevdbdrwef', ede: 'wevsrvsrwef' },
  // ];

  return (
    <div>
      <TitlePage title="Студенти" />
      <TableStud />
    </div>
  );
}

export default Students;
