import React from 'react';
import styles from './index.module.scss';
import Button from '../Button';
import { Delete, Edit, History } from '../Icon';

interface ITablesActions{
  children: React.ReactChild | React.ReactNode;
}

export const TablesActions = ({ children }:ITablesActions):JSX.Element => (
  <div className={styles.actions}>
    {children}
  </div>
);

interface IGroupButton{
  isActiveModal: Record<string, number | boolean> ;
  setIsActiveModal:(value: Record<string, number | boolean>) => void;
  itemId: number;
}
export const EditAndHistory = ({ isActiveModal, setIsActiveModal, itemId }:IGroupButton):JSX.Element => (
  <TablesActions>
    <Button
      onClick={() => setIsActiveModal({ ...isActiveModal, edit: itemId })}
      isImg
    >
      <Edit />
    </Button>
    <Button
      onClick={() => setIsActiveModal({ ...isActiveModal, history: itemId })}
      isImg
    >
      <History />
    </Button>
  </TablesActions>
);

export const EditAndDelete = ({ isActiveModal, setIsActiveModal, itemId }:IGroupButton):JSX.Element => (
  <TablesActions>
    <Button
      onClick={() => setIsActiveModal({ ...isActiveModal, edit: itemId })}
      isImg
    >
      <Edit />
    </Button>
    <Button
      onClick={() => setIsActiveModal({ ...isActiveModal, delete: itemId })}
      isImg
    >
      <Delete />
    </Button>
  </TablesActions>
);
