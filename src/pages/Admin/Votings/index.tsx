import React, { useEffect, useState } from 'react';
import TitlePage from '../../../components/TitlePage';
import Button from '../../../components/common/Button';
import styles from './index.module.scss';
import pagesStyle from '../../pagesStyle.module.scss';
import Layout from '../../../loyout/Layout';
import { ITableHeader } from '../../../components/common/table/TableHeader';
import { ITableRowItem } from '../../../components/common/table/TableBody';
import { initialPagination, Pagination } from '../../../types';
import { useVotingAdminContext } from '../../../context/voting';
import { IGetVotingAdminData, IGetVotingAdminParams } from '../../../hooks/useVotingAdmin';
import VotingEditModal from './Modal/Edit';
import VotingDeleteModal from './Modal/Delete';
import VotingResultModal from './Modal/Result';
import VotingCreateModal from './Modal/Create';
import VotingFilters from './Components/VotingFilters';
import { useDeviceContext } from '../../../context/TypeDevice';
import { useQueryParam } from '../../../hooks/useUrlParams';
import { EditDeleteReviewApprove } from '../../../components/common/GroupButtons';
import DesktopTable from '../../../components/common/table/DesktopTable';
import PhoneFilter from '../../../components/common/PhoneFilter';
import MobileElementListVotingAdmin from './Components/MobileElementListVotingAdmin';
import TableFilter from '../../../components/common/table/TableFilter';

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
  const [isActiveModal, setIsActiveModal] = useState(allCloseModalWindow);
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ ...initialPagination });
  const [data, setData] = useState<IGetVotingAdminData[]>();

  const { getVoting, votingDelete, votingEdit, votingCreate } = useVotingAdminContext();
  const { isPhone, isDesktop, isTablet } = useDeviceContext();
  const { get } = useQueryParam();

  const groupId = Number(get('groupId'));
  const statusMessage = get('statusMessage');
  const currentPage = Number(get('currentPage')) || 1;
  const itemsPerPage = Number(get('itemsPerPage')) || 10;

  const closeModal = () => {
    setIsActiveModal(allCloseModalWindow);
  };

  const changeWindow = (value: number) => {
    setIsActiveModal(allCloseModalWindow);
    setIsActiveModal({ ...isActiveModal, revote: value });
  };

  useEffect(() => {
    const query: IGetVotingAdminParams = {};

    if (groupId) query.groups = groupId;
    if (statusMessage) query.status = statusMessage.toString();
    if (currentPage) query.page = currentPage;
    if (itemsPerPage) query.limit = itemsPerPage;

    getVoting?.votingGet(query);
  }, [
    votingCreate?.data,
    votingEdit?.data,
    votingDelete?.data,
    groupId,
    statusMessage,
    currentPage,
    itemsPerPage,
  ]);

  useEffect(() => {
    if (getVoting?.data) {
      setPagination(getVoting.data.meta);
      setDataRow(getVoting?.data?.items.map((item: IGetVotingAdminData) => ({
        list: [
          { id: 1, label: item.groups.map((group) => group.name).join(', ') },
          { id: 2, label: new Date(item.startDate).toLocaleString() },
          { id: 3, label: new Date(item.endDate).toLocaleString() },
          { id: 4, label: `${item.tookPart} / ${item.allStudents}` },
          { id: 5, label: item.status },
          {
            id: 6,
            label: <EditDeleteReviewApprove
              isActiveModal={isActiveModal}
              setIsActiveModal={setIsActiveModal}
              itemId={item.id}
            />,
          },
        ],
        key: item.id,
      })));
      setData(getVoting.data.items);
    }
  }, [getVoting?.data]);

  return (
    <Layout>
      <div>
        {isDesktop && (
          <>
            <TitlePage
              title="Голосування"
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
            <DesktopTable
              filter={(<VotingFilters groupId={groupId} statusMessage={statusMessage} />)}
              dataHeader={dataHeader}
              dataRow={dataRow}
              className={styles.columns}
              totalItems={pagination.totalItems}
            />
          </>
        )}
        {(isTablet || isPhone) && (
          <>
            <TitlePage
              title="Голосування"
              {...isPhone && ({ setIsActiveModal })}
              {...isPhone && ({ isActiveModal: !!isActiveModal.filter })}
              action={(
                <Button
                  nameClass="primary"
                  className={pagesStyle.buttonsCreate}
                  size="large"
                  onClick={() => setIsActiveModal({ create: true })}
                >
                  Створити
                </Button>
              )}
            />
            {isTablet && (<TableFilter filter={<VotingFilters groupId={groupId} statusMessage={statusMessage} />} />)}
            <MobileElementListVotingAdmin
              data={data}
              isActiveModal={isActiveModal}
              setIsActiveModal={setIsActiveModal}
            />
          </>
        )}
        <PhoneFilter isActive={!!isActiveModal.filter} closeModal={closeModal}>
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
          changeWindow={changeWindow}
        />
        <VotingEditModal
          modalActive={!!isActiveModal.revote}
          id={isActiveModal.result as number}
          closeModal={closeModal}
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
