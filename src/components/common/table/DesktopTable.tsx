import React from 'react';
import { IParams } from '../../../pages/Teacher';
import { ITableHeader } from './TableHeader';
import { ITableRowItem } from './TableBody';
import Table from './index';
import FilterTeacherPage from '../../../pages/Teacher/components/FilterTeacherPage';

interface IDesktopTable{
params: IParams;
setParams: (value:IParams) => void;
dataHeader: ITableHeader[];
dataRow: ITableRowItem[];
className: string;
}

const DesktopTable = ({ params, setParams, dataHeader, dataRow, className }:IDesktopTable) => (
  <Table
    filter={(
      <FilterTeacherPage value={params} setParams={setParams} />
    )}
    dataHeader={dataHeader}
    dataRow={dataRow}
    gridColumns={className}
  />
);

export default DesktopTable;
