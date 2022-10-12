import React, { useEffect, useState } from 'react';
import TitlePage from '../../../components/common/TitlePage';
import Button from '../../../components/common/Button';
import styles from './index.module.scss';
import pagesStyle from '../../pagesStyle.module.scss';
import Layout from '../../../loyout/Layout';
import { ITableHeader } from '../../../components/common/Table/TypeDisplay/Desktop/TableHeader';
import { IGroupData } from '../../../hooks/PagesInAdmin/useGroups';
import { ITableRowItem } from '../../../components/common/Table/TypeDisplay/Desktop/TableBody';
import { GroupsContext } from '../../../context/PagesInAdmin/Groups';
import { initialPagination, Pagination } from '../../../types';
import GroupCreate from './ModalWindow/Create';
import GroupDelete from './ModalWindow/Delete';
import GroupEdit from './ModalWindow/Edit';
import { AddQueryParams, useQueryParam } from '../../../hooks/All/useQueryParams';
import PhoneFilter from '../../../components/common/PhoneFilter';
import FiltersGroups from './Filters';
import { DeviceContext } from '../../../context/All/DeviceType';
import { EditAndDelete } from '../../../components/common/CollectionMiniButtons';
import Table from '../../../components/common/Table';
import Preloader from '../../../components/common/Preloader/Preloader';

const dataHeader: ITableHeader[] = [
  { id: 1, label: 'Номер групи' },
  { id: 2, label: 'Куратор' },
  { id: 3, label: 'Номер наказу' },
  { id: 4, label: 'К-ть студентів' },
  { id: 5, label: 'Дії' },
];

const allCloseModalWindow: Record<string, number | boolean> = {
  create: false,
  filter: false,
  edit: 0,
  delete: 0,
};

const Group = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isActiveModal, setIsActiveModal] = useState(allCloseModalWindow);
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ ...initialPagination });

  const { getGroups, groupCreate, groupEdit, groupDelete } = GroupsContext();
  const { isPhone } = DeviceContext();
  const { get, post } = useQueryParam();

  const curator = Number(get('curatorId'));
  const group = get('group') || '';
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

  useEffect(() => {
    getGroups?.getGroups(
      AddQueryParams({ curatorId: curator, name: group.toString(), page: currentPage, limit: itemsPerPage }),
    );
  }, [currentPage, itemsPerPage, curator, group, groupCreate?.data, groupEdit?.data, groupDelete?.data]);

  useEffect(() => {
    if (getGroups?.data) {
      setPagination(getGroups.data.meta);
      setDataRow(getGroups?.data?.items.map((item: IGroupData) => ({
        list: [
          { id: 1, label: item.name ? item.name : 'Назва групи відсутня' },
          { id: 2,
            label: item.curator ? `${item?.curator?.lastName} ${item?.curator?.firstName} ${item?.curator?.patronymic}`
              : 'Куратор відсутній' },
          { id: 3, label: item.orderNumber ? item.orderNumber : 'Номер наказу відсуній' },
          { id: 4, label: item.students ? item.students : 'Студенти відсутні' },
          {
            id: 5,
            label: <EditAndDelete isActiveModal={isActiveModal} setIsActiveModal={setIsActiveModal} itemId={item.id} />,
          },
        ],
        key: item.id,
      })));
      setIsLoading(false);
    }
  }, [getGroups?.data]);

  return (
    <Layout>
      <TitlePage
        title="Групи"
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
      {isLoading ? (<Preloader />) : (
        <>
          <Table
            filter={(<FiltersGroups group={group} curator={curator} />)}
            dataHeader={dataHeader}
            dataRow={dataRow}
            gridColumns={styles.columns}
            totalItems={pagination.totalItems}
          />
          <PhoneFilter modalTitle="Фільтрація груп" isActive={!!isActiveModal.filter} closeModal={closeModal}>
            <FiltersGroups group={group} curator={curator} />
          </PhoneFilter>
          <GroupCreate modalActive={!!isActiveModal.create} closeModal={closeModal} />
          <GroupEdit modalActive={!!isActiveModal.edit} studentId={+isActiveModal.edit} closeModal={closeModal} />
          <GroupDelete modalActive={!!isActiveModal.delete} Id={+isActiveModal.delete} closeModal={closeModal} />
        </>
      )}
    </Layout>
  );
};

export default Group;
