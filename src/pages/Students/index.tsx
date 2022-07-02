import React, { useState } from 'react';
import styles from '../Group/index.module.scss';
import stylesStud from './index.module.scss';
import Layout from '../../loyout/Layout';
import TitlePage from '../../components/TitlePage';
import Button from '../../components/common/Button';
import Table from '../../components/common/table';
import { ITableHeader } from '../../components/common/table/TableHeader';
import StudentsCreateModal from './modal/StudentsCreateModal';
import { useStudentsContext } from '../../context/students';

const groups = [
  { value: '1P20', label: '1П-20' },
  { value: '2P20', label: '2П-20' },
];
const name = [
  { value: 'YaroslavSolomianiy', label: "Ярослав Солом'яний" },
  { value: 'VadimSirenko', label: 'Вадим Сіренко' },
];
const formTraining = [
  { value: 'day', label: 'Денна' },
];

const dataHeader: ITableHeader[] = [
  { id: 1, label: 'ПІП студента' },
  { id: 2, label: 'Група' },
  { id: 3, label: 'Номер Наказу' },
  { id: 4, label: 'Форма навчання' },
  { id: 5, label: 'E-Mail' },
  { id: 6, label: 'ЄДЕБО' },
  { id: 7, label: 'Дії' },
];

const Students = (): JSX.Element => {
  const { getStudents } = useStudentsContext();

  const [modalActive, setModalActive] = useState(false);
  const closeModal = () => {
    setModalActive(false);
  };

  return (
    <Layout>
      <div className={styles.group}>
        <TitlePage
          title="Студенти"
          action={(
            <Button
              nameClass="primary"
              size="large"
              className={styles.actions}
              onClick={() => setModalActive(true)}
            >
              Створити
            </Button>
          )}
        />
        <Table
          // [
          //  { key: 'groupId', value: groups, placeholder: 'Група' },
          //  { key: 'name', value: name, placeholder: 'ПІП' },
          //  { key: 'formTraining', value: formTraining, placeholder: 'Форма навчання' },
          // ]
          dataHeader={dataHeader}
          dataRow={getStudents?.dataStudents?.items.length ? getStudents?.dataStudents?.items.map((item, id) => ({
            list: [
              { id, label: item.user.firstName + item.user.lastName },
              { id, label: item.group.name },
              { id, label: item.orderNumber },
              { id, label: `${item.isFullTime}` },
              { id, label: item.user.email },
              { id, label: item.user.firstName },
              { id, label: ' ' },
            ],
            key: item.id,
          })) : []}
          gridColumns={stylesStud.columns}

        />
        <StudentsCreateModal closeModal={closeModal} modalActive={modalActive} />
      </div>
    </Layout>
  );
};

export default Students;
