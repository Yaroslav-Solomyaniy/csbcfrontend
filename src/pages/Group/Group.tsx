import React, { useState } from 'react';
import Select from 'react-select';
import TitlePage from '../../components/TitlePage/TitlePage';
import Selectoptions from '../../UI/Select/Selectoptions';
import Table from '../../UI/Table/Table';
import ModalWindow from '../../UI/ModalWindow/ModalWindow';
import Button from '../../UI/Button/Button';
import styles from './group.module.scss';

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

function createGroup() {
  alert('Create Group');
}

interface Igroup{
  filter?:JSX.Element;
}

const Group = ({ filter }:Igroup):JSX.Element => {
  const [modalActive, setModalActive] = useState(false);

  return (
    <div className={styles.group}>
      <TitlePage title="Групи" action={<Button buttonText="Створити" onClick={() => setModalActive(true)} />} />
      <div className={styles.filters}>
        <Selectoptions select={options} placeholder="Група" />
        <Selectoptions select={name} placeholder="Куратор" />
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
        <form className={styles.form}>
          <div className={styles.form__input}>
            <label className={styles.input__label}>Назва групи</label>
            <Select
              className={styles.input__select}
              options={options}
              placeholder="Назва групи"
              isClearable
            />
          </div>
          <div className={styles.form__input}>
            <label className={styles.input__label}>Номер наказу</label>
            <Select
              className={styles.input__select}
              options={number}
              placeholder="Номер наказу"
              isClearable
            />
          </div>
          <div className={styles.form__input}>
            <label className={styles.input__label}>Куратор</label>
            <Select
              className={styles.input__select}
              options={name}
              placeholder="Куратор"
              isClearable
            />
          </div>
        </form>
        <div className={styles.modal__buttons}>
          <button
            type="button"
            className={styles.modal_revert}
            onClick={() => {
              setModalActive(false);
            }}
          >
            Відміна
          </button>
          <button
            type="button"
            className={styles.modal_submit}
            onClick={createGroup}
          >
            Створити
          </button>
        </div>
      </ModalWindow>
    </div>
  );
};

Group.defaultProps = {
  filter: '',
};

export default Group;
