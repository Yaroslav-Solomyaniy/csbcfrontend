import React from 'react';
import clsx from 'clsx';

import ReactTooltip from 'react-tooltip';
import styles from './index.module.scss';

export interface ITableRowItem {
  key: string | number;
  list: {
    id: string | number;
    label: string[] | string | number | JSX.Element;
  }[];
}

interface ITableBody {
  gridColumns: string;
  dataRow: ITableRowItem[];
  isScroll?: boolean;
  columScrollHorizontal?: number;
  isTableResult?: boolean;
  isHistoryTable?: boolean;
  isTableVoting?: boolean;
}

const TableBody = ({
  dataRow, gridColumns,
  isScroll, columScrollHorizontal, isTableResult,
  isHistoryTable, isTableVoting,
}: ITableBody): JSX.Element => (
  <div className={clsx(isTableResult && styles.tableResult, isHistoryTable && styles.historyTable, styles.content)}>
    {dataRow.map(({ key, list }) => (
      <div
        className={clsx(styles.body__row, gridColumns, !isScroll && styles.borderBottom)}
        key={key}
        style={isScroll ? {
          gridTemplateColumns: `16% 9% 9% repeat(${columScrollHorizontal}, ${
            columScrollHorizontal
              ? columScrollHorizontal > 6 ? 12 : 54 / columScrollHorizontal : 54}%) 12%`,
        } : {}}
      >
        {list.map(({ id, label }) => (
          <div
            className={clsx(
              styles.body__row__item,
              'clip',
              isScroll && styles.body__row__item__scroll,
            )}
            key={id}
          >
            {Array.isArray(label) ? (
              label.map((el, index) => (
                <div className={clsx(styles.body__row__item__string, 'clip')} key={`${id}${el}`}>
                  <a data-tip data-for={`${key}-${id}-${index}`}>{el}</a>
                  <ReactTooltip
                    id={`${key}-${id}-${index}`}
                    type="info"
                    backgroundColor="#C0D7FC"
                    delayShow={850}
                    textColor="#000000"
                    arrowColor="#e8e8e8"
                    className={styles.tooltip}
                  >
                    <span>{el}</span>
                  </ReactTooltip>

                </div>
              ))
            ) : (
              <div className={clsx(styles.body__row__item__string, 'clip')} key={`${id}${label}`}>
                {(isScroll
                  || ((!isTableResult && !isHistoryTable) && id === list.length)
                  || (isTableVoting && id === 1)
                  || (isTableVoting && isTableResult && id === 1))
                  ? <span>{label}</span>
                  : (
                    <>
                      <a data-tip data-for={`${key}-${id}`}>{label}</a>
                      <ReactTooltip
                        id={`${key}-${id}`}
                        type="info"
                        backgroundColor="#C0D7FC"
                        delayShow={850}
                        textColor="#000000"
                        arrowColor="#e8e8e8"
                        className={styles.tooltip}
                      >
                        <span>{label}</span>
                      </ReactTooltip>
                    </>
                  )}
              </div>
            )}
          </div>
        ))}
      </div>
    ))}
  </div>
);

TableBody.defaultProps = {
  pagination: null,
  onPaginationChange: undefined,
  isScroll: false,
  columScrollHorizontal: 0,
  isTableResult: false,
  isHistoryTable: false,
  isTableVoting: false,
};

export default TableBody;
