import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import TitlePage from '../../components/TitlePage';
import Button from '../../components/common/Button/index';
import styles from './index.module.scss';
import pagesStyle from '../pagesStyle.module.scss';
import Layout from '../../loyout/Layout';
import { ITableHeader } from '../../components/common/table/TableHeader';
import { IGetGroupParams, IGroupData } from '../../hooks/useGroups';
import { ITableRowItem } from '../../components/common/table/TableBody';
import { useGroupContext } from '../../context/groups';
import { initialPagination, Pagination } from '../../types';
import GroupCreate from './ModalWindow/Create';
import GroupDelete from './ModalWindow/Delete';
import GroupEdit from './ModalWindow/Edit';
import { Delete, Edit } from '../../components/common/Icon';
import { useQueryParam } from '../../hooks/useUrlParams';
import PhoneFilter from '../../components/common/PhoneFilter';
import FilterPageGroup from './components/FilterPageGroup';
import { useDeviceContext } from '../../context/TypeDevice';
import DesktopTable from '../../components/common/table/DesktopTable';
import TableFilter from '../../components/common/table/TableFilter';
import MobileElementListGroupPageAdmin from './components/MobileElementListGroupPageAdmin';
import { EditAndDelete } from '../../components/common/GroupButtons';

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
  const [isActiveModal, setIsActiveModal] = useState(allCloseModalWindow);
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ ...initialPagination });
  const [data, setData] = useState<IGroupData[]>();
  const [searchParams] = useSearchParams();

  const { getGroups, groupCreate, groupEdit, groupDelete } = useGroupContext();
  const { isDesktop, isTablet, isPhone } = useDeviceContext();

  const { get } = useQueryParam();

  const curator = get('curatorId');
  const group = get('group');
  const currentPage = Number(get('currentPage')) || 1;
  const itemsPerPage = Number(get('itemsPerPage')) || 10;

  const closeModal = () => {
    setIsActiveModal(allCloseModalWindow);
  };

  useEffect(() => {
    const query: IGetGroupParams = {};

    if (curator) {
      query.curatorId = +curator;
    }
    if (group) {
      query.name = String(group);
    }
    if (currentPage) {
      query.page = +currentPage;
    }
    if (itemsPerPage) {
      query.limit = +itemsPerPage;
    }

    getGroups?.getGroups(query);
  }, [currentPage, itemsPerPage, curator, group, searchParams, groupCreate?.data, groupEdit?.data, groupDelete?.data]);

  useEffect(() => {
    if (getGroups?.data) {
      setPagination(getGroups.data.meta);
      setDataRow(getGroups?.data?.items.map((item: IGroupData) => ({
        list: [
          { id: 1, label: item.name },
          { id: 2, label: `${item.curator.lastName} ${item.curator.firstName} ${item.curator.patronymic}` },
          { id: 3, label: item.orderNumber },
          { id: 4, label: `${item.students}` },
          {
            id: 5,
            label: <EditAndDelete isActiveModal={isActiveModal} setIsActiveModal={setIsActiveModal} itemId={item.id} />,
          },
        ],
        key: item.id,
      })));
      setData(getGroups.data.items);
    }
  }, [getGroups?.data]);

  return (
    <Layout>
      <div>
        {isDesktop && (
          <>
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
            <DesktopTable
              filter={(<FilterPageGroup group={group} curator={curator} />)}
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
              title="Групи"
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
            {isTablet && (<TableFilter filter={<FilterPageGroup group={group} curator={curator} />} />)}
            <MobileElementListGroupPageAdmin
              data={data}
              isActiveModal={isActiveModal}
              setIsActiveModal={setIsActiveModal}
            />
          </>
        )}
        <PhoneFilter isActive={!!isActiveModal.filter} closeModal={closeModal}>
          <FilterPageGroup group={group} curator={curator} />
        </PhoneFilter>
        <GroupCreate modalActive={!!isActiveModal.create} closeModal={closeModal} />
        <GroupEdit modalActive={!!isActiveModal.edit} studentId={+isActiveModal.edit} closeModal={closeModal} />
        <GroupDelete modalActive={!!isActiveModal.delete} Id={+isActiveModal.delete} closeModal={closeModal} />
      </div>
    </Layout>
  );
};

Group.defaultProps = {
  filter: '',
};

export default Group;
