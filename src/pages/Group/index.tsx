import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import TitlePage from '../../components/TitlePage';
import Button from '../../components/common/Button/index';
import styles from './index.module.scss';
import pagesStyle from '../pagesStyle.module.scss';
import Layout from '../../loyout/Layout';
import { ITableHeader } from '../../components/common/table/TableHeader';
import Table from '../../components/common/table';
import { IGetGroupParams, IGroupData } from '../../hooks/useGroups';
import { ITableRowItem } from '../../components/common/table/TableBody';
import { useGroupContext } from '../../context/groups';
import { initialPagination, Pagination } from '../../types';
import GroupCreate from './GroupCreate';
import GroupDelete from './GroupDelete';
import GroupEdit from './GroupEdit';
import SelectGroupByName from '../../components/common/Select/SelectGroupByName';
import SelectCurator from '../../components/common/Select/SelectCurator';
import { Delete, Edit } from '../../components/common/Icon';

const dataHeader: ITableHeader[] = [
  { id: 1, label: 'Номер групи' },
  { id: 2, label: 'Куратор' },
  { id: 3, label: 'Номер наказу' },
  { id: 4, label: 'К-ть студентів' },
  { id: 5, label: 'Дії' },
];

interface IIsActiveModalState {
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
  const [searchParams, setSearchParams] = useSearchParams();
  const closeModal = () => {
    setIsActiveModal(allCloseModalWindow);
  };

  useEffect(() => {
    getGroups?.getGroups();
  }, [groupCreate?.data, groupEdit?.data, groupDelete?.data]);

  const curator = searchParams.get('curator') || '';

  useEffect(() => {
    const query: IGetGroupParams = {};

    if (params.filter.curator) {
      query.curatorId = +params.filter.curator;
      searchParams.set('curator', params.filter.curator);
    }
    if (params.filter.group) {
      query.name = params.filter.group;
      searchParams.set('group', params.filter.group);
    }
    if (params.pagination.currentPage) query.page = params.pagination.currentPage;
    if (params.pagination.itemsPerPage) query.limit = params.pagination.itemsPerPage;

    getGroups?.getGroups(query);
    setSearchParams(searchParams);
  }, [params.filter.group, params.filter.curator, params.pagination.currentPage, params.pagination.itemsPerPage]);

  useEffect(() => {
    if (getGroups?.data) {
      setDataRow(getGroups?.data?.items.map((item: IGroupData) => ({
        list: [
          { id: 1, label: item.name },
          { id: 2, label: `${item.curator.lastName} ${item.curator.firstName} ${item.curator.patronymic}` },
          { id: 3, label: item.orderNumber },
          { id: 4, label: `${item.students}` },
          {
            id: 5,
            label: (
              <div className={pagesStyle.actions}>
                <Button
                  onClick={() => setIsActiveModal({ ...isActiveModal, edit: item.id })}
                  isImg
                >
                  <Edit />
                </Button>
                <Button
                  onClick={() => setIsActiveModal({ ...isActiveModal, delete: item.id })}
                  isImg
                >
                  <Delete />
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
              className={pagesStyle.buttonsCreate}
              size="large"
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
                value={curator}
                isClearable
                isSearchable
                isFilter
              />
              <SelectGroupByName
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
                isFilter
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
        <GroupEdit modalActive={!!isActiveModal.edit} studentId={isActiveModal.edit} closeModal={closeModal} />
        <GroupDelete modalActive={!!isActiveModal.delete} Id={isActiveModal.delete} closeModal={closeModal} />
      </div>
    </Layout>
  );
};

Group.defaultProps = {
  filter: '',
};

export default Group;
