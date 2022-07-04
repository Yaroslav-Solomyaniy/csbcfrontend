import React from 'react';
import styles from './index.module.scss';
import { Pagination } from '../../../../types';
import Button from '../../Button';
import Select from '../../Select';
import first from '../../../../images/table/first.svg';
import prev from '../../../../images/table/prev.svg';
import next from '../../../../images/table/next.svg';
import last from '../../../../images/table/last.svg';

interface TableFooter {
  pagination: Pagination;
  onPaginationChange: (pagination: Pagination) => void;
}

const TableFooter = ({ pagination, onPaginationChange }: TableFooter): JSX.Element => (
  <div className={styles.footer}>
    <label className={styles.footer__lable}>Рядків на сторінці</label>
    <Select
      type="pagination"
      options={[
        { label: 10, value: 10 },
        { label: 15, value: 15 },
        { label: 30, value: 30 },
      ]}
      onChange={(value) => onPaginationChange({ ...pagination, itemsPerPage: +value })}
      value={pagination.itemsPerPage}
    />
    <div className={styles.footer__info}>
      {pagination.currentPage * pagination.itemsPerPage - pagination.itemsPerPage + 1}
      {' - '}
      {pagination.currentPage * pagination.itemsPerPage > pagination.totalItems ? (
        pagination.totalItems
      ) : (
        pagination.currentPage * pagination.itemsPerPage
      )}
      {' '}
      з
      {' '}
      {pagination.totalItems}
    </div>
    <div className={styles.footer__buttons}>
      <Button
        isImg
        className={styles.footer__buttons_first}
        onClick={() => onPaginationChange({ ...pagination, currentPage: 1 })}
      >
        <img src={first} alt="first" />
      </Button>
      <Button
        isImg
        className={styles.footer__buttons_prev}
        disabled={pagination.currentPage === 1}
        onClick={() => onPaginationChange({ ...pagination, currentPage: pagination.currentPage - 1 })}
      >
        <img src={prev} alt="prev" />
      </Button>
      <Button
        isImg
        className={styles.footer__buttons_next}
        disabled={pagination.totalPages < pagination.currentPage + 1}
        onClick={() => onPaginationChange({ ...pagination, currentPage: pagination.currentPage + 1 })}
      >
        <img src={next} alt="next" />
      </Button>
      <Button
        isImg
        className={styles.footer__buttons_last}
        onClick={() => onPaginationChange({ ...pagination, currentPage: pagination.totalPages })}
      >
        <img src={last} alt="last" />
      </Button>
    </div>
  </div>
);

export default TableFooter;
