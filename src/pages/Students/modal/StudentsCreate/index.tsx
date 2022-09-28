import React, { useEffect, useState } from 'react';
import moment from 'moment';
import ModalWindow from '../../../../components/common/ModalWindow';
import { IStudentCreateParams } from '../../../../hooks/useStudents';
import { useStudentsContext } from '../../../../context/students';
import { Email } from '../../../../types/regExp';
import { useMessagesContext } from '../../../../context/messagesContext';
import MobileModalWindow from '../../../../components/common/MobileModalWindow';
import { useDeviceContext } from '../../../../context/TypeDevice';
import CreateOrEditStudentsForm from '../form/CreateOrEdit';

interface IGroupCreateModal {
  closeModal: () => void;
  modalActive: boolean;
}

const formInitialData = {
  dateOfBirth: null,
  groupId: 0,
  user: {
    firstName: '',
    lastName: '',
    patronymic: '',
    email: '',
    role: 'student',
  },
  orderNumber: '',
  edeboId: '',
  isFullTime: true,
};

const selectValueDefault = {
  group: '',
  isFullTime: 'Денна',
};

export const StudentsCreateModal = ({ modalActive, closeModal }: IGroupCreateModal): JSX.Element => {
  const { studentCreate } = useStudentsContext();
  const { addInfo } = useMessagesContext();
  const [formData, setFormData] = useState<IStudentCreateParams>(formInitialData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectValue, setSelectValue] = useState(selectValueDefault);

  const { isDesktop, isTablet, isPhone } = useDeviceContext();

  const handleClose = () => {
    setIsSubmitted(false);
    closeModal();
    setTimeout(() => {
      setFormData(formInitialData);
      setSelectValue(selectValueDefault);
    }, 200);
  };

  useEffect(() => {
    setSelectValue({ ...selectValue, isFullTime: formData.isFullTime ? 'Денна' : 'Заочна' });
  }, [formData.isFullTime]);

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    setIsSubmitted(true);
    if (formData.dateOfBirth
      && formData.edeboId.toString().length === 8
      && formData.groupId
      && `${formData.orderNumber}`.length >= 6
      && `${formData.orderNumber}`.length <= 20
      && formData.user.firstName
      && formData.user.lastName
      && formData.user.patronymic
      && Email.test(formData.user.email)
      && (formData.isFullTime === 'true' || formData.isFullTime === 'false')) {
      studentCreate?.studentCreate({ ...formData,
        dateOfBirth: moment(formData.dateOfBirth).format('DD.MM.yyyy'),
        isFullTime: formData.isFullTime === 'true' });
    }
  };

  useEffect(() => {
    if (studentCreate?.data) {
      handleClose();
      addInfo(`Студента
    "${formData.user.lastName} ${formData.user.firstName} ${formData.user.patronymic}" успішно додано`);
    }
  }, [studentCreate?.data]);

  return (
    <>
      {isDesktop && (
        <ModalWindow modalTitle="Створення студента" active={modalActive} closeModal={handleClose}>
          <CreateOrEditStudentsForm
            handleClose={handleClose}
            isSubmitted={isSubmitted}
            setFormData={setFormData}
            formData={formData}
            onSubmit={onSubmit}
          />
        </ModalWindow>
      )}
      {(isTablet || isPhone) && (
        <MobileModalWindow isActive={modalActive}>
          <CreateOrEditStudentsForm
            modalTitle="Створення студента"
            handleClose={handleClose}
            isSubmitted={isSubmitted}
            setFormData={setFormData}
            formData={formData}
            onSubmit={onSubmit}
          />
        </MobileModalWindow>
      )}
    </>
  );
};

export default StudentsCreateModal;
