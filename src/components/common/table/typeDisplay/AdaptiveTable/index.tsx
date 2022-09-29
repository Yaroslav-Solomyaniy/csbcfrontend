import React, { useMemo, useState } from 'react';
import { ITableHeader } from '../../TableHeader';
import { ITableRowItem } from '../../TableBody';
import styles from './index.module.scss';
import AdaptiveTableModalButtons from '../../../AdaptiveTableModalButtons';

interface IAdaptiveTable{
  dataHeader: ITableHeader[];
  dataRow: ITableRowItem[];
}

const AdaptiveTable = ({ dataHeader, dataRow }:IAdaptiveTable) => {
  const content = useMemo(() => (
    <>
      {dataRow.map((rowItem) => (
        <div key={rowItem.key} className={styles.block}>
          <div className={styles.content}>
            {rowItem.list
              .splice(0, rowItem.list.length - 1)
              .map((i, index) => (
                <h6 key={i.id} className={index === 0 ? styles.Title : styles.Subtitle}>
                  {index !== 0 && (`${dataHeader[index]?.label}: `) }
                  {i.label}
                </h6>
              ))}
          </div>
          <div className={styles.Buttons}>
            <AdaptiveTableModalButtons>
              {rowItem.list[rowItem.list.length - 1].label}
            </AdaptiveTableModalButtons>
          </div>
        </div>
      ))}
    </>
  ), [dataHeader, dataRow]);

  return content;
};

export default AdaptiveTable;
