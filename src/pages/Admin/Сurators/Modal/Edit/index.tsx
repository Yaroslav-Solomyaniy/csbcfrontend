import React, { useEffect, useState } from 'react';
import ModalWindow from '../../../../../components/common/ModalWindow';
import { IEditModal } from '../../../../../types';
import { useCuratorContext } from '../../../../../context/curators';
import { Email } from '../../../../../types/regExp';
import { IUserEditParams } from '../../../../../hooks/useUser';
import { useMessagesContext } from '../../../../../context/messagesContext';
import CuratorsForm from '../form/create&edit';
import MobileModalWindow from '../../../../../components/common/MobileModalWindow';
import { useDeviceContext } from '../../../../../context/TypeDevice';

const formInitialData: IUserEditParams = {
  firstName: '',
  lastName: '',
  patronymic: '',
  email: '',
  role: 'curator',
};

export const CuratorEditModal = ({ modalActive, closeModal, studentId }: IEditModal): JSX.Element => {
  const [isSubmitted, setIsSubmited] = useState(false);
  const [formData, setFormData] = useState<IUserEditParams>(formInitialData);

  const { curatorEdit, getCuratorId } = useCuratorContext();
  const { addInfo } = useMessagesContext();
  const { isPhone, isDesktop, isTablet } = useDeviceContext();

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
      curatorEdit?.userEdit({ ...formData }, studentId);
    }
  };

  useEffect(() => {
    if (curatorEdit?.data) {
      handleClose();
      addInfo(`Куратор "${formData.lastName} ${formData.firstName} ${formData.patronymic}" відредагований`);
    }
  }, [curatorEdit?.data]);

  useEffect(() => {
    if (studentId) {
      getCuratorId?.getUserId({ id: `${studentId}` });
    }
  }, [studentId]);

  useEffect(() => {
    if (getCuratorId?.data) {
      setFormData({
        firstName: getCuratorId?.data.firstName,
        lastName: getCuratorId?.data.lastName,
        patronymic: getCuratorId?.data.patronymic,
        email: getCuratorId?.data.email,
        role: getCuratorId?.data.role,
      });
    }
  }, [getCuratorId?.data]);

  return (
    <>
      {isDesktop && (
        <ModalWindow modalTitle="Редагування куратора" active={modalActive} closeModal={handleClose}>
          <CuratorsForm
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
          <CuratorsForm
            modalTitle="Редагування куратора"
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

export default CuratorEditModal;
