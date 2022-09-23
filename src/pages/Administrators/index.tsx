import React, { useEffect, useState } from 'react';
import TitlePage from '../../components/TitlePage';
import Button from '../../components/common/Button/index';
import styles from './index.module.scss';
import pagesStyle from '../pagesStyle.module.scss';
import Layout from '../../loyout/Layout';
import { ITableHeader } from '../../components/common/table/TableHeader';
import { ITableRowItem } from '../../components/common/table/TableBody';
import { initialPagination, Pagination } from '../../types';
import { AdministratorCreateModal } from './ModalWindow/Create';
import { AdministratorEditModal } from './ModalWindow/Edit';
import { AdministratorDeleteModal } from './ModalWindow/Delete';
import { useAdministratorsContext } from '../../context/administators';
import { IGetUserData, IGetUserParams } from '../../hooks/useUser';
import { Delete, Edit } from '../../components/common/Icon';
import DesktopTable from '../../components/common/table/DesktopTable';
import TableFilter from '../../components/common/table/TableFilter';
import { useQueryParam } from '../../hooks/useUrlParams';
import { useDeviceContext } from '../../context/TypeDevice';
import MobileElementListAdministrators from './Components/MobileElementListAdministrators';
import PhoneFilter from '../../components/common/PhoneFilter';
import AdministratorsFilters from './Components/AdministratorsFilters';

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
  const [isActiveModal, setIsActiveModal] = useState(allCloseModalWindow);
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ ...initialPagination });
  const [data, setData] = useState<IGetUserData[]>();

  const { isDesktop, isPhone, isTablet } = useDeviceContext();
  const { get } = useQueryParam();
  const { getAdministrators,
    administratorsCreate,
    administratorsDelete,
    administratorsEdit,
  } = useAdministratorsContext();

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
            label: (
              <div className={pagesStyle.actions}>
                <Button
                  onClick={() => setIsActiveModal({ ...isActiveModal, edit: item.id })}
                  isImg
                >
                  <Edit />
                </Button>
                <Button
                  onClick={() => setIsActiveModal({ ...isActiveModal, delete: item.id })}
                  isImg
                >
                  <Delete />
                </Button>
              </div>
            ),
          },
        ],
        key: item.id,
      })));
      setData(getAdministrators.data.items);
    }
  }, [getAdministrators?.data]);

  return (
    <Layout>
      <div>
        {isDesktop && (
          <>
            <TitlePage
              title="Адміністратори"
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
            <DesktopTable
              filter={(<AdministratorsFilters adminId={adminId} />)}
              dataHeader={dataHeader}
              dataRow={dataRow}
              className={styles.columns}
              totalItems={pagination.totalItems}
            />
          </>
        )}
        {(isTablet || isPhone) && (
          <>
            <TitlePage
              title="Адміністратори"
              {...isPhone && ({ setIsActiveModal })}
              {...isPhone && ({ isActiveModal: !!isActiveModal.filter })}
              action={(
                <Button
                  nameClass="primary"
                  className={pagesStyle.buttonsCreate}
                  size="large"
                  onClick={() => setIsActiveModal({ create: true })}
                >
                  Створити
                </Button>
              )}
            />
            {isTablet && (<TableFilter filter={<AdministratorsFilters adminId={adminId} />} />)}
            <MobileElementListAdministrators
              data={data}
              isActiveModal={isActiveModal}
              setIsActiveModal={setIsActiveModal}
            />
          </>
        )}
        <PhoneFilter isActive={!!isActiveModal.filter} closeModal={closeModal}>
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

Administrators.defaultProps = {
  filter: '',
};

export default Administrators;
