import React, { useEffect, useState } from 'react';
import ModalWindow from '../../../../components/common/ModalWindow';
import ModalControlButtons from '../../../../components/common/ModalControlButtons';
import pagesStyle from '../../../pagesStyle.module.scss';
import ModalInput from '../../../../components/common/ModalInput';
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
  const { patchTeacher, getTeacherId } = useTeachersContext();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<ITeacher>(formInitialData);

  const handleClose = () => {
    setIsSubmitted(false);
    setFormData(formInitialData);
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
    if (id) getTeacherId?.getTeacherId(id);
  }, [id]);

  useEffect(() => {
    if (getTeacherId?.data && id !== 0) {
      setFormData({
        firstName: getTeacherId?.data?.firstName,
        lastName: getTeacherId?.data?.lastName,
        patronymic: getTeacherId?.data?.patronymic,
        email: getTeacherId?.data?.email,
        courses: getTeacherId?.data?.courses.map((course) => course.id) || [],
      });
    }
  }, [getTeacherId?.data]);

  return (
    <ModalWindow modalTitle="Редагуваня викладача" active={modalActive} closeModal={handleClose}>
      <form className={pagesStyle.form} onSubmit={onSubmit}>
        <ModalInput
          label="Прізвище"
          placeholder="Прізвище"
          required
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          error={isSubmitted && !formData.lastName ? 'Прізвище не введено' : ''}
        />
        <ModalInput
          label="Ім`я"
          placeholder="Ім`я"
          required
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          error={isSubmitted && !formData.firstName ? 'Ім`я не введено' : ''}
        />
        <ModalInput
          label="По-Батькові"
          placeholder="По-Батькові"
          required
          value={formData.patronymic}
          onChange={(e) => setFormData({ ...formData, patronymic: e.target.value })}
          error={isSubmitted && !formData.patronymic ? 'По-Батькові не введено' : ''}
        />
        <ModalInput
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
