import React from 'react';
import stylesCur from './index.module.scss';
import Layout from '../../loyout/Layout';
import { ITableHeader } from '../../components/common/table/TableHeader';
import styles from '../Group/index.module.scss';
import TitlePage from '../../components/TitlePage';
import Button from '../../components/common/Button';
import Table from '../../components/common/table';

const options = [
  { value: '1P20', label: '1П-20' },
  { value: '2P20', label: '2П-20' },
];
const name = [
  { value: 'YaroslavSolomianiy', label: "Ярослав Солом'яний" },
  { value: 'VadimSirenko', label: 'Вадим Сіренко' },
];

const dataHeader: ITableHeader[] = [
  { id: 1, label: 'ПІП' },
  { id: 2, label: 'Групи' },
  { id: 3, label: 'E-Mail' },
  { id: 4, label: 'дії' },
];

const Curators = (): JSX.Element => (
  <Layout>
    <div className={styles.group}>
      <TitlePage
        title="Куратори"
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
          { key: 'group', value: name, placeholder: 'Група' },
          { key: 'name', value: options, placeholder: 'ПІП' },
        ]}
        dataHeader={dataHeader}
        dataRow={[]}
        gridColumns={stylesCur.columns}

      />
    </div>
  </Layout>
);

export default Curators;
