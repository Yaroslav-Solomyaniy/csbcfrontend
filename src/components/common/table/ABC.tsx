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

const ABC = ({ totalItems, filter, dataHeader, dataRow, className }:IDesktopTable) => (
  <Table
    dataHeader={dataHeader}
    dataRow={dataRow}
    gridColumns={className}
    filter={filter}
    totalItems={totalItems}
  />
);

ABC.defaultProps = {
  filter: undefined,
  totalItems: 0,
};

export default ABC;
