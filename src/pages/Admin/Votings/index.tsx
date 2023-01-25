import React, { useEffect, useState } from 'react';
import TitlePage from '../../../components/common/TitlePage';
import Button from '../../../components/common/Button';
import styles from './index.module.scss';
import pagesStyle from '../../pagesStyle.module.scss';
import Layout from '../../../loyout/Layout';
import { ITableHeader } from '../../../components/common/Table/TypeDisplay/Desktop/TableHeader';
import { ITableRowItem } from '../../../components/common/Table/TypeDisplay/Desktop/TableBody';
import { initialPagination, IPagination } from '../../../types';
import { VotingsAdmin } from '../../../context/Pages/admin/Votings';
import VotingEditModal from './Modal/Edit';
import VotingDeleteModal from './Modal/Delete';
import VotingResultModal from './Modal/Result';
import VotingCreateModal from './Modal/Create';
import VotingFilters from './Filters';
import { DeviceContext } from '../../../context/All/DeviceType';
import { AddQueryParams, useQueryParam } from '../../../hooks/hooks/useQueryParams';
import { EditDeleteReviewApprove } from '../../../components/common/CollectionMiniButtons';
import PhoneFilter from '../../../components/common/PhoneFilter';
import Table from '../../../components/common/Table';
import VotingSubmitModal from './Modal/Submit';
import RevoteEditModal from './Modal/Revote';
import Preloader from '../../../components/common/Preloader/Preloader';
import useCheckPage from '../../../hooks/hooks/useCheckPage';
import { IGetVotingsAdminData } from '../../../hooks/api/admin/voting/useGet';

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
  const [pagination, setPagination] = useState<IPagination>({ ...initialPagination });

  const { getVotings, deleteVoting, editVoting, createVoting, submitVoting } = VotingsAdmin();
  const { isPhone } = DeviceContext();
  const { get } = useQueryParam();

  const groupId = Number(get('groupId'));
  const statusMessage = get('statusMessage') || '';
  const currentPage = Number(get('currentPage')) || 1;
  const itemsPerPage = Number(get('itemsPerPage')) || 10;

  const closeModal = () => {
    setIsActiveModal(allCloseModalWindow);
  };

  useCheckPage({ pagination, currentPage });

  const changeWindow = (value: number) => {
    setIsActiveModal(allCloseModalWindow);
    setIsActiveModal({ revote: value });
  };

  useEffect(() => {
    getVotings?.getVotings(
      AddQueryParams({ groups: groupId, status: statusMessage.toString(), page: currentPage, limit: itemsPerPage }),
    );
  }, [createVoting?.data, editVoting?.data, deleteVoting?.data, submitVoting?.data,
    groupId, statusMessage, currentPage, itemsPerPage]);

  useEffect(() => {
    if (getVotings?.data) {
      setPagination(getVotings.data.meta);
      setDataRow(getVotings?.data?.items.map((item: IGetVotingsAdminData) => ({
        list: [
          { id: 1, label: item.groups ? item.groups.map((group) => group.name).join(', ') : 'Групи відсутні' },
          { id: 2, label: new Date(item.startDate).toLocaleString() || 'Дата відсутня' },
          { id: 3, label: new Date(item.endDate).toLocaleString() || 'Дата відсутня' },
          { id: 4, label: `${item.tookPart} / ${item.allStudents}` || 'Дані відсутні' },
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
  }, [getVotings?.data]);

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
