import React, { useState } from 'react';
import styles from '../Group/index.module.scss';
import stylesStud from './index.module.scss';
import Layout from '../../loyout/Layout';
import TitlePage from '../../components/TitlePage';
import Button from '../../components/common/Button';
import Table from '../../components/common/table';
import { ITableHeader } from '../../components/common/table/TableHeader';
import StudentsCreateModal from './modal/StudentsCreate';
import { useStudentsContext } from '../../context/students';
import SelectGroup from '../../components/common/SelectGroup';
import SelectPIB from '../../components/common/SelectPIB';
import SelectIsFullTime from '../../components/common/SelectIsFullTime';
import edit from '../../images/table/edit.svg';
import del from '../../images/table/delete.svg';
import { IIsActiveModalState } from '../Group';
import { initialPagination } from '../../types';

const dataHeader: ITableHeader[] = [
  { id: 1, label: 'ПІП студента' },
  { id: 2, label: 'Група' },
  { id: 3, label: 'Номер Наказу' },
  { id: 4, label: 'Форма навчання' },
  { id: 5, label: 'E-Mail' },
  { id: 6, label: 'ЄДЕБО' },
  { id: 7, label: 'Дії' },
];

interface Filter {
  name: string;
  group: string;
  isFullTime: string;
}

const allCloseModalWindow: IIsActiveModalState = {
  create: false,
  edit: 0,
  delete: 0,
};

const Students = (): JSX.Element => {
  const { getStudents } = useStudentsContext();

  const [modalActive, setModalActive] = useState(false);
  const [filter, setFilter] = useState<Filter>({ name: '', group: '', isFullTime: '' });
  const closeModal = () => {
    setModalActive(false);
  };

  const [isActiveModal, setIsActiveModal] = useState(allCloseModalWindow);

  return (
    <Layout>
      <div className={styles.group}>
        <TitlePage
          title="Студенти"
          action={(
            <Button
              nameClass="primary"
              size="large"
              className={styles.actions}
              onClick={() => setModalActive(true)}
            >
              Створити
            </Button>
          )}
        />
        <Table
          filter={(
            <>
              <SelectGroup
                type="filter"
                placeholder="Група"
                value={filter.group}
                onChange={(value) => setFilter({ ...filter, group: value })}
                isClearable
                isSearchable
              />
              <SelectPIB
                type="filter"
                placeholder="ПІБ"
                value={filter.name}
                onChange={(value) => setFilter({ ...filter, name: value })}
              />
              <SelectIsFullTime
                type="filter"
                placeholder="Форма навчання"
                value={filter.isFullTime}
                onChange={(value) => setFilter({ ...filter, isFullTime: value })}
              />
            </>
          )}
          dataHeader={dataHeader}
          dataRow={getStudents?.dataStudents?.items.length ? getStudents?.dataStudents?.items.map((item, id) => ({
            list: [
              { id, label: `${item.user.lastName} ${item.user.firstName}` },
              { id, label: item.group.name },
              { id, label: item.orderNumber },
              { id, label: item.isFullTime ? 'Денна' : 'Заочна' },
              { id, label: item.user.email },
              { id, label: item.user.firstName },
              {
                id,
                label: (
                  <div className={styles.actions}>
                    <button
                      type="button"
                      className={styles.actions__button_edit}
                      onClick={() => {
                        setIsActiveModal({ ...isActiveModal, edit: item.id });
                      }}
                    >
                      <img src={edit} alt="edit" />
                    </button>
                    <button
                      type="button"
                      className={styles.actions__button_delete}
                      onClick={() => {
                        setIsActiveModal({ ...isActiveModal, delete: item.id });
                      }}
                    >
                      <img src={del} alt="delete" />
                    </button>
                  </div>
                ),
              },
            ],
            key: item.id,
          })) : []}
          gridColumns={stylesStud.columns}
          pagination={initialPagination}
          onPaginationChange={() => undefined}
        />
        <StudentsCreateModal closeModal={closeModal} modalActive={modalActive} />
      </div>
    </Layout>
  );
};

export default Students;
