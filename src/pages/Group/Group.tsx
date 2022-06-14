import React, { useState } from 'react';
import Select from 'react-select';
import TitlePage from '../../components/TitlePage/TitlePage';
import ModalWindow from '../../UI/ModalWindow/ModalWindow';
import Button from '../../UI/Button/Button';
import styles from './group.module.scss';
import Layout from '../../loyout/Layout';
import Table, { ITableHeader, ITableRow } from '../../UI/Table/Table';

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

const dataHeader: ITableHeader[] = [
  { id: 1, label: 'Номер Групи' },
  { id: 2, label: 'Куратор' },
  { id: 3, label: 'Номер Наказу' },
  { id: 4, label: 'К-ть студентів' },
  { id: 5, label: 'дії' },
];
const dataRow: ITableRow[] = [
  {
    id: 1,
    name: '2П-18',
    curator_id: 'Фай Вікторія Степанівна',
    order_number: '2F239J1',
    studentValue: 35,
    actions: 'Hello | actions',
  },
  {
    id: 2,
    name: '2П-18',
    curator_id: 'Фай Вікторія Степанівна',
    order_number: '2F239J1',
    studentValue: 35,
    actions: 'Hello | actions',
  },
  {
    id: 3,
    name: '2П-18',
    curator_id: 'Фай Вікторія Степанівна',
    order_number: '2F239J1',
    studentValue: 35,
    actions: 'Hello | actions',
  },
  {
    id: 4,
    name: '2П-18',
    curator_id: 'Фай Вікторія Степанівна',
    order_number: '2F239J1',
    studentValue: 35,
    actions: 'Hello | actions',
  },
  {
    id: 5,
    name: '2П-18',
    curator_id: 'Фай Вікторія Степанівна',
    order_number: '2F239J1',
    studentValue: 35,
    actions: 'Hello | actions',
  },
  {
    id: 6,
    name: '2П-18',
    curator_id: 'Фай Вікторія Степанівна',
    order_number: '2F239J1',
    studentValue: 35,
    actions: 'Hello | actions',
  },
];

const Group = (): JSX.Element => {
  const [modalActive, setModalActive] = useState(false);

  return (
    <Layout>
      <div className={styles.group}>
        <TitlePage title="Групи" action={<Button buttonText="Створити" onClick={() => setModalActive(true)} />} />
        <Table
          dataHeader={dataHeader}
          dataRow={dataRow}
          gridColumns={styles.columns}
          filters={[
            { key: 'curatorId', value: name, placeholder: 'Куратор' },
            { key: 'name', value: options, placeholder: 'Група' },
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
    </Layout>
  );
};

Group.defaultProps = {
  filter: '',
};

export default Group;
