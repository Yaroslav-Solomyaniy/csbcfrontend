import React from 'react';
import styles from './index.module.scss';
import Button from '../Button';
import { Approve, Delete, Download, Edit, History, Review } from '../Icons';

interface ITablesActions {
  children: React.ReactChild | React.ReactNode;
}

export const TablesActions = ({ children }: ITablesActions): JSX.Element => (
  <div className={styles.actions}>
    {children}
  </div>
);

interface IButtons {
  isActiveModal: Record<string, number | boolean | string>;
  setIsActiveModal: (value: Record<string, number | boolean>) => void;
  itemId: number;
}

export const EditDeleteReviewApprove = ({ isActiveModal, setIsActiveModal, itemId }: IButtons): JSX.Element => (
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
    <Button
      onClick={() => setIsActiveModal({ ...isActiveModal, result: itemId })}
      isImg
    >
      <Review />
    </Button>
    <Button
      onClick={() => setIsActiveModal({ ...isActiveModal, approve: itemId })}
      isImg
    >
      <Approve />
    </Button>
  </TablesActions>
);

export const EditReviewDelete = ({ isActiveModal, setIsActiveModal, itemId }: IButtons): JSX.Element => (
  <TablesActions>
    <Button
      onClick={() => setIsActiveModal({ ...isActiveModal, edit: itemId })}
      isImg
    >
      <Edit />
    </Button>
    <Button
      onClick={() => setIsActiveModal({ ...isActiveModal, review: itemId })}
      isImg
    >
      <Review />
    </Button>
    <Button
      onClick={() => setIsActiveModal({ ...isActiveModal, delete: itemId })}
      isImg
    >
      <Delete />
    </Button>
  </TablesActions>
);

export const EditAndHistory = ({ isActiveModal, setIsActiveModal, itemId }: IButtons): JSX.Element => (
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

export const EditAndDelete = ({ isActiveModal, setIsActiveModal, itemId }: IButtons): JSX.Element => (
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

export const EditHistoryDownload = ({ isActiveModal, setIsActiveModal, itemId }: IButtons): JSX.Element => (
  <TablesActions>
    <Button
      onClick={() => setIsActiveModal({ ...isActiveModal, edit: isActiveModal.gradeEdit ? itemId : 0 })}
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
    <Button
      onClick={() => setIsActiveModal({ ...isActiveModal, download: itemId })}
      isImg
    >
      <Download />
    </Button>
  </TablesActions>
);
