import React, { useEffect, useState } from 'react';
import { ITableHeader } from '../../../components/common/Table/TypeDisplay/Desktop/TableHeader';
import { ITableRowItem } from '../../../components/common/Table/TypeDisplay/Desktop/TableBody';
import { TeachersContext } from '../../../context/PagesInAdmin/Teachers';
import { IGetTeacherData, IGetTeacherParams } from '../../../hooks/PagesInAdmin/useTeachers';
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
import { useQueryParam } from '../../../hooks/All/useQueryParams';
import { DeviceContext } from '../../../context/All/DeviceType';
import { EditAndDelete } from '../../../components/common/CollectionMiniButtons';
import { initialPagination, Pagination } from '../../../types';

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
  const { teachersGet, teacherCreate, teacherEdit, teacherDelete } = TeachersContext();
  const [isActiveModal, setIsActiveModal] = useState<Record<string, number | boolean>>(allCloseModalWindow);
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ ...initialPagination });

  const { isPhone } = DeviceContext();
  const { get } = useQueryParam();

  const teacherId = Number(get('teacherId'));
  const groupId = Number(get('groupId'));
  const courseId = Number(get('courseId'));
  const currentPage = Number(get('currentPage')) || 1;
  const itemsPerPage = Number(get('itemsPerPage')) || 10;

  const closeModal = () => {
    setIsActiveModal(allCloseModalWindow);
  };

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
          { id: 1, label: `${item.lastName} ${item.firstName} ${item.patronymic}` },
          { id: 2, label: arr.subject },
          { id: 3, label: arr.group },
          { id: 4, label: item.email },
          {
            id: 5,
            label: <EditAndDelete isActiveModal={isActiveModal} setIsActiveModal={setIsActiveModal} itemId={item.id} />,
          },
        ],
        key: item.id,
      };
    }) : []);

  useEffect(() => {
    const query: IGetTeacherParams = {};

    if (teacherId) query.teacherId = teacherId;
    if (groupId) query.groups = groupId;
    if (courseId) query.courses = courseId;
    if (currentPage) query.page = currentPage;
    if (itemsPerPage) query.limit = itemsPerPage;

    teachersGet?.getTeacher(query);
  }, [teacherId, groupId, courseId, currentPage,
    itemsPerPage, teacherCreate?.data, teacherEdit?.data, teacherDelete?.data]);

  useEffect(() => {
    if (teachersGet?.data) {
      setPagination(teachersGet.data.meta);
      setDataRow(tableRows(teachersGet.data ? teachersGet.data.items : []));
    }
  }, [
    teacherCreate?.data,
    teachersGet?.data,
    teacherEdit?.data,
    teacherDelete?.data,
  ]);

  return (
    <Layout>
      <div>
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
        <Table
          filter={(
            <TeachersFilters teacherId={teacherId} groupId={groupId} courseId={courseId} />
          )}
          dataHeader={dataHeader}
          gridColumns={styles.columns}
          dataRow={dataRow}
          totalItems={pagination.totalItems}
        />
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
      </div>
    </Layout>
  );
};

export default Teachers;
