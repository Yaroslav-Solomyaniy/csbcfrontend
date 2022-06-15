import React from 'react';
import clsx from 'clsx';
import Select, { Options } from 'react-select';
import styles from './table.module.scss';
import first from '../../images/table/first.svg';
import prev from '../../images/table/prev.svg';
import next from '../../images/table/next.svg';
import last from '../../images/table/last.svg';
import { Option } from '../../types';

export interface ITableHeader {
  id: number;
  label: string;
}

export interface ITableRow {
  id: number;
  name: string;
  curator_id: string;
  order_number: string;
  studentValue: number;
  actions: JSX.Element | undefined | string;
}

interface ITable {
  dataHeader: ITableHeader[];
  dataRow: ITableRow[];
  gridColumns: string;
  filters:ITableFilter[];
}

interface ITableFilter {
  key: string;
  value: Option[];
  placeholder:string;
}

const Table = ({ dataHeader, dataRow, gridColumns, filters }: ITable): JSX.Element => (
  <>
    <div className={styles.filters}>
      {filters.map(({ key, value, placeholder }) => (
        <Select
          key={key}
          // className={styles}
          options={value}
          placeholder={placeholder}
          isClearable
        />
      ))}
    </div>
    <div className={styles.table}>
      <div className={clsx(styles.table__header, gridColumns)}>
        {dataHeader.map((item) => (
          <div className={styles.table__header_item} key={item.id}>{item.label}</div>
        ))}
      </div>
      {dataRow.length ? (
        <>
          {dataRow.map((item) => (
            <div className={clsx(styles.table__body_row, gridColumns)} key={item.id}>
              <div className={styles.body__row_item}>{item.name}</div>
              <div className={styles.body__row_item}>{item.curator_id}</div>
              <div className={styles.body__row_item}>{item.order_number}</div>
              <div className={styles.body__row_item}>{item.studentValue}</div>
              <div className={styles.body__row_item}>{item.actions}</div>
            </div>
          ))}
          <div className={styles.table__footer}>
            <label className={styles.table__footer_label}>
              Рядків на сторінці
            </label>
            <select className={styles.table__footer_select}>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <div className={styles.table__footer_info}>currentPage*itemsPerPage | 1 - itemCount з totalItems</div>
            <div className={styles.table__footer_buttons}>
              <button type="button" className={styles.table__footer_buttonFirst}>
                <img src={first} alt="" />
              </button>
              <button type="button" className={styles.table__footer_buttonPrev}>
                <img src={prev} alt="" />
              </button>
              <button type="button" className={styles.table__footer_buttonNext}>
                <img src={next} alt="" />
              </button>
              <button type="button" className={styles.table__footer_buttonLast}>
                <img src={last} alt="" />
              </button>
            </div>
          </div>
        </>
      ) : <div className={styles.not__found}>Нічого не знайдено</div>}
    </div>

  </>

);

// "meta": {
//   "totalItems": 0,
//     "itemCount": 0,
//     "itemsPerPage": 0,
//     "totalPages": 0,
//     "currentPage": 0
// },

export default Table;
