import React from 'react';
import { ITableRowItem } from './TypeDisplay/Desktop/TableBody';
import TableFilter from './TypeDisplay/Desktop/TableFilter';
import { ITableHeader } from './TypeDisplay/Desktop/TableHeader';
import { DeviceContext } from '../../../context/All/DeviceType';
import DesktopTable from './TypeDisplay/Desktop';
import AdaptiveTable from './TypeDisplay/Mobile';

interface ITable {
  dataHeader: ITableHeader[] | [];
  dataRow: ITableRowItem[] | [];
  gridColumns: string;
  filter?: JSX.Element | undefined;
  columScrollHorizontal?: number;
  isScroll?: boolean;
  isTableResult?: boolean;
  isHistoryTable?: boolean;
  totalItems?: number;
  isTwoColumns?: boolean;
  isTableVoting?: boolean;
  heightVH?: string;
}

const Table = ({
  dataHeader,
  dataRow,
  gridColumns,
  isTableResult,
  filter,
  totalItems,
  isHistoryTable,
  columScrollHorizontal,
  isScroll,
  heightVH,
  isTwoColumns,
  isTableVoting,
}: ITable): JSX.Element => {
  const { isPhone, isTablet, isDesktop } = DeviceContext();

  return (
    <>
      {(isDesktop || isTablet) && (<TableFilter filter={filter} />)}

      {((isDesktop) || (isTablet && (isTableResult || isHistoryTable))) && (
        <DesktopTable
          dataRow={dataRow}
          dataHeader={dataHeader}
          gridColumns={gridColumns}
          isScroll={isScroll}
          isHistoryTable={isHistoryTable}
          isTableResult={isTableResult}
          columScrollHorizontal={columScrollHorizontal}
          totalItems={totalItems}
          isTableVoting={isTableVoting}
        />
      )}
      {((isTablet && (!isTableResult && !isHistoryTable)) || isPhone) && (
        <AdaptiveTable
          isHistoryTable={isHistoryTable}
          isTableResult={isTableResult}
          dataHeader={dataHeader}
          dataRow={dataRow}
          heightVH={heightVH}
          isTwoColumns={isTwoColumns}

        />
      )}
    </>
  );
};

Table.defaultProps = {
  pagination: null,
  filter: <div />,
  isScroll: false,
  columScrollHorizontal: 0,
  isTableResult: false,
  isHistoryTable: false,
  isTwoColumns: false,
  totalItems: 0,
  heightVH: '30vh',
  isTableVoting: false,
};

export default Table;
