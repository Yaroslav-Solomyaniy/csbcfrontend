import React from 'react';
import styles from './index.module.scss';
import Button from '../Button';
import { Approve, Delete, Download, Edit, History, Listic, Review } from '../Icons';

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

interface IEditDeleteReviewApprove {
  isActiveModal: Record<string, number | boolean>;
  setIsActiveModal: (value: Record<string, number | boolean>) => void;
  itemId: number;
  status: string;
}

export const EditDeleteReviewApprove = ({
  isActiveModal,
  setIsActiveModal,
  itemId,
  status,
}: IEditDeleteReviewApprove): JSX.Element => (
  <TablesActions>
    <Button
      disabled={status === 'Потребує перегляду' || status === 'Затвердженно'}
      onClick={() => setIsActiveModal((status === 'Переголосування у прогресі' || status === 'Заплановане переголосування')
        ? { ...isActiveModal, revote: itemId } : { ...isActiveModal, edit: itemId })}
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
      disabled={status !== 'Потребує перегляду'}
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

export const ListicHistoryDownload = ({ isActiveModal, setIsActiveModal, itemId }: IButtons): JSX.Element => (
  <TablesActions>
    <Button
      onClick={() => setIsActiveModal({ ...isActiveModal, info: itemId })}
      isImg
    >
      <Listic />
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
