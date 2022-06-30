import React, { useEffect, useState } from 'react';
import TitlePage from '../../components/TitlePage';
import Button from '../../components/common/Button/index';
import styles from './index.module.scss';
import Layout from '../../loyout/Layout';
import { ITableHeader } from '../../components/common/table/TableHeader';
import Table from '../../components/common/table';
import { GroupCreateModal } from './ModalCreate';
import { IGetGroupParams, useGroups } from '../../hooks/useGroups';
import GroupEditModal from './ModalEdit';
import GroupDeleteModal from './ModalDelete';
import edit from '../../images/table/edit.svg';
import del from '../../images/table/delete.svg';
import SelectCurator from '../../components/common/SelectCurator';
import { ITableRowItem } from '../../components/common/table/TableBody';

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

interface Filter {
  curator: string;
  group: string;
}

const Group = (): JSX.Element => {
  const { getGroups, data } = useGroups();

  const [filter, setFilter] = useState<Filter>({ curator: '', group: '' });
  const [isActiveModal, setIsActiveModal] = useState(allCloseModalWindow);
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);

  const closeModal = () => {
    setIsActiveModal(allCloseModalWindow);
  };

  useEffect(() => {
    const query: IGetGroupParams = {};

    if (filter.curator) {
      query.curatorId = +filter.curator;
    }

    getGroups(query);
  }, [filter.curator]);

  useEffect(() => {
    if (data) {
      setDataRow(data?.items.map((item) => ({
        list: [
          { id: 1, label: item.name },
          { id: 2, label: item.curator.firstName },
          { id: 3, label: item.orderNumber },
          { id: 4, label: `${item.id}` },
          {
            id: 5,
            label: (
              <div className={styles.actions}>
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
              </div>
            ),
          },
        ],
        key: item.id,
      })));
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
          filter={(
            <SelectCurator
              placeholder="Куратор"
              onChange={(value) => setFilter({ ...filter, curator: value })}
              value={filter.curator}
            />
          )}
          dataHeader={dataHeader}
          dataRow={dataRow}
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
