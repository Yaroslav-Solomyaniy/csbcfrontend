import React, { useEffect, useState } from 'react';
import TitlePage from '../../components/TitlePage';
import Button from '../../components/common/Button/index';
import styles from './index.module.scss';
import Layout from '../../loyout/Layout';
import { ITableHeader } from '../../components/common/table/TableHeader';
import Table from '../../components/common/table';
import { IGetGroupParams, IGroupData } from '../../hooks/useGroups';
import edit from '../../images/table/edit.svg';
import del from '../../images/table/delete.svg';
import { ITableRowItem } from '../../components/common/table/TableBody';
import { useGroupContext } from '../../context/group';
import { initialPagination, Pagination } from '../../types';
import GroupCreate from './GroupCreate';
import GroupDelete from './GroupDelete';
import GroupEdit from './GroupEdit';
import SelectGroup from '../../components/common/Select/SelectGroup';
import SelectCurator from '../../components/common/Select/SelectCurator';

const dataHeader: ITableHeader[] = [
  { id: 1, label: 'Номер групи' },
  { id: 2, label: 'Куратор' },
  { id: 3, label: 'Номер наказу' },
  { id: 4, label: 'К-ть студентів' },
  { id: 5, label: 'Дії' },
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

interface Params {
  filter: Filter;
  pagination: Pagination;
}

const Group = (): JSX.Element => {
  const { getGroups, groupCreate, groupEdit, groupDelete } = useGroupContext();
  const [params, setParams] = useState<Params>({
    filter: { curator: '', group: '' },
    pagination: initialPagination,
  });
  const [isActiveModal, setIsActiveModal] = useState(allCloseModalWindow);
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);

  const closeModal = () => {
    setIsActiveModal(allCloseModalWindow);
  };

  useEffect(() => {
    getGroups?.getGroups();
  }, [groupCreate?.data, groupEdit?.data, groupDelete?.data]);

  useEffect(() => {
    const query: IGetGroupParams = {};

    if (params.filter.curator) query.curatorId = +params.filter.curator;
    if (params.filter.group) query.name = params.filter.group;
    if (params.pagination.currentPage) query.page = params.pagination.currentPage;
    if (params.pagination.itemsPerPage) query.limit = params.pagination.itemsPerPage;

    getGroups?.getGroups(query);
  }, [params.filter.group, params.filter.curator, params.pagination.currentPage, params.pagination.itemsPerPage]);

  useEffect(() => {
    if (getGroups?.data) {
      setParams({ ...params, pagination: getGroups.data.meta });
      setDataRow(getGroups?.data?.items.map((item: IGroupData) => ({
        list: [
          { id: 1, label: item.name },
          { id: 2, label: `${item.curator.lastName} ${item.curator.firstName} ${item.curator.patronymic}` },
          { id: 3, label: item.orderNumber },
          { id: 4, label: `${item.students}` },
          {
            id: 5,
            label: (
              <div className={styles.actions}>
                <Button
                  onClick={() => setIsActiveModal({ ...isActiveModal, edit: item.id })}
                  isImg
                >
                  <img src={edit} alt="edit" />
                </Button>
                <Button
                  onClick={() => setIsActiveModal({ ...isActiveModal, delete: item.id })}
                  isImg
                >
                  <img src={del} alt="delete" />
                </Button>
              </div>
            ),
          },
        ],
        key: item.id,
      })));
    }
  }, [getGroups?.data]);

  return (
    <Layout>
      <div className={styles.group}>
        <TitlePage
          title="Групи"
          action={(
            <Button
              nameClass="primary"
              size="large"
              className={styles.actions}
              onClick={() => setIsActiveModal({ ...isActiveModal, create: true })}
            >
              Створити
            </Button>
          )}
        />

        <Table
          filter={(
            <>
              <SelectCurator
                type="filter"
                placeholder="Куратор"
                onChange={(value) => setParams({
                  ...params,
                  filter: { ...params.filter, curator: value },
                  pagination: initialPagination,
                })}
                value={params.filter.curator}
                isClearable
                isSearchable
              />
              <SelectGroup
                type="filter"
                placeholder="Група"
                onChange={(value) => setParams({
                  ...params,
                  filter: { ...params.filter, group: value },
                  pagination: initialPagination,
                })}
                value={params.filter.group}
                isClearable
                isSearchable
              />
            </>
          )}
          dataHeader={dataHeader}
          dataRow={dataRow}
          gridColumns={styles.columns}
          pagination={params.pagination}
          onPaginationChange={(newPagination) => setParams({ ...params, pagination: newPagination })}
        />
        <GroupCreate modalActive={isActiveModal.create} closeModal={closeModal} />
        <GroupEdit modalActive={!!isActiveModal.edit} Id={isActiveModal.edit} closeModal={closeModal} />
        <GroupDelete modalActive={!!isActiveModal.delete} Id={isActiveModal.delete} closeModal={closeModal} />
      </div>
    </Layout>
  );
};

Group.defaultProps = {
  filter: '',
};

export default Group;
