import React, { Dispatch, SetStateAction } from 'react';
import styles from '../index.module.scss';
import del from '../../../images/table/delete.svg';
import { IIsActiveModalState } from '../index';

interface IColumnAction {
  isActive: IIsActiveModalState;
  setIsActive: Dispatch<SetStateAction<IIsActiveModalState>>;
  groupId: number;
}

const ColumnAction = ({ isActive, setIsActive, groupId }: IColumnAction): JSX.Element => (
  <div className={styles.actions}>
    {/* <button */}
    {/*  type="button" */}
    {/*  className={styles.actions__button_edit} */}
    {/*  onClick={() => { */}
    {/*    setIsActive({ ...isActive, edit: groupId }); */}
    {/*  }} */}
    {/* > */}
    {/*  <img src={edit} alt="edit" /> */}
    {/* </button> */}
    <button
      type="button"
      className={styles.actions__button_delete}
      onClick={() => {
        setIsActive({ ...isActive, delete: groupId });
      }}
    >
      <img src={del} alt="delete" />
    </button>
  </div>
);

export default ColumnAction;
