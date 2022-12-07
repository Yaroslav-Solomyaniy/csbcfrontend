import React, { useEffect, useState } from 'react';
import TitlePage from '../../../components/common/TitlePage';
import Button from '../../../components/common/Button';
import styles from './index.module.scss';
import pagesStyle from '../../pagesStyle.module.scss';
import Layout from '../../../loyout/Layout';
import { ITableHeader } from '../../../components/common/Table/TypeDisplay/Desktop/TableHeader';
import { ITableRowItem } from '../../../components/common/Table/TypeDisplay/Desktop/TableBody';
import { initialPagination, IPagination } from '../../../types';
import { CuratorCreateModal } from './Modal/Create';
import { CuratorContext } from '../../../context/Pages/admin/Curators';
import { IGetCuratorData } from '../../../hooks/api/admin/curators/useGet';
import CuratorEditModal from './Modal/Edit';
import CuratorDeleteModal from './Modal/Delete';
import { DeviceContext } from '../../../context/All/DeviceType';
import { AddQueryParams, useQueryParam } from '../../../hooks/hooks/useQueryParams';
import { EditAndDelete } from '../../../components/common/CollectionMiniButtons';
import Filters from './Filters';
import PhoneFilter from '../../../components/common/PhoneFilter';
import Table from '../../../components/common/Table';
import Preloader from '../../../components/common/Preloader/Preloader';
import useCheckPage from '../../../hooks/hooks/useCheckPage';

const dataHeader: ITableHeader[] = [
  { id: 1, label: 'ПІБ' },
  { id: 2, label: 'Групи' },
  { id: 3, label: 'E-Mail' },
  { id: 4, label: 'Дії' },
];

const allCloseModalWindow: Record<string, number | boolean> = {
  create: false,
  filter: false,
  edit: 0,
  delete: 0,
};

const Curators = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isActiveModal, setIsActiveModal] = useState(allCloseModalWindow);
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);
  const [pagination, setPagination] = useState<IPagination>({ ...initialPagination });

  const { getCurators, createCurator, editCurator, deleteCurator } = CuratorContext();
  const { isPhone } = DeviceContext();
  const { get } = useQueryParam();

  const groupName = get('groupName') || '';
  const curatorId = Number(get('curatorId')) || 0;
  const currentPage = Number(get('currentPage')) || 1;
  const itemsPerPage = Number(get('itemsPerPage')) || 10;

  const closeModal = () => setIsActiveModal(allCloseModalWindow);

  useCheckPage({ pagination, currentPage });

  useEffect(() => {
    getCurators?.getCurators(
      AddQueryParams({ curatorId, groupName: groupName.toString(), page: currentPage, limit: itemsPerPage }),
    );
  }, [groupName, curatorId, currentPage, itemsPerPage, createCurator?.data, editCurator?.data, deleteCurator?.data]);

  useEffect(() => {
    if (getCurators?.data) {
      setPagination(getCurators.data.meta);
      setDataRow(getCurators?.data?.items.map((item: IGetCuratorData) => ({
        list: [
          { id: 1, label: `${item.lastName} ${item.firstName} ${item.patronymic}` || 'Дані відсутні' },
          { id: 2, label: item.groups ? item.groups.map((group) => (group.name)).join(', ') : 'Групи відсутні' },
          { id: 3, label: item.email || 'Електронна адреса відсутня' },
          {
            id: 4,
            label: <EditAndDelete isActiveModal={isActiveModal} setIsActiveModal={setIsActiveModal} itemId={item.id} />,
          },
        ],
        key: item.id,
      })));
      setIsLoading(false);
    }
  }, [getCurators?.data]);

  return (
    <Layout>
      <TitlePage
        title="Куратори"
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
            filter={(<Filters curatorId={curatorId} groupName={groupName} />)}
            dataHeader={dataHeader}
            dataRow={dataRow}
            gridColumns={styles.columns}
            totalItems={pagination.totalItems}
          />
          <PhoneFilter modalTitle="Фільтрація кураторів" closeModal={closeModal} isActive={!!isActiveModal.filter}>
            <Filters groupName={groupName} curatorId={curatorId} />
          </PhoneFilter>

          <CuratorCreateModal
            modalActive={!!isActiveModal.create}
            closeModal={closeModal}
          />
          <CuratorEditModal
            modalActive={!!isActiveModal.edit}
            studentId={isActiveModal.edit as number}
            closeModal={closeModal}
          />
          <CuratorDeleteModal
            modalActive={!!isActiveModal.delete}
            Id={isActiveModal.delete as number}
            closeModal={closeModal}
          />
        </>
      )}
    </Layout>
  );
};

export default Curators;
