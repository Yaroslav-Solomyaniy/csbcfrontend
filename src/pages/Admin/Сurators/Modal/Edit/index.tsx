import React, { useEffect, useState } from 'react';
import ModalWindow from '../../../../../components/common/ModalWindow';
import { IEditModal } from '../../../../../types';
import { CuratorContext } from '../../../../../context/Pages/admin/Curators';
import { Email } from '../../../../../types/regExp';
import { MessagesContext } from '../../../../../context/All/Messages';
import CuratorsForm from '../form/create&edit';
import ModalControlButtons from '../../../../../components/common/ModalControlButtons';
import { IEditUserParams } from '../../../../../hooks/api/user/useEdit';

const formInitialData: IEditUserParams = {
  firstName: '',
  lastName: '',
  patronymic: '',
  email: '',
  role: 'curator',
};

export const CuratorEditModal = ({ modalActive, closeModal, studentId }: IEditModal): JSX.Element => {
  const [isSubmitted, setIsSubmited] = useState(false);
  const [formData, setFormData] = useState<IEditUserParams>(formInitialData);

  const { editCurator, getCuratorById } = CuratorContext();
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
      editCurator?.editUser({ ...formData }, studentId);
    }
  };

  useEffect(() => {
    if (editCurator?.data) {
      handleClose();
      addInfo(`Куратор "${formData.lastName} ${formData.firstName} ${formData.patronymic}" відредагований`);
    }
  }, [editCurator?.data]);

  useEffect(() => {
    if (studentId) {
      getCuratorById?.getUserById({ id: `${studentId}` });
    }
  }, [studentId]);

  useEffect(() => {
    if (getCuratorById?.data) {
      setFormData({
        firstName: getCuratorById?.data.firstName,
        lastName: getCuratorById?.data.lastName,
        patronymic: getCuratorById?.data.patronymic,
        email: getCuratorById?.data.email,
        role: getCuratorById?.data.role,
      });
    }
  }, [getCuratorById?.data]);

  return (
    <ModalWindow modalTitle="Редагування куратора" active={modalActive} closeModal={handleClose}>
      <CuratorsForm
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
    </ModalWindow>
  );
};

export default CuratorEditModal;
