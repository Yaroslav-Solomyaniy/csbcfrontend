import React, { useEffect, useState } from 'react';
import { ITableHeader } from '../../../components/common/Table/TypeDisplay/Desktop/TableHeader';
import { ITableRowItem } from '../../../components/common/Table/TypeDisplay/Desktop/TableBody';
import { TeachersContext } from '../../../context/PagesInAdmin/Teachers';
import { IGetTeacherData } from '../../../hooks/PagesInAdmin/useTeachers';
import Layout from '../../../loyout/Layout';
import Button from '../../../components/common/Button';
import TitlePage from '../../../components/common/TitlePage';
import Table from '../../../components/common/Table';
import styles from './index.module.scss';
import pagesStyle from '../../pagesStyle.module.scss';
import TeachersDeleteModal from './modal/TeachersDelete';
import TeacherCreateModal from './modal/TeachersCreate';
import TeacherEditModal from './modal/TeachersEdit';
import TeachersFilters from './Filters';
import { AddQueryParams, useQueryParam } from '../../../hooks/All/useQueryParams';
import { DeviceContext } from '../../../context/All/DeviceType';
import { EditAndDelete } from '../../../components/common/CollectionMiniButtons';
import { initialPagination, Pagination } from '../../../types';
import Preloader from '../../../components/common/Preloader/Preloader';
import PhoneFilter from '../../../components/common/PhoneFilter';

const dataHeader: ITableHeader[] = [
  { id: 1, label: 'ПІБ' },
  { id: 2, label: 'Предмет' },
  { id: 3, label: 'Група' },
  { id: 4, label: 'E-Mail' },
  { id: 5, label: 'Дії' },
];

const allCloseModalWindow: Record<string, number | boolean> = {
  create: false,
  filter: false,
  edit: 0,
  delete: 0,
};

const Teachers = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { teachersGet, teacherCreate, teacherEdit, teacherDelete } = TeachersContext();
  const [isActiveModal, setIsActiveModal] = useState<Record<string, number | boolean>>(allCloseModalWindow);
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ ...initialPagination });

  const { isPhone } = DeviceContext();
  const { get, post } = useQueryParam();

  useEffect(() => {
    if (currentPage > pagination.totalPages) {
      post({ currentPage: pagination.totalPages });
    }
  }, [pagination]);

  const teacherId = Number(get('teacherId'));
  const groupId = Number(get('groupId'));
  const courseId = Number(get('courseId'));
  const currentPage = Number(get('currentPage')) || 1;
  const itemsPerPage = Number(get('itemsPerPage')) || 10;

  const closeModal = () => {
    setIsActiveModal(allCloseModalWindow);
  };

  useEffect(() => {
    teachersGet?.getTeacher(
      AddQueryParams({ teacherId, groups: groupId, courses: courseId, page: currentPage, limit: itemsPerPage }),
    );
  }, [teacherId, groupId, courseId, currentPage,
    itemsPerPage, teacherCreate?.data, teacherEdit?.data, teacherDelete?.data]);

  useEffect(() => {
    if (teachersGet?.data) {
      setIsLoading(false);
      setPagination(teachersGet.data.meta);
      setDataRow(tableRows(teachersGet.data ? teachersGet.data.items : []));
    }
  }, [teacherCreate?.data, teachersGet?.data, teacherEdit?.data, teacherDelete?.data]);

  const tableRows = (arrTableRows: IGetTeacherData[]) => (
    arrTableRows.length ? arrTableRows.map((item) => {
      const arr: { subject: string[]; group: string[]; } = { subject: [], group: [] };

      item.courses.forEach((subject) => {
        arr.subject.push(subject.name);

        let srt = '';

        subject.groups.forEach((group) => {
          srt += `${group.name}, `;
        });
        arr.group.push(srt.slice(0, -2));
      });

      return {
        list: [
          { id: 1, label: `${item.lastName} ${item.firstName} ${item.patronymic}` || 'Дані відсутні' },
          { id: 2, label: arr.subject.length ? arr.subject : 'Предмети відсутні' },
          { id: 3, label: arr.group.length ? arr.group : 'Групи відсутні' },
          { id: 4, label: item.email || 'Електронна адреса відсутня' },
          {
            id: 5,
            label: <EditAndDelete isActiveModal={isActiveModal} setIsActiveModal={setIsActiveModal} itemId={item.id} />,
          },
        ],
        key: item.id,
      };
    }) : []);

  return (
    <Layout>
      <TitlePage
        title="Викладачі"
        {...isPhone && ({ setIsActiveModal })}
        {...isPhone && ({ isActiveModal: !!isActiveModal.filter })}
        action={(
          <Button
            nameClass="primary"
            size="large"
            className={pagesStyle.buttonsCreate}
            onClick={() => {
              setIsActiveModal({ ...allCloseModalWindow, create: true });
            }}
          >
            Створити
          </Button>
          )}
      />
      {isLoading ? <Preloader /> : (
        <>
          <Table
            filter={(<TeachersFilters teacherId={teacherId} groupId={groupId} courseId={courseId} />)}
            dataHeader={dataHeader}
            gridColumns={styles.columns}
            dataRow={dataRow}
            totalItems={pagination.totalItems}
          />
          <PhoneFilter modalTitle="Фільтрація викладачів" isActive={!!isActiveModal.filter} closeModal={closeModal}>
            <TeachersFilters teacherId={teacherId} groupId={groupId} courseId={courseId} />
          </PhoneFilter>
          <TeacherCreateModal
            modalActive={!!isActiveModal.create}
            closeModal={closeModal}
          />
          <TeacherEditModal
            modalActive={!!isActiveModal.edit}
            closeModal={closeModal}
            studentId={isActiveModal.edit as number}
          />
          <TeachersDeleteModal
            modalActive={!!isActiveModal.delete}
            closeModal={closeModal}
            Id={isActiveModal.delete as number}
          />
        </>
      )}
    </Layout>
  );
};

export default Teachers;
