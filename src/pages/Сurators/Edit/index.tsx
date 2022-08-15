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

export const CuratorEditModal = ({ modalActive, closeModal, Id }: IEditModal): JSX.Element => {
  const [isSubmitted, setIsSubmited] = useState(false);
  const [formData, setFormData] = useState<IUserEditParams>(formInitialData);
  const { curatorEdit, getCuratorId } = useCuratorContext();
  const { addInfo } = useMessagesContext();

  const handleClose = () => {
    setIsSubmited(false);
    setFormData(formInitialData);
    closeModal();
  };

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    setIsSubmited(true);

    if (formData.firstName
      && formData.lastName
      && formData.patronymic
      && formData.lastName
      && Email.test(formData.email)) {
      curatorEdit?.userEdit({ ...formData }, Id);
    }
  };

  useEffect(() => {
    handleClose();
    if (curatorEdit?.data) {
      addInfo(`Куратор ${formData.lastName} ${formData.firstName} ${formData.patronymic} успішно відредагований`);
    }
  }, [curatorEdit?.data]);

  useEffect(() => {
    if (Id) {
      getCuratorId?.getUserId({ id: `${Id}` });
    }
  }, [Id]);

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
          onChange={(event) => {
            setFormData({ ...formData, lastName: event.target.value });
          }}
          value={formData.lastName.slice(0, 15)}
          placeholder="Прізвище"
          label="Прізвище"
          required
          error={isSubmitted && !formData.lastName ? 'Прізвище не введено' : ''}
          pattern={LettersAndNumbersEnUa}
        />
        <ModalInput
          onChange={(event) => {
            setFormData({ ...formData, firstName: event.target.value });
          }}
          value={formData.firstName.slice(0, 10)}
          placeholder="Ім'я"
          label="Ім'я"
          required
          error={isSubmitted && !formData.firstName ? "\"Ім'я\" не введено" : ''}
          pattern={LettersAndNumbersEnUa}
        />
        <ModalInput
          onChange={(event) => {
            setFormData({ ...formData, patronymic: event.target.value });
          }}
          value={formData.patronymic.slice(0, 15)}
          placeholder="По-Батькові"
          label="По-Батькові"
          required
          error={isSubmitted && !formData.patronymic ? 'В поле "По-Батькові" нічого не введено' : ''}
          pattern={LettersAndNumbersEnUa}
        />
        <ModalInput
          onChange={(event) => {
            setFormData({ ...formData, email: event.target.value });
          }}
          value={formData.email.slice(0, 40)}
          placeholder="E-Mail"
          label="E-Mail"
          required
          error={isSubmitted && !Email.test(formData.email)
            ? (formData.email.length < 1 ? 'E-mail не введено' : 'E-mail введено не вірно') : ''}
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
