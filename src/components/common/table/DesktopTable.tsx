import React from 'react';
import { ITableHeader } from './TableHeader';
import { ITableRowItem } from './TableBody';
import Table from './index';

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
