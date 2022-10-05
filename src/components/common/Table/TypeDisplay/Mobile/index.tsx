import React from 'react';
import clsx from 'clsx';
import ReactTooltip from 'react-tooltip';
import { ITableHeader } from '../Desktop/TableHeader';
import { ITableRowItem } from '../Desktop/TableBody';
import styles from './index.module.scss';
import AdaptiveTableModalButtons from '../../../AdaptiveTableModalButtons';

interface IAdaptiveTable {
  dataHeader: ITableHeader[];
  dataRow: ITableRowItem[];
  isTableResult: boolean | undefined;
  isHistoryTable: boolean | undefined;
  isTwoColumns?: boolean;
  heightVH?: string;
}

const AdaptiveTable = ({
  dataHeader,
  dataRow,
  isTableResult,
  isHistoryTable,
  isTwoColumns,
  heightVH,
}: IAdaptiveTable) => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <>
    {dataRow.length ? (
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
                            {index !== 0 && (`${dataHeader[index]?.label}: `)}
                          </h6>
                          <div>
                            {i.label.map((el, num) => (
                              <h6
                                className={clsx(index === 0
                                  ? styles.Title : styles.Subtitle, styles.label)}
                                key={i.id}
                              >
                                <a data-tip data-for={`${index}:-${rowItem.key}--${num}`}>{el}</a>
                                <ReactTooltip
                                  id={`${index}:-${rowItem.key}--${num}`}
                                  type="info"
                                  backgroundColor="#C0D7FC"
                                  delayShow={850}
                                  textColor="#000000"
                                  arrowColor="#e8e8e8"
                                  className={styles.tooltip}
                                >
                                  <span>{el}</span>
                                </ReactTooltip>
                              </h6>
                            ))}
                          </div>
                        </div>
                      )
                      : (
                                               <h6 key={i.id} className={index === 0 ? styles.Title : styles.Subtitle}>
                          <div
                            className={clsx(isTwoColumns && styles.titleGrade)}
                          >
                            {index !== 0 && (`${dataHeader[index]?.label}: `)}
                          </div>
                          <a data-tip data-for={`${rowItem.key}-${i.id}`}>{i.label}</a>
                          <ReactTooltip
                            id={`${rowItem.key}-${i.id}`}
                            type="info"
                            backgroundColor="#C0D7FC"
                            delayShow={850}
                            textColor="#000000"
                            arrowColor="#e8e8e8"
                            className={styles.tooltip}
                          >
                            <span>{i.label}</span>
                          </ReactTooltip>
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
        <div className={styles.contentScroll} style={{ height: heightVH }}>
          {dataRow.map((rowItem) => (
            <div key={rowItem.key} className={styles.block}>
              <div className={styles.content}>
                {rowItem.list.map((i, index) => (
                                         <h6 key={i.id} className={index === 0 ? styles.Title : styles.Subtitle}>
                      {index !== 0 && (`${dataHeader[index]?.label}: `)}
                      <a data-tip data-for={`${index}-${i.id}:${rowItem.key}`}>{i.label}</a>
                      <ReactTooltip
                        id={`${index}-${i.id}:${rowItem.key}`}
                        type="info"
                        backgroundColor="#C0D7FC"
                        delayShow={850}
                        textColor="#000000"
                        arrowColor="#e8e8e8"
                        className={styles.tooltip}
                      >
                        <span>{i.label}</span>
                      </ReactTooltip>
                    </h6>
                                       ))}
              </div>
            </div>
          ))}
        </div>
        )}
      </>
    ) : (
      <div className={styles.block_no_data}>
        <div className={styles.no_data}>Дані відсутні</div>
      </div>
    )}

  </>
);

AdaptiveTable.defaultProps = {
  isTwoColumns: false,
  heightVH: '60vh',
};

export default AdaptiveTable;
