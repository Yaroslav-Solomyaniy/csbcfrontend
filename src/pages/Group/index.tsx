import React, { useEffect, useState } from 'react';
import TitlePage from '../../components/TitlePage';
import Button from '../../components/common/Button/index';
import styles from './index.module.scss';
import Layout from '../../loyout/Layout';
import { ITableHeader } from '../../components/common/table/TableHeader';
import { ITableRow } from '../../components/common/table/TableBody';
import Table from '../../components/common/table';
import { GroupCreateModal } from './ModalCreate';
import { IGroupData, useGroupsGet } from '../../hooks/useGroupsGet';
import ColumnAction from './ColumnAction';
import GroupEditModal from './ModalEdit';
import GroupDeleteModal from './ModalDelete';

const groups = [
  { value: '1P-20', label: '1П-20' },
  { value: '2P-20', label: '2П-20' },
];

const curators = [
  { value: 'Yaroslav-Solomianiy', label: "Ярослав Солом'яний" },
  { value: 'Vadim-Sirenko', label: 'Вадим Сіренко' },
];

const dataHeader: ITableHeader[] = [
  { id: 1, label: 'Номер Групи' },
  { id: 2, label: 'Куратор' },
  { id: 3, label: 'Номер Наказу' },
  { id: 4, label: 'К-ть студентів' },
  { id: 5, label: 'дії' },
];

export interface IIsActiveModalState {
  create: boolean;
  edit: number;
  delete: number;
}

const allCloseModalWindow: IIsActiveModalState = {
  create: false,
  edit: 0,
  delete: 0,
};

const Group = (): JSX.Element => {
  const { getGroups, data } = useGroupsGet();
  const [dataRow, setDataRow] = useState<ITableRow[]>([]);
  const [isActiveModal, setIsActiveModal] = useState(allCloseModalWindow);

  const closeModal = () => {
    setIsActiveModal(allCloseModalWindow);
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
          actions: <ColumnAction groupId={item.id} isActive={isActiveModal} setIsActive={setIsActiveModal} />,
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
              onClick={() => setIsActiveModal({ ...isActiveModal, create: true })}
              className={styles.create__Button}
            >
              Створити
            </Button>
          )}
        />

        <Table
          filter={[
            { key: 'curatorId', value: curators, placeholder: 'Куратор' },
            { key: 'name', value: groups, placeholder: 'Група' },
          ]}
          dataHeader={dataHeader}
          dataRow={dataRow}
          gridColumns={styles.columns}

        />
        <GroupCreateModal modalActive={isActiveModal.create} closeModal={closeModal} />
        <GroupEditModal modalActive={!!isActiveModal.edit} groupId={isActiveModal.edit} closeModal={closeModal} />
        <GroupDeleteModal modalActive={!!isActiveModal.delete} closeModal={closeModal} />
      </div>
    </Layout>
  );
};

Group.defaultProps = {
  filter: '',
};

export default Group;
