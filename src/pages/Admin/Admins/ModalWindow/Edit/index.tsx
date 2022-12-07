import React, { useEffect, useState } from 'react';
import ModalWindow from '../../../../../components/common/ModalWindow';
import { IEditModal } from '../../../../../types';
import { Email } from '../../../../../types/regExp';
import { AdministratorsContext } from '../../../../../context/Pages/admin/Administators';
import { MessagesContext } from '../../../../../context/All/Messages';
import AdministratorsForm from '../form/Create&Edit';
import ModalControlButtons from '../../../../../components/common/ModalControlButtons';
import { IEditUserParams } from '../../../../../hooks/api/user/useEdit';

const formInitialData: IEditUserParams = {
  firstName: '',
  lastName: '',
  patronymic: '',
  email: '',
  role: 'admin',
};

export const AdministratorEditModal = ({ modalActive, closeModal, studentId }: IEditModal): JSX.Element => {
  const [isSubmitted, setIsSubmited] = useState(false);
  const [formData, setFormData] = useState<IEditUserParams>(formInitialData);
  const { editAdmin, getAdminById } = AdministratorsContext();
  const { addInfo } = MessagesContext();

  const handleClose = () => {
    setIsSubmited(false);
    closeModal();
    setTimeout(() => {
      setFormData(formInitialData);
    }, 200);
  };

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    setIsSubmited(true);

    if (formData.firstName
      && formData.lastName
      && formData.patronymic
      && formData.lastName
      && Email.test(formData.email)) {
      editAdmin?.editUser({ ...formData }, studentId);
    }
  };

  useEffect(() => {
    handleClose();
    if (editAdmin?.data) {
      addInfo(`Адміністратор "${formData.lastName} ${formData.firstName} ${formData.patronymic}" відредагований`);
    }
  }, [editAdmin?.data]);

  useEffect(() => {
    if (studentId) {
      getAdminById?.getUserById({ id: `${studentId}` });
    }
  }, [studentId]);

  useEffect(() => {
    if (getAdminById?.data) {
      setFormData({
        firstName: getAdminById?.data.firstName,
        lastName: getAdminById?.data.lastName,
        patronymic: getAdminById?.data.patronymic,
        email: getAdminById?.data.email,
        role: getAdminById.data.role,
      });
    }
  }, [getAdminById?.data]);

  return (
    <ModalWindow modalTitle="Редагування адміністратора" active={modalActive} closeModal={handleClose}>
      <>
        <AdministratorsForm
          isSubmitted={isSubmitted}
          setFormData={setFormData}
          formData={formData}
          onSubmit={onSubmit}
        />
        <ModalControlButtons
          handleClose={handleClose}
          onSubmit={onSubmit}
          cancelButtonText="Відміна"
          mainButtonText="Зберегти"
        />
      </>
    </ModalWindow>
  );
};

export default AdministratorEditModal;
