import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { Option } from '../../../../../../types';
import Button from '../../../../Button';
import Select from '../../../../Select';
import { First, Last, Next, Prev } from '../../../../Icons';
import { useQueryParam } from '../../../../../../hooks/All/useQueryParams';

interface TableFooter {
  totalItems: number;
}

const TableFooter = ({ totalItems }: TableFooter): JSX.Element => {
  const { get, post } = useQueryParam();
  const currentPage = Number(get('currentPage')) || 1;
  const itemsPerPage = Number(get('itemsPerPage')) || 10;
  const totalPages = Math.ceil(+totalItems / +itemsPerPage);
  const [options] = useState<Option[]>([
    { label: 10, value: 10 },
    { label: 15, value: 15 },
    { label: 30, value: 30 },
  ]);

  useEffect(() => {
    if (options.every((option) => option.value !== +itemsPerPage)) {
      post({ itemsPerPage: 15 });
    }
  }, [itemsPerPage]);

  return (
    <div className={styles.footer}>
      <label className={styles.footer__lable}>Рядків на сторінці</label>
      <Select
        isDisabled={!(totalItems > 10)}
        type="pagination"
        options={options}
        onChange={(value) => post({ itemsPerPage: value, currentPage: 1 })}
        value={+itemsPerPage}
      />
      <div className={styles.footer__info}>
        {+currentPage * +itemsPerPage - +itemsPerPage + 1}
        {' - '}
        {+currentPage * +itemsPerPage > totalItems ? (
          totalItems
        ) : (
          +currentPage * +itemsPerPage
        )}
        {' '}
        з
        {' '}
        {totalItems}
      </div>
      {totalItems > 10 && (

        <div className={styles.footer__buttons}>
          <Button
            isImg
            className={styles.footer__buttons_first}
            disabled={+currentPage === 1}
            onClick={() => post({ currentPage: 1 })}
          >
            <First />
          </Button>
          <Button
            isImg
            className={styles.footer__buttons_prev}
            disabled={+currentPage === 1}
            onClick={() => post({ currentPage: +currentPage - 1 })}
          >
            <Prev />
          </Button>
          <Button
            isImg
            className={styles.footer__buttons_next}
            disabled={totalPages < +currentPage + 1}
            onClick={() => post({ currentPage: +currentPage + 1 })}
          >
            <Next />
          </Button>
          <Button
            isImg
            className={styles.footer__buttons_last}
            disabled={totalPages === +currentPage}
            onClick={() => post({ currentPage: +totalPages })}
          >
            <Last />
          </Button>
        </div>
      )}

    </div>
  );
};

export default TableFooter;
