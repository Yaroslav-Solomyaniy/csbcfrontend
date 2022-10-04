import React from 'react';
import clsx from 'clsx';
import { ITableHeader } from '../Desktop/TableHeader';
import { ITableRowItem } from '../Desktop/TableBody';
import styles from './index.module.scss';
import AdaptiveTableModalButtons from '../../../AdaptiveTableModalButtons';

interface IAdaptiveTable{
  dataHeader: ITableHeader[];
  dataRow: ITableRowItem[];
  isTableResult: boolean | undefined;
  isHistoryTable: boolean | undefined;
}

const AdaptiveTable = ({ dataHeader, dataRow, isTableResult, isHistoryTable }:IAdaptiveTable) => (
  <>
    {(!isTableResult && !isHistoryTable) && (
      dataRow.map((rowItem) => (
        <div key={rowItem.key} className={styles.block}>
          <div className={styles.content}>
            {rowItem.list
              .slice(0, rowItem.list.length - 1)
              .map((i, index) => (
                Array.isArray(i.label)
                  ? (
                    <div className={styles.ArrayRow}>
                      <h6
                        key={i.id}
                        className={index === 0 ? styles.Title : styles.Subtitle}
                      >
                        {index !== 0 && (`${dataHeader[index]?.label}: `) }
                      </h6>
                      <div>
                        {i.label.map((el) => (
                          <h6
                            className={clsx(index === 0
                              ? styles.Title : styles.Subtitle, styles.label)}
                            key={i.id}
                          >
                            {el}
                          </h6>
                        ))}
                      </div>
                    </div>
                  )
                  : (
                    <h6 key={i.id} className={index === 0 ? styles.Title : styles.Subtitle}>
                      {index !== 0 && (`${dataHeader[index]?.label}: `) }
                      {i.label}
                    </h6>
                  )))}
          </div>
          <div className={styles.Buttons}>
            <AdaptiveTableModalButtons>
              {rowItem.list[rowItem.list.length - 1].label}
            </AdaptiveTableModalButtons>
          </div>
        </div>
      ))
    )}
    {(isTableResult || isHistoryTable) && (
      dataRow.length
        ? dataRow.map((rowItem) => (
          <div key={rowItem.key} className={styles.block}>
            <div className={styles.content}>
              {rowItem.list.map((i, index) => (
                <h6 key={i.id} className={index === 0 ? styles.Title : styles.Subtitle}>
                  {index !== 0 && (`${dataHeader[index]?.label}: `) }
                  {i.label}
                </h6>
              ))}
            </div>
          </div>
        ))
        : (
          <div className={styles.block_no_data}>
            <div className={styles.no_data}>Дані відсутні</div>
          </div>
        )

    )}
  </>
);

export default AdaptiveTable;
