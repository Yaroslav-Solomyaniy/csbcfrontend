import React, { useEffect, useState } from 'react';
import TitlePage from '../../../components/common/TitlePage';
import Button from '../../../components/common/Button';
import styles from './index.module.scss';
import pagesStyle from '../../pagesStyle.module.scss';
import Layout from '../../../loyout/Layout';
import { ITableHeader } from '../../../components/common/Table/TypeDisplay/Desktop/TableHeader';
import { ITableRowItem } from '../../../components/common/Table/TypeDisplay/Desktop/TableBody';
import { initialPagination, Pagination } from '../../../types';
import { VotingsAdmin } from '../../../context/PagesInAdmin/Votings';
import { IGetVotingAdminData } from '../../../hooks/PagesInAdmin/useVotings';
import VotingEditModal from './Modal/Edit';
import VotingDeleteModal from './Modal/Delete';
import VotingResultModal from './Modal/Result';
import VotingCreateModal from './Modal/Create';
import VotingFilters from './Filters';
import { DeviceContext } from '../../../context/All/DeviceType';
import { AddQueryParams, useQueryParam } from '../../../hooks/All/useQueryParams';
import { EditDeleteReviewApprove } from '../../../components/common/CollectionMiniButtons';
import PhoneFilter from '../../../components/common/PhoneFilter';
import Table from '../../../components/common/Table';
import VotingSubmitModal from './Modal/Submit';
import RevoteEditModal from './Modal/Revote';
import Preloader from '../../../components/common/Preloader/Preloader';

const dataHeader: ITableHeader[] = [
  { id: 1, label: 'Групи' },
  { id: 2, label: 'Дата початку' },
  { id: 3, label: 'Дата кінця' },
  { id: 4, label: 'Проголосували' },
  { id: 5, label: 'Статус' },
  { id: 6, label: 'Дії' },
];

const allCloseModalWindow: Record<string, number | boolean> = {
  create: false,
  filter: false,
  edit: 0,
  delete: 0,
  result: 0,
  revote: 0,
  approve: 0,
};

const VotingAdmin = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isActiveModal, setIsActiveModal] = useState(allCloseModalWindow);
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ ...initialPagination });

  const { getVoting, votingDelete, votingEdit, votingCreate, votingSubmit } = VotingsAdmin();
  const { isPhone } = DeviceContext();
  const { get, post } = useQueryParam();

  const groupId = Number(get('groupId'));
  const statusMessage = get('statusMessage') || '';
  const currentPage = Number(get('currentPage')) || 1;
  const itemsPerPage = Number(get('itemsPerPage')) || 10;

  const closeModal = () => {
    setIsActiveModal(allCloseModalWindow);
  };

  useEffect(() => {
    if (currentPage > pagination.totalPages) {
      post({ currentPage: pagination.totalPages });
    }
  }, [pagination]);

  const changeWindow = (value: number) => {
    setIsActiveModal(allCloseModalWindow);
    setIsActiveModal({ revote: value });
  };

  useEffect(() => {
    getVoting?.votingGet(
      AddQueryParams({ groups: groupId, status: statusMessage.toString(), page: currentPage, limit: itemsPerPage }),
    );
  }, [votingCreate?.data, votingEdit?.data, votingDelete?.data, votingSubmit?.data,
    groupId, statusMessage, currentPage, itemsPerPage]);

  useEffect(() => {
    if (getVoting?.data) {
      setPagination(getVoting.data.meta);
      setDataRow(getVoting?.data?.items.map((item: IGetVotingAdminData) => ({
        list: [
          { id: 1, label: item.groups ? item.groups.map((group) => group.name).join(', ') : 'Групи відсутні' },
          { id: 2, label: new Date(item.startDate).toLocaleString() },
          { id: 3, label: new Date(item.endDate).toLocaleString() },
          { id: 4, label: `${item.tookPart} / ${item.allStudents}` },
          { id: 5,
            label:
  <div className={styles.circleAndStatus}>
    <div
      className={styles.circleStatus}
      style={{
        opacity: 0.6,
        background: item.status === 'Потребує перегляду'
          ? 'red' : item.status === 'Нове'
            ? 'rebeccapurple' : item.status === 'У прогресі'
              ? 'orange' : item.status === 'Переголосування у прогресі' ? '#adad00' : 'green' }}
    />
    <div className={styles.statusText}>
      {item.status}
    </div>
  </div> },
          { id: 6,
            label: <EditDeleteReviewApprove
              isActiveModal={isActiveModal}
              setIsActiveModal={setIsActiveModal}
              itemId={item.id}
              status={item.status}
            />,
          },
        ],
        key: item.id,
      })));
      setIsLoading(false);
    }
  }, [getVoting?.data]);

  return (
    <Layout>
      <TitlePage
        title="Голосування"
        {...isPhone && ({ setIsActiveModal })}
        {...isPhone && ({ isActiveModal: !!isActiveModal.filter })}
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
      {isLoading ? <Preloader /> : (
        <>
          <Table
            filter={(<VotingFilters groupId={groupId} statusMessage={statusMessage} />)}
            dataHeader={dataHeader}
            dataRow={dataRow}
            gridColumns={styles.columns}
            totalItems={pagination.totalItems}
          />
          <PhoneFilter
            modalTitle="Фільтрація голосувань"
            isActive={!!isActiveModal.filter}
            closeModal={closeModal}
          >
            <VotingFilters groupId={groupId} statusMessage={statusMessage} />
          </PhoneFilter>
          <VotingCreateModal
            modalActive={!!isActiveModal.create}
            closeModal={closeModal}
          />
          <VotingEditModal
            modalActive={!!isActiveModal.edit}
            id={isActiveModal.edit as number}
            closeModal={closeModal}
          />
          <VotingDeleteModal
            modalActive={!!isActiveModal.delete}
            Id={isActiveModal.delete as number}
            closeModal={closeModal}
          />
          <VotingResultModal
            modalActive={!!isActiveModal.result}
            votingId={isActiveModal.result as number}
            closeModal={closeModal}
          />
          <RevoteEditModal
            modalActive={!!isActiveModal.revote}
            id={isActiveModal.revote as number}
            closeModal={closeModal}
          />
          <VotingSubmitModal
            modalActive={!!isActiveModal.approve}
            closeModal={closeModal}
            votingId={isActiveModal.approve as number}
            changeWindow={changeWindow}
          />
        </>
      )}
    </Layout>
  );
};

export default VotingAdmin;
