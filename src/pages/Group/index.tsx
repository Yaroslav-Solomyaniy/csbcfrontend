import React, { useEffect, useState } from 'react';
import TitlePage from '../../components/TitlePage';
import Button from '../../components/common/Button/index';
import styles from './index.module.scss';
import pagesStyle from '../pagesStyle.module.scss';
import Layout from '../../loyout/Layout';
import { ITableHeader } from '../../components/common/table/TableHeader';
import Table from '../../components/common/table';
import { IGetGroupParams, IGroupData } from '../../hooks/useGroups';
import { ITableRowItem } from '../../components/common/table/TableBody';
import { useGroupContext } from '../../context/groups';
import { initialPagination, Pagination } from '../../types';
import GroupCreate from './GroupCreate';
import GroupDelete from './GroupDelete';
import GroupEdit from './GroupEdit';
import SelectGroupByName from '../../components/common/Select/SelectGroupByName';
import SelectCurator from '../../components/common/Select/SelectCurator';
import { Delete, Edit } from '../../components/common/Icon';
import { useQueryParam } from '../../hooks/useUrlParams';

const dataHeader: ITableHeader[] = [
  { id: 1, label: 'Номер групи' },
  { id: 2, label: 'Куратор' },
  { id: 3, label: 'Номер наказу' },
  { id: 4, label: 'К-ть студентів' },
  { id: 5, label: 'Дії' },
];

const allCloseModalWindow: Record<string, number | boolean> = {
  create: false,
  edit: 0,
  delete: 0,
};

const Group = (): JSX.Element => {
  const [pagination, setPagination] = useState<Pagination>({ ...initialPagination });
  const [isActiveModal, setIsActiveModal] = useState(allCloseModalWindow);
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);
  const { get, post } = useQueryParam();
  const { getGroups, groupCreate, groupEdit, groupDelete } = useGroupContext();

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
  }, [currentPage, itemsPerPage, curator, group, groupCreate?.data, groupEdit?.data, groupDelete?.data]);

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
              </div>
            ),
          },
        ],
        key: item.id,
      })));
    }
  }, [getGroups?.data]);

  return (
    <Layout>
      <div className={styles.group}>
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
        <Table
          filter={(
            <>
              <SelectCurator
                type="filter"
                placeholder="Куратор"
                onChange={(value) => post({ curatorId: value, currentPage: 1 })}
                value={curator}
                isClearable
                isSearchable
                isFilter
              />
              <SelectGroupByName
                type="filter"
                placeholder="Група"
                onChange={(value) => post({ group: value, currentPage: 1 })}
                value={group}
                isClearable
                isSearchable
                isFilter
              />
            </>
          )}
          dataHeader={dataHeader}
          dataRow={dataRow}
          gridColumns={styles.columns}
          pagination={pagination}
        />
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
