import React from 'react';
import { IParams } from '../../../pages/Teacher';
import { ITableHeader } from './TableHeader';
import { ITableRowItem } from './TableBody';
import Table from './index';
import FilterTeacherPage from '../../../pages/Teacher/components/FilterTeacherPage';

interface IDesktopTable{
dataHeader: ITableHeader[];
dataRow: ITableRowItem[];
className: string;
filter?: JSX.Element;
totalItems?: number;
}

const DesktopTable = ({ totalItems, filter, dataHeader, dataRow, className }:IDesktopTable) => (
  <Table
    dataHeader={dataHeader}
    dataRow={dataRow}
    gridColumns={className}
    filter={filter}
    totalItems={totalItems}
  />
);

DesktopTable.defaultProps = {
  filter: undefined,
  totalItems: 0,
};

export default DesktopTable;
