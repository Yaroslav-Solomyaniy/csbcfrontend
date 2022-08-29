import React, { useEffect, useState } from 'react';
import pagesStyle from '../../pagesStyle.module.scss';
import ModalWindow from '../../../components/common/ModalWindow';
import ModalControlButtons from '../../../components/common/ModalControlButtons';
import { IEditModal } from '../../../types';
import { useCuratorContext } from '../../../context/curators';
import ModalInput from '../../../components/common/ModalInput';
import { Email, EmailValidation, LettersAndNumbersEnUa } from '../../../types/regExp';
import { IUserEditParams } from '../../../hooks/useUser';
import { useMessagesContext } from '../../../context/useMessagesContext';

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

  const handleClose = () => {
    setIsSubmited(false);
    closeModal();
    setTimeout(() => {
      setFormData(formInitialData);
    }, 1500);
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
    handleClose();
    if (curatorEdit?.data) {
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
    <ModalWindow modalTitle="Редагування куратора" active={modalActive} closeModal={handleClose}>
      <form className={pagesStyle.form} onSubmit={onSubmit}>
        <ModalInput
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value.slice(0, 20) })}
          value={formData.lastName}
          placeholder="Прізвище"
          label="Прізвище"
          required
          error={isSubmitted && !formData.lastName ? 'Прізвище не введено' : ''}
          pattern={LettersAndNumbersEnUa}
        />
        <ModalInput
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value.slice(0, 15) })}
          value={formData.firstName}
          placeholder="Ім'я"
          label="Ім'я"
          required
          error={isSubmitted && !formData.firstName ? "Ім'я не введено" : ''}
          pattern={LettersAndNumbersEnUa}
        />
        <ModalInput
          onChange={(e) => setFormData({ ...formData, patronymic: e.target.value.slice(0, 20) })}
          value={formData.patronymic}
          placeholder="По батькові"
          label="По батькові"
          required
          error={isSubmitted && !formData.patronymic ? 'По батькові не введено' : ''}
          pattern={LettersAndNumbersEnUa}
        />
        <ModalInput
          value={formData.email}
          placeholder="Електронна пошта"
          label="Електронна пошта"
          required
          onChange={(e) => setFormData({ ...formData, email: e.target.value.slice(0, 40) })}
          error={isSubmitted && !Email.test(formData.email)
            ? (formData.email.length < 1 ? 'Електронну пошту не введено' : 'Електронна пошта введено не вірно') : ''}
          pattern={EmailValidation}
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

export default CuratorEditModal;
