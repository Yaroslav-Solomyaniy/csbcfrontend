import React, { useState } from 'react';
import styles from './index.module.scss';
import Layout from '../../loyout/Layout';
import { ITableHeader } from '../../components/common/table/TableHeader';
import { ITableRowItem } from '../../components/common/table/TableBody';
import { initialPagination, Pagination } from '../../types';

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
        www
      </div>
    </Layout>
  );
};

Curators.defaultProps = {
  filter: '',
};

export default Curators;
