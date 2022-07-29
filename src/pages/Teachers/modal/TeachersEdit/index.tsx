import React, { useState } from 'react';
import ModalWindow from '../../../../components/common/ModalWindow';
import ModalControlButtons from '../../../../components/common/ModalControlButtons';
import styles from '../index.module.scss';
import SelectCourse from '../../../../components/common/Select/SelectCourse';
import Input from '../../../../components/common/Input';

interface IStudentsDeleteModal {
  modalActive: boolean;
  closeModal: () => void;
  id: number;
}

const formInitialData = {
  firstName: '',
  lastName: '',
  patronymic: '',
  email: '',
  course: '',

};

const selectValueDefault = {
  course: '',
};

export const StudentsEditModal = ({ modalActive, closeModal, id }: IStudentsDeleteModal): JSX.Element => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState(formInitialData);
  const [selectValue, setSelectValue] = useState(selectValueDefault);

  const handleClose = () => {
    setIsSubmitted(false);
    setFormData(formInitialData);
    setSelectValue(selectValueDefault);
    closeModal();
  };

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    setIsSubmitted(true);

    if (
      !!formData.firstName
      && !!formData.lastName
      && !!formData.patronymic
      && !!formData.email
    ) {
      handleClose();
    }
  };
  // const onSubmit = (e: React.FormEvent | undefined) => {
  //   const query: IStudents = { user: {} };
  //
  //   e?.preventDefault?.();
  //   setIsSubmitted(true);
  //
  //   if (formData.firstName !== getStudent?.data?.firstName) query.user.firstName = formData.firstName;
  //   if (formData.lastName !== getStudent?.data?.user.lastName) query.user.lastName = formData.lastName;
  //   if (formData.patronymic !== getStudent?.data?.patronymic) {
  //     query.user.patronymic = formData.user.patronymic;
  //   }
  //   if (formData.email !== getStudent?.data?.user.email) query.user.email = formData.email;
  //
  //   patchStudentsItem?.patchStudent(query, id);
  //   handleClose();
  // };

  //   useEffect(() => {
  //     if (id) {
  //     getStudent?.getStudent({ id: `${id}` });
  //   }
  // }, [id]);

  // useEffect(() => {
  //   if (getStudent?.data) {
  //     setFormData({
  //       dateOfBirth: getStudent.data.dateOfBirth,
  //       groupId: getStudent.data.group.id,
  //       user: {
  //         firstName: getStudent.data.user.firstName,
  //         lastName: getStudent.data.user.lastName,
  //         patronymic: getStudent.data.user.patronymic,
  //         email: getStudent.data.user.email,
  //         role: 'student',
  //       },
  //       orderNumber: getStudent.data.orderNumber,
  //       edeboId: getStudent.data.edeboId,
  //       isFullTime: getStudent.data.isFullTime,
  //     });
  //   }
  // }, [getStudent?.data]);

  return (
    <ModalWindow modalTitle="Редагуваня викладача" active={modalActive} closeModal={handleClose}>
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          required
          label="Прізвище"
          placeholder="Прізвище"
          value={formData.lastName}
          onChange={() => undefined}
          error={isSubmitted && !formData.lastName ? 'Прізвище не введено' : ''}
        />
        <Input
          label="Ім`я"
          placeholder="Ім`я"
          required
          value={formData.firstName}
          onChange={() => undefined}
          error={isSubmitted && !formData.firstName ? 'Ім`я не введено' : ''}
        />
        <Input
          label="По-Батькові"
          placeholder="По-Батькові"
          required
          value={formData.patronymic}
          onChange={() => undefined}
          error={isSubmitted && !formData.patronymic ? 'По-Батькові не введено' : ''}
        />
        <Input
          required
          label="E-Mail"
          placeholder="E-Mail"
          value={formData.email}
          onChange={() => undefined}
          error={isSubmitted && !formData.email ? 'E-Mail не введено' : ''}
        />
        <SelectCourse
          type="modal"
          label="Предмети"
          placeholder="Предмети"
          required
          onChange={() => undefined}
          value={selectValue.course}
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
