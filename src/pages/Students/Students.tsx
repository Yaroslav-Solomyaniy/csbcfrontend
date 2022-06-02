import React from 'react';
import TitlePage from '../../components/TitlePage';
import TableStud, { Stringa } from '../../components/TableStud';
import './Students.css';
import Selectoptions from '../../UI/Select/Selectoptions';

function Students() {
  const list: Array<Stringa> = [
    { edb: 'wevwdgbrsef', eda: '2П-18', edg: 'wevdbdrwef', ede: 'wevsrvsrwef' },
    { edb: 'wevwdgbrsef', eda: '2П-18', edg: 'wevdbdrwef', ede: 'wevsrvsrwef' },
    { edb: 'wevwdgbrsef', eda: '2П-18', edg: 'wevdbdrwef', ede: 'wevsrvsrwef' },
  ];
  const options = [
    { value: '1P20', label: '1П-20' },
    { value: '2P20', label: '2П-20' },
  ];
  const name = [
    { value: 'YaroslavSolomianiy', label: "Ярослав Солом'яний" },
    { value: 'VadimSirenko', label: 'Вадим Сіренко' },
  ];
  const formstudy = [
    { value: 'fulltime', label: 'Очна' },
    { value: 'parttime', label: 'Заочна' },
  ];

  return (
    <div className="students">
      <TitlePage title="Студенти" />
      <div className="filter__block">
        <Selectoptions select={options} placeholder="Групи" />
        <Selectoptions select={name} placeholder="ПІБ" />
        <Selectoptions select={formstudy} placeholder="Форма навчання" />
      </div>
      <TableStud list={list} />
    </div>
  );
}

export default Students;
