import React, { useState } from 'react';
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
  result: boolean;
}

const allCloseModalWindow: IIsActiveModalState = {
  create: false,
  edit: 0,
  delete: 0,
  result: false,
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

  /* useEffect(() => {
     if (getAdministrators?.data) {
       setParams({ ...params, pagination: getAdministrators.data.meta });
       setDataRow(getAdministrators?.data?.items.map((item: IGetUserData) => ({
         list: [
           { id: 1, label: `${item.lastName} ${item.firstName} ${item.patronymic}` },
           { id: 2, label: item.email },
           {
             id: 3,
             label: (
               <div className={pagesStyle.actions}>
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
   }, [getAdministrators?.data]); */
  return (
    <Layout>
      <div>
        <TitlePage
          title="Голосування"
          action={(
            <>
              <Button
                nameClass="primary"
                size="large"
                onClick={() => setIsActiveModal({ ...isActiveModal, create: true })}
              >
                Створити
              </Button>
              <Button
                nameClass="primary"
                size="large"
                onClick={() => setIsActiveModal({ ...isActiveModal, result: true })}
              >
                Результати
              </Button>
            </>
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
        {/* <VotingEditModal modalActive={!!isActiveModal.edit} Id={isActiveModal.edit} closeModal={closeModal} />
        <VotingDeleteModal modalActive={!!isActiveModal.delete} Id={isActiveModal.delete} closeModal={closeModal} /> */}
        <VotingResultModal modalActive={isActiveModal.result} Id={isActiveModal.edit} closeModal={closeModal} />
      </div>
    </Layout>
  );
};

VotingAdmin.defaultProps = {
  filter: '',
};

export default VotingAdmin;
