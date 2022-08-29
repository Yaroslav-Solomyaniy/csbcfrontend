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
import VotingResultModal from './Result';
import VotingCreateModal from './Create';
import { useVotingAdminContext, VotingAdminContext } from '../../context/voting';
import { IGetVotingAdminData, IGetVotingAdminParams } from '../../hooks/useVotingAdmin';
import { Delete, Edit, Review } from '../../components/common/Icon';
import VotingEditModal from './Edit';
import VotingDeleteModal from './Delete';

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
}

const allCloseModalWindow: IIsActiveModalState = {
  create: false,
  edit: 0,
  delete: 0,
  result: 0,
};

interface Params {
  pagination: Pagination;
}

const VotingAdmin = (): JSX.Element => {
  const [params, setParams] = useState<Params>({
    pagination: initialPagination,
  });
  const [isActiveModal, setIsActiveModal] = useState(allCloseModalWindow);
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);

  const closeModal = () => {
    setIsActiveModal(allCloseModalWindow);
  };

  useEffect(() => {
    const query: IGetVotingAdminParams = {};

    if (params.pagination.currentPage) query.page = params.pagination.currentPage;
    if (params.pagination.itemsPerPage) query.limit = params.pagination.itemsPerPage;

    getVoting?.votingGet(query);
  }, [
    votingCreate?.data,
    votingEdit?.data,
    votingDelete?.data,
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
          dataHeader={dataHeader}
          dataRow={dataRow}
          gridColumns={styles.columns}
          pagination={params.pagination}
          onPaginationChange={(newPagination) => setParams({ ...params, pagination: newPagination })}
        />
        <VotingCreateModal modalActive={isActiveModal.create} closeModal={closeModal} />
        <VotingEditModal modalActive={!!isActiveModal.edit} Id={isActiveModal.edit} closeModal={closeModal} />
        <VotingDeleteModal modalActive={!!isActiveModal.delete} Id={isActiveModal.delete} closeModal={closeModal} />
        <VotingResultModal
          modalActive={!!isActiveModal.result}
          votingId={isActiveModal.result}
          closeModal={closeModal}
        />
      </div>
    </Layout>
  );
};

VotingAdmin.defaultProps = {
  filter: '',
};

export default VotingAdmin;
