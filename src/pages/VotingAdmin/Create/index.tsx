import React, { useState } from 'react';
import ModalWindow from '../../../components/common/ModalWindow';
import styles from '../index.module.scss';
import ModalControlButtons from '../../../components/common/ModalControlButtons';
import { ICreateModal } from '../../../types';
import { useMessagesContext } from '../../../context/useMessagesContext';
import { useAdministratorsContext } from '../../../context/administators';
import 'react-datepicker/dist/react-datepicker.css';
import SelectDate from '../../../components/common/Select/SelectDate';
import MultiSelectGroup from '../../../components/common/MultiSelect/MultiSelectGroup';
import MultiSelectCourseSemestr from '../../../components/common/MultiSelect/MultiSelectCourseSemestr';

interface IVoting {
  groups: number [];
}

const formInitialData: IVoting/*: IUserCreateParams */ = {
  groups: [],
};

export const VotingCreateModal = ({ modalActive, closeModal }: ICreateModal): JSX.Element => {
  const { administratorsCreate } = useAdministratorsContext();
  const { addInfo } = useMessagesContext();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState/* <IUserCreateParams> */(formInitialData);
  const [date, setDate] = useState<Date | null>(new Date());

  const handleClose = () => {
    setIsSubmitted(false);
    setFormData(formInitialData);
    closeModal();
  };

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    setIsSubmitted(true);
    console.log(date);
    /* if (formData.firstName && formData.lastName && formData.patronymic && Email.test(formData.email)) {
       administratorsCreate?.createUser(formData);
     } */
  };

  /*
    useEffect(() => {
      handleClose();
      if (administratorsCreate?.data) {
        addInfo(`${formData.lastName} ${formData.firstName} ${formData.patronymic}
        успішно доданий у список адміністраторів.`);
      }
    }, [administratorsCreate?.data]);
  */

  return (
    <ModalWindow modalTitle="Створення голосування" active={modalActive} closeModal={handleClose}>
      <form className={styles.form} onSubmit={onSubmit}>
        <MultiSelectGroup
          type="modal"
          label="Групи"
          placeholder="Групи"
          required
          isSearchable
          isClearable
          onChange={(value) => {
            setFormData({
              ...formData,
              groups: value.map((option) => (
                +option.value)),
            });
          }}
          value={formData.groups.map((group) => `${group}`)}
          error={isSubmitted && formData.groups.length < 1 ? 'Групи не обрано.' : ''}
        />
        <MultiSelectCourseSemestr isProfileCourse error="Тут буде якась помилка з роду помилок" />
        <MultiSelectCourseSemestr error="Тут буде якась помилка з роду помилок" />
        <SelectDate
          label="Дата початку"
          onChange={(newDate) => setDate(newDate)}
          value={date}
          isClearable
          error={isSubmitted ? 'Помилка є' : 'Помилки немає'}
        />
        <SelectDate
          label="Дата кінця"
          onChange={(newDate) => setDate(newDate)}
          value={date}
          isClearable
          error={isSubmitted ? 'Помилка є' : 'Помилки немає'}
        />
      </form>
      <ModalControlButtons
        handleClose={handleClose}
        onSubmit={onSubmit}
        cancelButtonText="Відміна"
        mainButtonText="Додати"
      />
    </ModalWindow>
  );
};

export default VotingCreateModal;
