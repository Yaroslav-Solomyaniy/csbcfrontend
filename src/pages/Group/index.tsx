import React, { useEffect, useState } from 'react';
import TitlePage from '../../components/TitlePage';
import Button from '../../components/common/Button/index';
import styles from './index.module.scss';
import Layout from '../../loyout/Layout';
import { ITableHeader } from '../../components/common/table/TableHeader';
import Table from '../../components/common/table';
import { GroupCreateModal } from './ModalCreate';
import { IGroupData, useGroupEdit, useGroups } from '../../hooks/useGroups';
import ColumnAction from './ColumnAction';
import GroupEditModal from './ModalEdit';
import GroupDeleteModal from './ModalDelete';
import edit from '../../images/table/edit.svg';
import del from '../../images/table/delete.svg';

interface ITableRow {
  id: number;
  name: string;
  curator: string;
  order_number: string;
  studentValue: number;
  actions: JSX.Element | undefined | string;
}

const dataHeader: ITableHeader[] = [
  { id: 1, label: 'Номер Групи' },
  { id: 2, label: 'Куратор' },
  { id: 3, label: 'Номер Наказу' },
  { id: 4, label: 'К-ть студентів' },
  { id: 5, label: 'дії' },
];
const groups = [
  { value: '1П-20', label: '1П-20' },
  { value: '2П-20', label: '2П-20' },
];

const curators = [
  { value: '5', label: '5' },
  { value: '235', label: '235' },
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
  const { getGroups, data } = useGroups();

  const [dataRow, setDataRow] = useState<ITableRow[]>([]);

  const [isActiveModal, setIsActiveModal] = useState(allCloseModalWindow);
  const { groupEdit } = useGroupEdit();

  const closeModal = () => {
    setIsActiveModal(allCloseModalWindow);
  };

  useEffect(() => {
    getGroups();
  }, []);

  // useEffect(() => {
  //   getGroups();
  // }, [groupEdit]);

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
          dataRow={data?.items.length ? data?.items.map((item, id) => ({
            list: [
              { id, label: item.name },
              { id, label: item.curator.firstName },
              { id, label: item.orderNumber },
              { id, label: `${item.id}` },
              {
                id,
                label: (<div className={styles.actions}>
                  <button
                    type="button"
                    className={styles.actions__button_edit}
                    onClick={() => {
                      setIsActiveModal({ ...isActiveModal, edit: item.id });
                    }}
                  >
                    <img src={edit} alt="edit" />
                  </button>
                  <button
                    type="button"
                    className={styles.actions__button_delete}
                    onClick={() => {
                      setIsActiveModal({ ...isActiveModal, delete: item.id });
                    }}
                  >
                    <img src={del} alt="delete" />
                  </button>
                </div>),
              },
            ],
            key: item.id,
          })) : []}
          gridColumns={styles.columns}

        />
        <GroupCreateModal modalActive={isActiveModal.create} closeModal={closeModal} />
        <GroupEditModal modalActive={!!isActiveModal.edit} groupId={isActiveModal.edit} closeModal={closeModal} />
        <GroupDeleteModal modalActive={!!isActiveModal.delete} groupId={isActiveModal.delete} closeModal={closeModal} />
      </div>
    </Layout>
  );
};

Group.defaultProps = {
  filter: '',
};

export default Group;
