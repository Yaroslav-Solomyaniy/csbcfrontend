import React, { useEffect, useState } from 'react';
import TitlePage from '../../../components/common/TitlePage';
import Button from '../../../components/common/Button';
import styles from './index.module.scss';
import pagesStyle from '../../pagesStyle.module.scss';
import Layout from '../../../loyout/Layout';
import { ITableHeader } from '../../../components/common/Table/TypeDisplay/Desktop/TableHeader';
import { ITableRowItem } from '../../../components/common/Table/TypeDisplay/Desktop/TableBody';
import { initialPagination, Pagination } from '../../../types';
import { AdministratorCreateModal } from './ModalWindow/Create';
import { AdministratorEditModal } from './ModalWindow/Edit';
import { AdministratorDeleteModal } from './ModalWindow/Delete';
import { AdministratorsContext } from '../../../context/PagesInAdmin/Administators';
import { IGetUserData, IGetUserParams } from '../../../hooks/All/useUser';
import { useQueryParam } from '../../../hooks/All/useQueryParams';
import { DeviceContext } from '../../../context/All/DeviceType';
import PhoneFilter from '../../../components/common/PhoneFilter';
import AdministratorsFilters from './Filters';
import { EditAndDelete } from '../../../components/common/CollectionMiniButtons';
import Table from '../../../components/common/Table';

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
  const [isActiveModal, setIsActiveModal] = useState<Record<string, number | boolean>>(allCloseModalWindow);
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ ...initialPagination });

  const { get } = useQueryParam();
  const { getAdministrators,
    administratorsCreate,
    administratorsDelete,
    administratorsEdit,
  } = AdministratorsContext();

  const { isPhone } = DeviceContext();

  const adminId = Number(get('adminId'));
  const currentPage = Number(get('currentPage')) || 1;
  const itemsPerPage = Number(get('itemsPerPage')) || 10;

  const closeModal = () => {
    setIsActiveModal(allCloseModalWindow);
  };

  useEffect(() => {
    const query: IGetUserParams = { role: 'admin' };

    if (adminId) query.id = adminId;
    if (currentPage) query.page = currentPage;
    if (itemsPerPage) query.limit = itemsPerPage;

    getAdministrators?.getUser(query);
  }, [
    adminId,
    currentPage,
    itemsPerPage,
    administratorsCreate?.data,
    administratorsEdit?.data,
    administratorsDelete?.data,
  ]);

  useEffect(() => {
    if (getAdministrators?.data) {
      setPagination(getAdministrators.data.meta);
      setDataRow(getAdministrators?.data?.items.map((item: IGetUserData) => ({
        list: [
          { id: 1, label: `${item.lastName} ${item.firstName} ${item.patronymic}` },
          { id: 2, label: item.email },
          {
            id: 3,
            label: <EditAndDelete
              isActiveModal={isActiveModal}
              setIsActiveModal={setIsActiveModal}
              itemId={item.id}
            /> },
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
        <Table
          filter={(<AdministratorsFilters adminId={adminId} />)}
          dataHeader={dataHeader}
          dataRow={dataRow}
          gridColumns={styles.columns}
          totalItems={pagination.totalItems}
        />
        <PhoneFilter modalTitle="Фільтрація адміністраторів" isActive={!!isActiveModal.filter} closeModal={closeModal}>
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
      </div>
    </Layout>
  );
};

export default Administrators;