import React, { useEffect, useState } from 'react';
import TitlePage from '../../components/TitlePage';
import Button from '../../components/common/Button/index';
import styles from './index.module.scss';
import pagesStyle from '../pagesStyle.module.scss';
import Layout from '../../loyout/Layout';
import { ITableHeader } from '../../components/common/table/TableHeader';
import Table from '../../components/common/table';
import { ITableRowItem } from '../../components/common/table/TableBody';
import { initialPagination, Pagination } from '../../types';
import { AdministratorCreateModal } from './Create';
import { AdministratorEditModal } from './Edit';
import { AdministratorDeleteModal } from './Delete';
import { useAdministratorsContext } from '../../context/administators';
import { IGetUserData, IGetUserParams } from '../../hooks/useUser';
import edit from '../../images/table/edit.svg';
import del from '../../images/table/delete.svg';
import SelectAdministrator from '../../components/common/Select/SelectAdministrator';

const dataHeader: ITableHeader[] = [
  { id: 1, label: 'ПІБ' },
  { id: 2, label: 'E-Mail' },
  { id: 3, label: 'Дії' },
];

export interface IIsActiveModalState {
  create: boolean;
  edit: number;
  delete: number;
}

const allCloseModalWindow: IIsActiveModalState = {
  create: false,
  edit: 0,
  delete: 0,
};

interface Filter {
  administrator: string;
}

interface Params {
  filter: Filter;
  pagination: Pagination;
}

const Administrators = (): JSX.Element => {
  const {
    getAdministrators,
    administratorsCreate,
    administratorsDelete,
    administratorsEdit,
  } = useAdministratorsContext();
  const [params, setParams] = useState<Params>({
    filter: { administrator: '' },
    pagination: initialPagination,
  });
  const [isActiveModal, setIsActiveModal] = useState(allCloseModalWindow);
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);

  const closeModal = () => {
    setIsActiveModal(allCloseModalWindow);
  };

  useEffect(() => {
    const query: IGetUserParams = { role: 'admin' };

    if (params.filter.administrator) query.id = +params.filter.administrator;
    if (params.pagination.currentPage) query.page = params.pagination.currentPage;
    if (params.pagination.itemsPerPage) query.limit = params.pagination.itemsPerPage;

    getAdministrators?.getUser(query);
  }, [
    params.filter.administrator,
    params.pagination.currentPage,
    params.pagination.itemsPerPage,
    administratorsCreate?.data,
    administratorsEdit?.data,
    administratorsDelete?.data,
  ]);

  useEffect(() => {
    if (getAdministrators?.data) {
      setParams({ ...params, pagination: getAdministrators.data.meta });
      setDataRow(getAdministrators?.data?.items.map((item: IGetUserData) => ({
        list: [
          { id: 1, label: `${item.lastName} ${item.firstName} ${item.patronymic}` },
          { id: 2, label: item.email },
          {
            id: 3,
            label: (
              <div className={pagesStyle.actions}>
                <Button
                  onClick={() => setIsActiveModal({ ...isActiveModal, edit: item.id })}
                  isImg
                >
                  <img src={edit} alt="edit" />
                </Button>
                <Button
                  onClick={() => setIsActiveModal({ ...isActiveModal, delete: item.id })}
                  isImg
                >
                  <img src={del} alt="delete" />
                </Button>
              </div>
            ),
          },
        ],
        key: item.id,
      })));
    }
  }, [getAdministrators?.data]);

  return (
    <Layout>
      <div>
        <TitlePage
          title="Адміністратори"
          action={(
            <Button
              nameClass="primary"
              size="large"
              onClick={() => setIsActiveModal({ ...isActiveModal, create: true })}
            >
              Створити
            </Button>
          )}
        />

        <Table
          filter={(
            <SelectAdministrator
              type="filter"
              placeholder="ПІБ"
              onChange={(value) => setParams({
                ...params,
                filter: { ...params.filter, administrator: value },
                pagination: initialPagination,
              })}
              value={params.filter.administrator}
              isClearable
              isSearchable
            />
          )}
          dataHeader={dataHeader}
          dataRow={dataRow}
          gridColumns={styles.columns}
          pagination={params.pagination}
          onPaginationChange={(newPagination) => setParams({ ...params, pagination: newPagination })}
        />
        <AdministratorCreateModal modalActive={isActiveModal.create} closeModal={closeModal} />
        <AdministratorEditModal
          modalActive={!!isActiveModal.edit}
          Id={isActiveModal.edit}
          closeModal={closeModal}
        />
        <AdministratorDeleteModal
          modalActive={!!isActiveModal.delete}
          Id={isActiveModal.delete}
          closeModal={closeModal}
        />
      </div>
    </Layout>
  );
};

Administrators.defaultProps = {
  filter: '',
};

export default Administrators;
