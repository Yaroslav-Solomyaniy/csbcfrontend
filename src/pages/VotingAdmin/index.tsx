import React, { useEffect, useState } from 'react';
import TitlePage from '../../components/TitlePage';
import Button from '../../components/common/Button/index';
import styles from './index.module.scss';
import pagesStyle from '../pagesStyle.module.scss';
import Layout from '../../loyout/Layout';
import { ITableHeader } from '../../components/common/table/TableHeader';
import Table from '../../components/common/table';
import { ITableRowItem } from '../../components/common/table/TableBody';
import { initialPagination, Pagination } from '../../types';

import { useVotingAdminContext } from '../../context/voting';
import { IGetVotingAdminData, IGetVotingAdminParams } from '../../hooks/useVotingAdmin';
import { Delete, Edit, Review } from '../../components/common/Icon';

import VotingEditModal from './Edit';
import VotingDeleteModal from './Delete';
import VotingResultModal from './Result';
import VotingCreateModal from './Create';

import SelectStatusVoting from '../../components/common/Select/SelectStatusVoting';
import SelectGroupById from '../../components/common/Select/SelectGroupById';

const dataHeader: ITableHeader[] = [
  { id: 1, label: 'Групи' },
  { id: 2, label: 'Дата початку' },
  { id: 3, label: 'Дата кінця' },
  { id: 4, label: 'Проголосували' },
  { id: 5, label: 'Статус' },
  { id: 6, label: 'Дії' },
];

export interface IIsActiveModalState {
  create: boolean;
  edit: number;
  delete: number;
  result: number;
  revote: number;
}

const allCloseModalWindow: IIsActiveModalState = {
  create: false,
  edit: 0,
  delete: 0,
  result: 0,
  revote: 0,
};

interface Filter {
  group: string;
  status: string;
}

interface Params {
  filter: Filter;
  pagination: Pagination;
}

const VotingAdmin = (): JSX.Element => {
  const [params, setParams] = useState<Params>({
    filter: { group: '', status: '' },
    pagination: initialPagination,
  });
  const { getVoting, votingDelete, votingEdit, votingCreate } = useVotingAdminContext();
  const [isActiveModal, setIsActiveModal] = useState(allCloseModalWindow);
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);

  const closeModal = () => {
    setIsActiveModal(allCloseModalWindow);
  };

  const changeWindow = (value: number) => {
    setIsActiveModal(allCloseModalWindow);
    setIsActiveModal({ ...isActiveModal, revote: value });
  };

  useEffect(() => {
    const query: IGetVotingAdminParams = {};

    if (params.filter.group) query.groups = +params.filter.group;
    if (params.filter.status) query.status = params.filter.status;
    if (params.pagination.currentPage) query.page = params.pagination.currentPage;
    if (params.pagination.itemsPerPage) query.limit = params.pagination.itemsPerPage;

    getVoting?.votingGet(query);
  }, [
    votingCreate?.data,
    votingEdit?.data,
    votingDelete?.data,
    params.filter.group,
    params.filter.status,
    params.pagination.currentPage,
    params.pagination.itemsPerPage,
  ]);

  useEffect(() => {
    if (getVoting?.data) {
      setParams({ ...params, pagination: getVoting.data.meta });
      setDataRow(getVoting?.data?.items.map((item: IGetVotingAdminData) => ({
        list: [
          { id: 1, label: item.groups.map((group) => group.name).join(', ') },
          { id: 2, label: new Date(item.startDate).toLocaleString() },
          { id: 3, label: new Date(item.endDate).toLocaleString() },
          { id: 4, label: `${item.tookPart} / ${item.allStudents}` },
          { id: 5, label: item.status },
          {
            id: 6,
            label: (
              <div className={pagesStyle.actions}>
                <Button
                  onClick={() => setIsActiveModal({ ...isActiveModal, edit: item.id })}
                  disabled={item.status === 'Закінчене'}
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
                <Button
                  onClick={() => setIsActiveModal({ ...isActiveModal, result: item.id })}
                  isImg
                  disabled={item.status === 'Нове'}
                >
                  <Review />
                </Button>
              </div>
            ),
          },
        ],
        key: item.id,
      })));
    }
  }, [getVoting?.data]);

  return (
    <Layout>
      <div>
        <TitlePage
          title="Голосування"
          action={(
            <Button
              nameClass="primary"
              size="large"
              className={pagesStyle.buttonsCreate}
              onClick={() => setIsActiveModal({ ...isActiveModal, create: true })}
            >
              Створити
            </Button>
          )}
        />

        <Table
          filter={(
            <>
              <SelectGroupById
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
              <SelectStatusVoting
                type="filter"
                placeholder="Статус"
                onChange={(value) => setParams({
                  ...params,
                  filter: { ...params.filter, status: value },
                  pagination: initialPagination,
                })}
                value={params.filter.status}
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
        />
        <VotingCreateModal
          modalActive={isActiveModal.create}
          closeModal={closeModal}
        />
        <VotingEditModal
          modalActive={!!isActiveModal.edit}
          id={isActiveModal.edit}
          closeModal={closeModal}
          titleModalWindow="Редагування голосування"
        />
        <VotingDeleteModal
          modalActive={!!isActiveModal.delete}
          Id={isActiveModal.delete}
          closeModal={closeModal}
        />
        <VotingResultModal
          modalActive={!!isActiveModal.result}
          votingId={isActiveModal.result}
          closeModal={closeModal}
          changeWindow={changeWindow}
        />
        <VotingEditModal
          modalActive={!!isActiveModal.revote}
          id={isActiveModal.result}
          closeModal={closeModal}
          titleModalWindow="Редагування переголосування"
          isRevote
        />
      </div>
    </Layout>
  );
};

VotingAdmin.defaultProps = {
  filter: '',
};

export default VotingAdmin;
