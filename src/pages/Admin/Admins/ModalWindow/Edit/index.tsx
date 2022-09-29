import React, { useEffect, useState } from 'react';
import ModalWindow from '../../../../../components/common/ModalWindow';
import { IEditModal } from '../../../../../types';
import { Email } from '../../../../../types/regExp';
import { IUserEditParams } from '../../../../../hooks/useUser';
import { useAdministratorsContext } from '../../../../../context/administators';
import { useMessagesContext } from '../../../../../context/messagesContext';
import AdministratorsForm from '../form/Create&Edit';
import MobileModalWindow from '../../../../../components/common/MobileModalWindow';
import { useDeviceContext } from '../../../../../context/TypeDevice';

const formInitialData: IUserEditParams = {
  firstName: '',
  lastName: '',
  patronymic: '',
  email: '',
  role: 'admin',
};

export const AdministratorEditModal = ({ modalActive, closeModal, studentId }: IEditModal): JSX.Element => {
  const [isSubmitted, setIsSubmited] = useState(false);
  const [formData, setFormData] = useState<IUserEditParams>(formInitialData);

  const { isPhone, isTablet, isDesktop } = useDeviceContext();
  const { administratorsEdit, getAdministratorsId } = useAdministratorsContext();
  const { addInfo } = useMessagesContext();

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
      administratorsEdit?.userEdit({ ...formData }, studentId);
    }
  };

  useEffect(() => {
    handleClose();
    if (administratorsEdit?.data) {
      addInfo(`Адміністратор "${formData.lastName} ${formData.firstName} ${formData.patronymic}" відредагований`);
    }
  }, [administratorsEdit?.data]);

  useEffect(() => {
    if (studentId) {
      getAdministratorsId?.getUserId({ id: `${studentId}` });
    }
  }, [studentId]);

  useEffect(() => {
    if (getAdministratorsId?.data) {
      setFormData({
        firstName: getAdministratorsId?.data.firstName,
        lastName: getAdministratorsId?.data.lastName,
        patronymic: getAdministratorsId?.data.patronymic,
        email: getAdministratorsId?.data.email,
        role: getAdministratorsId.data.role,
      });
    }
  }, [getAdministratorsId?.data]);

  return (
    <>
      {isDesktop && (
        <ModalWindow modalTitle="Створення адміністратора" active={modalActive} closeModal={handleClose}>
          <AdministratorsForm
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
          <AdministratorsForm
            modalTitle="Створення адміністратора"
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

export default AdministratorEditModal;
