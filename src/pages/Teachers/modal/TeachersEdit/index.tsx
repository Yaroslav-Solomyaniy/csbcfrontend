import React, { useEffect, useState } from 'react';
import ModalWindow from '../../../../components/common/ModalWindow';
import ModalControlButtons from '../../../../components/common/ModalControlButtons';
import styles from '../index.module.scss';
import Input from '../../../../components/common/Input';
import { useTeachersContext } from '../../../../context/teachers';
import { ITeacher } from '../../../../hooks/useTeachers';
import MultiSelectCourses from '../../../../components/common/MultiSelect/MultiSelectCourses';

interface IStudentsDeleteModal {
  modalActive: boolean;
  closeModal: () => void;
  id: number;
}

const formInitialData: ITeacher = {
  firstName: '',
  lastName: '',
  patronymic: '',
  email: '',
  courses: [],
};

export const StudentsEditModal = ({ modalActive, closeModal, id }: IStudentsDeleteModal): JSX.Element => {
  const { patchTeacher, getTeacher } = useTeachersContext();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<ITeacher>(formInitialData);

  const handleClose = () => {
    setIsSubmitted(false);
    setFormData(formInitialData);
    getTeacher?.getTeacher({ groups: [], courses: [] });
    closeModal();
  };

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    setIsSubmitted(true);
    patchTeacher?.patchTeacher(formData, id);
    setFormData(formInitialData);
    handleClose();
  };

  useEffect(() => {
    if (id) getTeacher?.getTeacher({ teacherId: id, groups: [], courses: [] });
  }, [id]);

  useEffect(() => {
    if (getTeacher?.data && id !== 0) {
      setFormData({
        firstName: getTeacher?.data?.items[0].firstName,
        lastName: getTeacher?.data?.items[0].lastName,
        patronymic: getTeacher?.data?.items[0].patronymic,
        email: getTeacher?.data?.items[0].email,
        courses: getTeacher?.data?.items[0].courses.map((course) => course.id) || [],
      });
    }
  }, [getTeacher?.data]);

  return (
    <ModalWindow modalTitle="Редагуваня викладача" active={modalActive} closeModal={handleClose}>
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          label="Прізвище"
          placeholder="Прізвище"
          required
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          error={isSubmitted && !formData.lastName ? 'Прізвище не введено' : ''}
        />
        <Input
          label="Ім`я"
          placeholder="Ім`я"
          required
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          error={isSubmitted && !formData.firstName ? 'Ім`я не введено' : ''}
        />
        <Input
          label="По-Батькові"
          placeholder="По-Батькові"
          required
          value={formData.patronymic}
          onChange={(e) => setFormData({ ...formData, patronymic: e.target.value })}
          error={isSubmitted && !formData.patronymic ? 'По-Батькові не введено' : ''}
        />
        <Input
          label="E-Mail"
          placeholder="E-Mail"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={isSubmitted && !formData.email ? 'E-Mail не введено' : ''}
        />
        <MultiSelectCourses
          type="modal"
          label="Предмети"
          placeholder="Предмети"
          required
          value={formData.courses.map((value) => `${value}`)}
          onChange={(value) => setFormData({
            ...formData,
            courses: value.map((option) => +option.value),
          })}
        />
      </form>
      <ModalControlButtons
        handleClose={handleClose}
        onSubmit={onSubmit}
        cancelButtonText="Відміна"
        mainButtonText="Зберегти"
      />
    </ModalWindow>
  );
};

export default StudentsEditModal;
