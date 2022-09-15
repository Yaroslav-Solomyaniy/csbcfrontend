import React from 'react';
import { IParams } from '../index';
import { ITableHeader } from '../../../components/common/table/TableHeader';
import { ITableRowItem } from '../../../components/common/table/TableBody';
import Table from '../../../components/common/table';
import PageFilter from './PageFilter';
import styles from '../index.module.scss';

interface IDesktopTable{
params: IParams;
setParams: (value:IParams) => void;
dataHeader: ITableHeader[];
dataRow: ITableRowItem[];

}

const DesktopTable = ({ params, setParams, dataHeader, dataRow }:IDesktopTable) => (
  <Table
    filter={(
      <PageFilter value={params} setParams={setParams} />
    )}
    dataHeader={dataHeader}
    dataRow={dataRow}
    gridColumns={styles.columns}
    pagination={params.pagination}
    onPaginationChange={(newPagination) => setParams({ ...params, pagination: newPagination })}
  />
);

export default DesktopTable;
