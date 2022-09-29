import React from 'react';
import { ITableRowItem } from './TableBody';
import TableFilter from './TableFilter';
import { ITableHeader } from './TableHeader';
import { useDeviceContext } from '../../../context/TypeDevice';
import DesktopTable from './typeDisplay/DesktopTable';

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
}: ITable): JSX.Element => {
  const { isPhone, isTablet, isDesktop } = useDeviceContext();

  return (
    <>
      {(isDesktop || isTablet) && (<TableFilter filter={filter} />)}
      {isDesktop && (
        <DesktopTable
          dataRow={dataRow}
          dataHeader={dataHeader}
          gridColumns={gridColumns}
          isScroll={isScroll}
          isHistoryTable={isHistoryTable}
          isTableResult={isTableResult}
          columScrollHorizontal={columScrollHorizontal}
          totalItems={totalItems}
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
  totalItems: 0,
};

export default Table;
