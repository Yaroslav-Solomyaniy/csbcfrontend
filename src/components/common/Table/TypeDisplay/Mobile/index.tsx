import React from 'react';
import clsx from 'clsx';
import ReactTooltip from 'react-tooltip';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ITableHeader } from '../Desktop/TableHeader';
import { ITableRowItem } from '../Desktop/TableBody';
import styles from './index.module.scss';
import AdaptiveTableModalButtons from '../../../AdaptiveTableModalButtons';
import { useQueryParam } from '../../../../../hooks/All/useQueryParams';

interface IAdaptiveTable {
  dataHeader: ITableHeader[];
  dataRow: ITableRowItem[];
  isTableResult: boolean | undefined;
  isHistoryTable: boolean | undefined;
  isTwoColumns?: boolean;
  heightVH?: string;
  isTableVoting?: boolean;
}

const AdaptiveTable = ({
  dataHeader,
  dataRow,
  isTableResult,
  isHistoryTable,
  isTwoColumns,
  heightVH,
  isTableVoting,
}: IAdaptiveTable) => {
  const { get, post } = useQueryParam();
  const itemsPerPage = Number(get('itemsPerPage')) || 10;
  const currentPage = Number(get('currentPage')) || 1;

  return (
  // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {dataRow.length ? (
        <InfiniteScroll
          className={styles.infinity}
          dataLength={dataRow.length}
          next={() => post({
            itemsPerPage: 100,
            currentPage: dataRow.length === itemsPerPage ? currentPage + 1 : currentPage })}
          hasMore
          height="65vh"
          loader={<h4>Loading...</h4>}
          endMessage={(<p style={{ textAlign: 'center' }}><b>Yay! You have seen it all</b></p>)}
        >
          {!isTableResult && !isHistoryTable && !isTableVoting && dataRow.map((rowItem) => (
            <div key={rowItem.key} className={styles.block}>
              <div className={styles.content}>
                {rowItem.list
                  .slice(0, rowItem.list.length - 1)
                  .map((item, index) => Array.isArray(item.label) ? (
                    <div className={styles.ArrayRow}>
                      <h6 key={item.id} className={clsx(index === 0 ? styles.Title : styles.Subtitle)}>
                        {index !== 0 && `${dataHeader[index]?.label}: `}
                      </h6>
                      <div className={styles.label}>
                        {item.label.map((el, num) => (
                        // eslint-disable-next-line max-len
                          <h6 className={clsx(index === 0 ? styles.Title : styles.Subtitle, styles.label)} key={item.id}>
                            <a className={styles.label} data-tip data-for={`${index}:-${rowItem.key}--${num}`}>{el}</a>
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
                  ) : (!!item.label && (
                  <h6 key={item.id} className={clsx(index === 0 ? styles.Title : styles.Subtitle)}>
                    <div className={clsx(styles.marginHeder, isTwoColumns && styles.titleGrade)}>
                      {index !== 0 && `${dataHeader[index]?.label}:  `}
                    </div>
                    <a className={styles.label} data-tip data-for={`${rowItem.key}-${item.id}`}>
                      {item.label}
                    </a>
                    <ReactTooltip
                      id={`${rowItem.key}-${item.id}`}
                      type="info"
                      backgroundColor="#C0D7FC"
                      delayShow={850}
                      textColor="#000000"
                      arrowColor="#e8e8e8"
                      className={styles.tooltip}
                    >
                      <span>{item.label}</span>
                    </ReactTooltip>
                  </h6>
                  )
                  ))}
              </div>
              <div className={styles.Buttons}>
                <AdaptiveTableModalButtons>
                  {rowItem.list[rowItem.list.length - 1].label}
                </AdaptiveTableModalButtons>
              </div>
            </div>
          ))}
          {(isTableResult || isHistoryTable || isTableVoting) && (
          <div className={styles.contentScroll} style={{ height: heightVH }}>
            {dataRow.map((rowItem) => (
              <div key={rowItem.key} className={styles.block}>
                <div className={styles.content}>
                  {rowItem.list.map((i, index) => (
                    <h6 key={i.id} className={clsx(index === 0 ? styles.Title : styles.Subtitle, styles.label)}>
                      {isTableVoting && index === 0 ? <span>{i.label}</span> : (
                        <>
                          {index !== 0 && `${dataHeader[index]?.label}:  `}
                          <a className={styles.label} data-tip data-for={`${index}-${i.id}:${rowItem.key}`}>
                            {i.label}
                          </a>
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
                        </>
                      )}
                    </h6>
                  ))}
                </div>
              </div>
            ))}
          </div>
          )}
        </InfiniteScroll>
      ) : (
        <div className={styles.block_no_data}>
          <div className={styles.no_data}>Дані відсутні</div>
        </div>
      )}
    </>
  );
};

AdaptiveTable.defaultProps = {
  isTwoColumns: false,
  heightVH: 'auto',
  isTableVoting: false,
};

export default AdaptiveTable;
