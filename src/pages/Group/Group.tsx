import { useState } from 'react';
import TitlePage from '../../components/TitlePage';
import Selectoptions from '../../UI/Select/Selectoptions';
import Table from '../../UI/Table/Table';
import ModalWindow from '../../UI/ModalWindow/ModalWindow';
import Button from '../../UI/Button/Button';
import './Group.css';

const options = [
  { value: '1P20', label: '1П-20' },
  { value: '2P20', label: '2П-20' },
];
const name = [
  { value: 'YaroslavSolomianiy', label: "Ярослав Солом'яний" },
  { value: 'VadimSirenko', label: 'Вадим Сіренко' },
];

const number = [
  { value: '2F9345N2', label: '2F9345N2' },
  { value: 'L23524Z7', label: 'L23524Z7' },
];

interface TableGroupRow {
  groupNumber: string;
  curator: string;
  numberNakazy: string;
  studentCounter: number;
  actions: string;
}
function createGroup() {
  console.log('Create Group');
}

const Group = ():JSX.Element => {
  const [modalActive, setModalActive] = useState(false);

  return (
    <div className="group">
      <div className="titleBlock">
        <TitlePage title="Групи" />
        <div className="buttonBlock">
          <Button buttonText="Створити" onClick={() => setModalActive(true)} />
        </div>
      </div>

      <div className="filter__block">
        <Selectoptions select={name} placeholder="Куратор" />
        <Selectoptions select={options} placeholder="Група" />
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
      <ModalWindow modalTitle="Створення групи" active={modalActive} setActive={setModalActive}>
        <div className="modal__body">
          <div className="modal__select">
            <div className="modal__Select_Title">Назва групи</div>
            <div className="modal__Select_input">
              <Selectoptions select={options} placeholder="Група" />
            </div>
          </div>

          <div className="modal__select">
            <div className="modal__Select_Title">Номер наказу</div>
            <div className="modal__Select_input">
              <Selectoptions select={number} placeholder="Номер наказу" />
            </div>
          </div>

          <div className="modal__select">
            <div className="modal__Select_Title">Куратор</div>
            <div className="modal__Select_input">
              <Selectoptions select={name} placeholder="Куратор" />
            </div>
          </div>
        </div>
        <div className="modal__exit">
          <Button buttonText="Відміна" onClick={() => { setModalActive(false); }} />
          <Button buttonText="Створити" onClick={createGroup} />
        </div>
      </ModalWindow>
    </div>
  );
};

export default Group;
