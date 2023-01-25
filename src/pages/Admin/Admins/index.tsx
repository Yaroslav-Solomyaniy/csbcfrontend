import React, { useEffect, useState } from 'react';
import TitlePage from '../../../components/common/TitlePage';
import Button from '../../../components/common/Button';
import styles from './index.module.scss';
import pagesStyle from '../../pagesStyle.module.scss';
import Layout from '../../../loyout/Layout';
import { ITableHeader } from '../../../components/common/Table/TypeDisplay/Desktop/TableHeader';
import { ITableRowItem } from '../../../components/common/Table/TypeDisplay/Desktop/TableBody';
import { initialPagination, IPagination } from '../../../types';
import { AdministratorCreateModal } from './ModalWindow/Create';
import { AdministratorEditModal } from './ModalWindow/Edit';
import { AdministratorDeleteModal } from './ModalWindow/Delete';
import { AdministratorsContext } from '../../../context/Pages/admin/Administators';
import { AddQueryParams, useQueryParam } from '../../../hooks/hooks/useQueryParams';
import { DeviceContext } from '../../../context/All/DeviceType';
import PhoneFilter from '../../../components/common/PhoneFilter';
import AdministratorsFilters from './Filters';
import { EditAndDelete } from '../../../components/common/CollectionMiniButtons';
import Table from '../../../components/common/Table';
import Preloader from '../../../components/common/Preloader/Preloader';
import { IGetUserData } from '../../../hooks/api/user/useGet';
import useCheckPage from '../../../hooks/hooks/useCheckPage';

const dataHeader: ITableHeader[] = [
  { id: 1, label: 'ПІБ' },
  { id: 2, label: 'E-Mail' },
  { id: 3, label: 'Дії' },
];

const allCloseModalWindow:Record<string, number | boolean> = {
  create: false,
  filter: false,
  edit: 0,
  delete: 0,
};

const Administrators = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isActiveModal, setIsActiveModal] = useState<Record<string, number | boolean>>(allCloseModalWindow);
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);
  const [pagination, setPagination] = useState<IPagination>({ ...initialPagination });
  const { get } = useQueryParam();
  const { getAdmins, deleteAdmin, editAdmin, createAdmin } = AdministratorsContext();
  const { isPhone } = DeviceContext();

  const adminId = Number(get('adminId'));
  const currentPage = Number(get('currentPage')) || 1;
  const itemsPerPage = Number(get('itemsPerPage')) || 10;

  useCheckPage({ pagination, currentPage });

  const closeModal = () => {
    setIsActiveModal(allCloseModalWindow);
  };

  useEffect(() => {
    getAdmins?.getUser(
      AddQueryParams({ id: adminId, page: currentPage, limit: itemsPerPage, role: 'admin' }),
    );
  }, [adminId, currentPage, itemsPerPage, createAdmin?.data, editAdmin?.data, deleteAdmin?.data]);

  useEffect(() => {
    if (getAdmins?.data) {
      setPagination(getAdmins.data.meta);
      setDataRow(getAdmins?.data?.items.map((item: IGetUserData) => ({
        list: [
          { id: 1, label: `${item.lastName} ${item.firstName} ${item.patronymic}` || 'Невідомі дані' },
          { id: 2, label: item.email || 'Електронна адреса не відома' },
          { id: 3,
            label: <EditAndDelete
              isActiveModal={isActiveModal}
              setIsActiveModal={setIsActiveModal}
              itemId={item.id}
            /> },
        ],
        key: item.id,
      })));
    }
    setIsLoading(false);
  }, [getAdmins?.data]);

  return (
    <Layout>
      <TitlePage
        title="Адміністратори"
        {...isPhone && ({ setIsActiveModal })}
        {...isPhone && ({ isActiveModal: !!isActiveModal.filter })}
        action={(
          <Button
            nameClass="primary"
            className={pagesStyle.buttonsCreate}
            size="large"
            onClick={() => setIsActiveModal({ ...isActiveModal, create: true })}
          >
            Створити
          </Button>
        )}
      />
      {isLoading ? <Preloader /> : (
        <>
          <Table
            filter={(<AdministratorsFilters adminId={adminId} />)}
            dataHeader={dataHeader}
            dataRow={dataRow}
            gridColumns={styles.columns}
            totalItems={pagination.totalItems}
          />
          <PhoneFilter
            modalTitle="Фільтрація адміністраторів"
            isActive={!!isActiveModal.filter}
            closeModal={closeModal}
          >
            <AdministratorsFilters adminId={adminId} />
          </PhoneFilter>
          <AdministratorCreateModal modalActive={!!isActiveModal.create} closeModal={closeModal} />
          <AdministratorEditModal
            modalActive={!!isActiveModal.edit}
            studentId={+isActiveModal.edit}
            closeModal={closeModal}
          />
          <AdministratorDeleteModal
            modalActive={!!isActiveModal.delete}
            Id={+isActiveModal.delete}
            closeModal={closeModal}
          />
        </>
      ) }
    </Layout>
  );
};

export default Administrators;
