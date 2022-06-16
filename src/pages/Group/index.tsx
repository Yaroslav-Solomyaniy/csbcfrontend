import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import TitlePage from '../../components/TitlePage';
import ModalWindow from '../../components/common/ModalWindow';
import Button from '../../components/common/Button';
import styles from './index.module.scss';
import Layout from '../../loyout/Layout';
import { ITableHeader } from '../../components/common/table/TableHeader';
import { ITableRow } from '../../components/common/table/TableBody';
import Table from '../../components/common/table';
import useGroups, { IGroupData } from '../../hooks/useGroups';

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
// const dataRow: ITableRow[] = [
//   {
//     id: 1,
//     name: '2П-18',
//     curator_id: 'Фай Вікторія Степанівна',
//     order_number: '2F239J1',
//     studentValue: 35,
//     actions: 'Hello | actions',
//   },
//   {
//     id: 2,
//     name: '2П-18',
//     curator_id: 'Фай Вікторія Степанівна',
//     order_number: '2F239J1',
//     studentValue: 35,
//     actions: 'Hello | actions',
//   },
//   {
//     id: 3,
//     name: '2П-18',
//     curator_id: 'Фай Вікторія Степанівна',
//     order_number: '2F239J1',
//     studentValue: 35,
//     actions: 'Hello | actions',
//   },
//   {
//     id: 4,
//     name: '2П-18',
//     curator_id: 'Фай Вікторія Степанівна',
//     order_number: '2F239J1',
//     studentValue: 35,
//     actions: 'Hello | actions',
//   },
//   {
//     id: 5,
//     name: '2П-18',
//     curator_id: 'Фай Вікторія Степанівна',
//     order_number: '2F239J1',
//     studentValue: 35,
//     actions: 'Hello | actions',
//   },
//   {
//     id: 6,
//     name: '2П-18',
//     curator_id: 'Фай Вікторія Степанівна',
//     order_number: '2F239J1',
//     studentValue: 35,
//     actions: 'Hello | actions',
//   },
//   {
//     id: 4,
//     name: '2П-18',
//     curator_id: 'Фай Вікторія Степанівна',
//     order_number: '2F239J1',
//     studentValue: 35,
//     actions: 'Hello | actions',
//   },
//   {
//     id: 5,
//     name: '2П-18',
//     curator_id: 'Фай Вікторія Степанівна',
//     order_number: '2F239J1',
//     studentValue: 35,
//     actions: 'Hello | actions',
//   },
//   {
//     id: 6,
//     name: '2П-18',
//     curator_id: 'Фай Вікторія Степанівна',
//     order_number: '2F239J1',
//     studentValue: 35,
//     actions: 'Hello | actions',
//   },
//   {
//     id: 4,
//     name: '2П-18',
//     curator_id: 'Фай Вікторія Степанівна',
//     order_number: '2F239J1',
//     studentValue: 35,
//     actions: 'Hello | actions',
//   },
//   {
//     id: 5,
//     name: '2П-18',
//     curator_id: 'Фай Вікторія Степанівна',
//     order_number: '2F239J1',
//     studentValue: 35,
//     actions: 'Hello | actions',
//   },
//   {
//     id: 6,
//     name: '2П-18',
//     curator_id: 'Фай Вікторія Степанівна',
//     order_number: '2F239J1',
//     studentValue: 35,
//     actions: 'Hello | actions',
//   },
//   {
//     id: 7,
//     name: '2П-18',
//     curator_id: 'Фай Вікторія Степанівна',
//     order_number: '2F239J1',
//     studentValue: 35,
//     actions: 'Hello | actions',
//   },
//
//   {
//     id: 10,
//     name: '2П-18',
//     curator_id: 'Фай Вікторія Степанівна',
//     order_number: '2F239J1',
//     studentValue: 35,
//     actions: 'Hello | actions',
//   },
//   {
//     id: 11,
//     name: '2П-18',
//     curator_id: 'Фай Вікторія Степанівна',
//     order_number: '2F239J1',
//     studentValue: 35,
//     actions: 'Hello | actions',
//   },
//   {
//     id: 12,
//     name: '2П-18',
//     curator_id: 'Фай Вікторія Степанівна',
//     order_number: '2F239J1',
//     studentValue: 35,
//     actions: 'Hello | actions',
//   },
// ];

const Group = (): JSX.Element => {
  const [modalActive, setModalActive] = useState(false);
  const { getGroups, data } = useGroups();
  const [dataRow, setDataRow] = useState<ITableRow[]>([]);

  useEffect(() => {
    getGroups();
  }, []);

  useEffect(() => {
    if (data) {
      setDataRow(data.items.map((item: IGroupData): ITableRow => (
        {
          id: item.id,
          name: item.name,
          curator: item.curator.lastName + item.curator.firstName,
          order_number: item.orderNumber,
          studentValue: 32,
          actions: undefined,
        }
      )));
    }
  }, [data]);

  return (
    <Layout>
      <div className={styles.group}>
        <TitlePage
          title="Групи"
          action={(
            <Button
              onClick={() => setModalActive(true)}
              className={styles.button}
            >
              Створити
            </Button>
          )}
        />
        <Table
          filter={[
            { key: 'curatorId', value: options, placeholder: 'Куратор' },
            { key: 'name', value: name, placeholder: 'Група' },
          ]}
          dataHeader={dataHeader}
          dataRow={dataRow}
          gridColumns={styles.columns}

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
