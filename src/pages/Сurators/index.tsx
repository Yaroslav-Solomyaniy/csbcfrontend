import React, { useState } from 'react';
import TitlePage from '../../components/TitlePage';
import Button from '../../components/common/Button/index';
import styles from './index.module.scss';
import Layout from '../../loyout/Layout';
import { ITableHeader } from '../../components/common/table/TableHeader';
import Table from '../../components/common/table';
import SelectCurator from '../../components/common/SelectCurator';
import { ITableRowItem } from '../../components/common/table/TableBody';
import SelectGroup from '../../components/common/SelectGroup';
import { initialPagination, Pagination } from '../../types';
import CuratorCreateModal from './ModalCreate';

const dataHeader: ITableHeader[] = [
  { id: 1, label: 'ПІБ' },
  { id: 2, label: 'Групи' },
  { id: 3, label: 'E-Mail' },
  { id: 4, label: 'Дії' },
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

const Curators = (): JSX.Element => {
  // const { getGroups, groupCreate, groupEdit, groupDelete } = useGroupContext();
  const [params, setParams] = useState<Params>({
    filter: { curator: '', group: '' },
    pagination: initialPagination,
  });
  const [isActiveModal, setIsActiveModal] = useState(allCloseModalWindow);
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);

  const closeModal = () => {
    setIsActiveModal(allCloseModalWindow);
  };

  // useEffect(() => {
  //   getGroups?.getGroups();
  // }, [groupCreate?.data, groupEdit?.data, groupDelete?.data]);

  // useEffect(() => {
  //   const query: IGetGroupParams = {};
  //
  //   if (params.filter.curator) query.curatorId = +params.filter.curator;
  //   if (params.filter.group) query.name = params.filter.group;
  //   if (params.pagination.currentPage) query.page = params.pagination.currentPage;
  //   if (params.pagination.itemsPerPage) query.limit = params.pagination.itemsPerPage;
  //
  //   getGroups?.getGroups(query);
  // }, [params.filter.group, params.filter.curator, params.pagination.currentPage, params.pagination.itemsPerPage]);

  // useEffect(() => {
  //   if (getGroups?.data) {
  //     setParams({ ...params, pagination: getGroups.data.meta });
  //     setDataRow(getGroups?.data?.items.map((item: IGroupData) => ({
  //       list: [
  //         { id: 1, label: item.name },
  //         { id: 2, label: `${item.curator.firstName} ${item.curator.lastName} ${item.curator.patronymic}` },
  //         { id: 3, label: item.orderNumber },
  //         { id: 4, label: `${item.students}` },
  //         {
  //           id: 5,
  //           label: (
  //             <div className={styles.actions}>
  //               <Button
  //                 onClick={() => setIsActiveModal({ ...isActiveModal, edit: item.id })}
  //                 isImg
  //               >
  //                 <img src={edit} alt="edit" />
  //               </Button>
  //               <Button
  //                 onClick={() => setIsActiveModal({ ...isActiveModal, delete: item.id })}
  //                 isImg
  //               >
  //                 <img src={del} alt="delete" />
  //               </Button>
  //             </div>
  //           ),
  //         },
  //       ],
  //       key: item.id,
  //     })));
  //   }
  // }, [getGroups?.data]);

  return (
    <Layout>
      <div className={styles.curators}>
        <TitlePage
          title="Куратори"
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
              <SelectCurator
                type="filter"
                placeholder="ПІБ"
                onChange={(value) => setParams({
                  ...params,
                  filter: { ...params.filter, curator: value },
                  pagination: initialPagination,
                })}
                value={params.filter.curator}
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
        <CuratorCreateModal modalActive={isActiveModal.create} closeModal={closeModal} />
        {/* <GroupEditModal modalActive={!!isActiveModal.edit} groupId={isActiveModal.edit}
         closeModal={closeModal} /> */}
        {/* <GroupDeleteModal modalActive={!!isActiveModal.delete} groupId={isActiveModal.delete}
        closeModal={closeModal} /> */}
      </div>
    </Layout>
  );
};

Curators.defaultProps = {
  filter: '',
};

export default Curators;
