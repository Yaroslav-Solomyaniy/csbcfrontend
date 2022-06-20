import React from 'react';
import styles from '../Group/index.module.scss';
import stylesStud from './index.module.scss';
import Layout from '../../loyout/Layout';
import TitlePage from '../../components/TitlePage';
import Button from '../../components/common/Button';
import Table from '../../components/common/table';
import { ITableHeader } from '../../components/common/table/TableHeader';

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

const Students = (): JSX.Element => (
  <Layout>
    <div className={styles.group}>
      <TitlePage
        title="Студенти"
        action={(
          <Button
            onClick={() => undefined}
            className={styles.button}
          >
            Створити
          </Button>
        )}
      />
      <Table
        filter={[
          { key: 'groupId', value: groups, placeholder: 'Група' },
          { key: 'name', value: name, placeholder: 'ПІП' },
          { key: 'formTraining', value: formTraining, placeholder: 'Форма навчання' },
        ]}
        dataHeader={dataHeader}
        dataRow={[]}
        gridColumns={stylesStud.columns}

      />
    </div>
  </Layout>
);

export default Students;
