import TitlePage from '../../components/TitlePage';
import Selectoptions from '../../UI/Select/Selectoptions';
import Table from '../../UI/Table/Table';

import './Group.css';

const options = [
  { value: '1P20', label: '1П-20' },
  { value: '2P20', label: '2П-20' },
];
const name = [
  { value: 'YaroslavSolomianiy', label: "Ярослав Солом'яний" },
  { value: 'VadimSirenko', label: 'Вадим Сіренко' },
];

interface TableGroupRow {
  groupNumber: string;
  curator: string;
  numberNakazy: string;
  studentCounter: number;
  actions: string;
}

const Group = (): JSX.Element => (
  <div className="group">
    <TitlePage title="Групи" />
    <div className="filter__block">
      <Selectoptions select={options} placeholder="Групи" />
      <Selectoptions select={name} placeholder="ПІБ" />
    </div>
    <Table
      header={[
        {
          name: 'groupNumber',
          title: 'Номер групи',
        },
        {
          name: 'curator',
          title: 'Куратор',
        },
        {
          name: 'numberNakazy',
          title: 'Номер наказу',
        },
        {
          name: 'studentCounter',
          title: 'К-сть студентів',
        },
        {
          name: 'actions',
          title: 'Дії',
        },
      ]}
      list={[
        {
          groupNumber: 'ER-34',
          curator: 'curator',
          numberNakazy: 'WER1231223',
          studentCounter: 34,
          actions: '',
        },
      ]}
    />
  </div>
);

export default Group;
