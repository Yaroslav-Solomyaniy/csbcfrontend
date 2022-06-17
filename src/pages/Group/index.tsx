import React, { useEffect, useState } from 'react';
import TitlePage from '../../components/TitlePage';
import Button from '../../components/common/Button';
import styles from './index.module.scss';
import Layout from '../../loyout/Layout';
import { ITableHeader } from '../../components/common/table/TableHeader';
import { ITableRow } from '../../components/common/table/TableBody';
import Table from '../../components/common/table';
import { IGroupData, useGroupsGet } from '../../hooks/useGroups';
import { GroupCreateModal } from './ModalCreate';

const options = [
  { value: '1P20', label: '1П-20' },
  { value: '2P20', label: '2П-20' },
];
const name = [
  { value: 'YaroslavSolomianiy', label: "Ярослав Солом'яний" },
  { value: 'VadimSirenko', label: 'Вадим Сіренко' },
];

const dataHeader: ITableHeader[] = [
  { id: 1, label: 'Номер Групи' },
  { id: 2, label: 'Куратор' },
  { id: 3, label: 'Номер Наказу' },
  { id: 4, label: 'К-ть студентів' },
  { id: 5, label: 'дії' },
];

const Group = (): JSX.Element => {
  const [modalActive, setModalActive] = useState(false);
  const { getGroups, data } = useGroupsGet();
  const [dataRow, setDataRow] = useState<ITableRow[]>([]);

  const closeModal = () => {
    setModalActive(false);
  };

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
        <GroupCreateModal modalActive={modalActive} closeModal={closeModal} />
      </div>
    </Layout>
  );
};

Group.defaultProps = {
  filter: '',
};

export default Group;
