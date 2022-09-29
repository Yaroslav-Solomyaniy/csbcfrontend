import React, { useEffect, useState } from 'react';
import TitlePage from '../../../components/TitlePage';
import Button from '../../../components/common/Button';
import styles from './index.module.scss';
import pagesStyle from '../../pagesStyle.module.scss';
import Layout from '../../../loyout/Layout';
import { ITableHeader } from '../../../components/common/table/TableHeader';
import { ITableRowItem } from '../../../components/common/table/TableBody';
import { initialPagination, Pagination } from '../../../types';
import CuratorCreateModal from './Modal/Create';
import { useCuratorContext } from '../../../context/curators';
import { IGetCuratorData, IGetCuratorParams } from '../../../hooks/useCurators';
import CuratorEditModal from './Modal/Edit';
import CuratorDeleteModal from './Modal/Delete';
import { useDeviceContext } from '../../../context/TypeDevice';
import { useQueryParam } from '../../../hooks/useUrlParams';
import { EditAndDelete } from '../../../components/common/GroupButtons';
import DesktopTable from '../../../components/common/table/DesktopTable';
import TableFilter from '../../../components/common/table/TableFilter';
import CuratorsFilters from './Components/CuratorsFilters';
import PhoneFilter from '../../../components/common/PhoneFilter';
import MobileElementListCurators from './Components/MobileElementListCurators';

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
  const [isActiveModal, setIsActiveModal] = useState(allCloseModalWindow);
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);
  const [data, setData] = useState<IGetCuratorData[]>();
  const [pagination, setPagination] = useState<Pagination>({ ...initialPagination });

  const { getCurators, curatorCreate, curatorDelete, curatorEdit } = useCuratorContext();
  const { isDesktop, isPhone, isTablet } = useDeviceContext();
  const { get } = useQueryParam();

  const groupName = get('groupName');
  const curatorId = Number(get('curatorId')) || 0;
  const currentPage = Number(get('currentPage')) || 1;
  const itemsPerPage = Number(get('itemsPerPage')) || 10;

  const closeModal = () => {
    setIsActiveModal(allCloseModalWindow);
  };

  useEffect(() => {
    const query: IGetCuratorParams = {};

    if (curatorId) query.curatorId = curatorId;
    if (groupName) query.groupName = groupName;
    if (currentPage) query.page = currentPage;
    if (itemsPerPage) query.limit = itemsPerPage;

    getCurators?.getCurators(query);
  }, [groupName, curatorId, currentPage, itemsPerPage, curatorCreate?.data, curatorEdit?.data, curatorDelete?.data]);

  useEffect(() => {
    if (getCurators?.data) {
      setPagination(getCurators.data.meta);
      setData(getCurators.data.items);
      setDataRow(getCurators?.data?.items.map((item: IGetCuratorData) => ({
        list: [
          { id: 1, label: `${item.lastName} ${item.firstName} ${item.patronymic}` },
          { id: 2, label: item.groups.map((group) => (group.name)).join(', ') },
          { id: 3, label: item.email },
          {
            id: 4,
            label: <EditAndDelete isActiveModal={isActiveModal} setIsActiveModal={setIsActiveModal} itemId={item.id} />,
          },
        ],
        key: item.id,
      })));
    }
  }, [getCurators?.data]);

  return (
    <Layout>
      <div>
        {isDesktop && (
          <>
            <TitlePage
              title="Куратори"
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
              filter={(<CuratorsFilters curatorId={curatorId} groupName={groupName} />)}
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
              title="Куратори"
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
            {isTablet && (<TableFilter filter={<CuratorsFilters curatorId={curatorId} groupName={groupName} />} />)}
            <MobileElementListCurators
              data={data}
              isActiveModal={isActiveModal}
              setIsActiveModal={setIsActiveModal}
            />
          </>
        )}

        <PhoneFilter closeModal={closeModal} isActive={!!isActiveModal.filter}>
          <CuratorsFilters groupName={groupName} curatorId={curatorId} />
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
      </div>
    </Layout>
  );
};

Curators.defaultProps = {
  filter: '',
};

export default Curators;
