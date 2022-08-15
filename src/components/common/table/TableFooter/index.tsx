import React from 'react';
import styles from './index.module.scss';
import { Pagination } from '../../../../types';
import Button from '../../Button';
import Select from '../../Select';
import { First, Last, Next, Prev } from '../../Icon';

interface TableFooter {
  pagination: Pagination;
  onPaginationChange: (pagination: Pagination) => void;
}

const TableFooter = ({ pagination, onPaginationChange }: TableFooter): JSX.Element => (
  <div className={styles.footer}>
    <label className={styles.footer__lable}>Рядків на сторінці</label>
    <Select
      isDisabled={!(pagination.totalItems > 10)}
      type="pagination"
      options={[
        { label: 10, value: 10 },
        { label: 15, value: 15 },
        { label: 30, value: 30 },
      ]}
      onChange={(value) => onPaginationChange({ ...pagination, itemsPerPage: +value, currentPage: 1 })}
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
    {pagination.totalItems > 10 && (
      <div className={styles.footer__buttons}>
        <Button
          isImg
          className={styles.footer__buttons_first}
          disabled={pagination.currentPage === 1}
          onClick={() => onPaginationChange({ ...pagination, currentPage: 1 })}
        >
          <First />
        </Button>
        <Button
          isImg
          className={styles.footer__buttons_prev}
          disabled={pagination.currentPage === 1}
          onClick={() => onPaginationChange({ ...pagination, currentPage: pagination.currentPage - 1 })}
        >
          <Prev />
        </Button>
        <Button
          isImg
          className={styles.footer__buttons_next}
          disabled={pagination.totalPages < pagination.currentPage + 1}
          onClick={() => onPaginationChange({ ...pagination, currentPage: pagination.currentPage + 1 })}
        >
          <Next />
        </Button>
        <Button
          isImg
          className={styles.footer__buttons_last}
          disabled={pagination.totalPages === pagination.currentPage}
          onClick={() => onPaginationChange({ ...pagination, currentPage: pagination.totalPages })}
        >
          <Last />
        </Button>
      </div>
    )}

  </div>
);

export default TableFooter;
