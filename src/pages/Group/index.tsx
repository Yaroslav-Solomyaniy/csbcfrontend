import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { log } from 'util';
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

const dataHeader: ITableHeader[] = [
  { id: 1, label: 'Номер групи' },
  { id: 2, label: 'Куратор' },
  { id: 3, label: 'Номер наказу' },
  { id: 4, label: 'К-ть студентів' },
  { id: 5, label: 'Дії' },
];

interface IIsActiveModalState {
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

const groupParamsByKey = (params:Record<string, any>) => [...params.entries()].reduce(
  (acc, tuple) => {
    const [key, val] = tuple;

    acc[key] = [val];

    return acc;
  },
  {},
);

const useQueryParam = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const freshSearchParams = useMemo(() => groupParamsByKey(searchParams), [
    searchParams,
  ]);

  const get = useCallback((key) => freshSearchParams[key], [freshSearchParams]);

  const post = useCallback(
    (key, value) => {
      setSearchParams({ ...freshSearchParams, [key]: value });
      if (!value) {
        searchParams.delete(key);
        setSearchParams(searchParams);
      }
    },
    [freshSearchParams, setSearchParams],
  );

  return { get, post };
};

const Group = (): JSX.Element => {
  const { getGroups, groupCreate, groupEdit, groupDelete } = useGroupContext();
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);
  const { get, post } = useQueryParam();
  const [searchParams, setSearchParams] = useSearchParams();

  const curator:string = get('curatorId');
  const group:string = get('group');
  const currentPage:string = get('currentPage');
  const itemsPerPage:string = get('itemsPerPage');
  // useEffect(() => {
  //   setSearchParams(searchParams);
  // }, [searchParams]);

  useEffect(() => {
    const query: IGetGroupParams = {};

    if (curator) {
      query.curatorId = +curator;
    }
    if (group) {
      query.name = String(group);
    }

    getGroups?.getGroups(query);
  }, [searchParams, groupCreate?.data, groupEdit?.data, groupDelete?.data]);

  useEffect(() => {
    if (getGroups?.data) {
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
                  onClick={() => console.log('1')}
                  isImg
                >
                  <Edit />
                </Button>
                <Button
                  onClick={() => console.log('1')}
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
        <Table
          filter={(
            <>
              <SelectCurator
                type="filter"
                placeholder="Куратор"
                onChange={(value) => post('curatorId', value)}
                value={curator}
                isClearable
                isSearchable
                isFilter
              />
              <SelectGroupByName
                type="filter"
                placeholder="Група"
                onChange={(value) => post('group', value)}
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
          // pagination={}
          // onPaginationChange={}
        />
      </div>
    </Layout>
  );
};

Group.defaultProps = {
  filter: '',
};

export default Group;
