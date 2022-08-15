import React, { useEffect, useState } from 'react';
import styles from '../../pagesStyle.module.scss';
import ModalWindow from '../../../components/common/ModalWindow';
import { IGroupEditParams } from '../../../hooks/useGroups';
import { useGroupContext } from '../../../context/group';
import ModalInput from '../../../components/common/ModalInput';
import SelectCurator from '../../../components/common/Select/SelectCurator';
import ModalControlButtons from '../../../components/common/ModalControlButtons';
import { useMessagesContext } from '../../../context/useMessagesContext';
import { IEditModal } from '../../../types';
import { LettersAndNumbersEnUa, NumbersAndLettersEn, OnlyNumbers } from '../../../types/regExp';
import SelectSemester from '../../../components/common/Select/SelectSemester';
import SelectReason from '../../../components/common/Select/SelectReason';

interface typeFormData{
  rating: number | undefined;
  reason: number;
}

const formInitialData:typeFormData = {
  rating: undefined,
  reason: 1,
};

export const TeacherRatingEdit = ({ modalActive, closeModal, Id }: IEditModal): JSX.Element => {
  const { groupEdit, getGroupId } = useGroupContext();
  const { addInfo } = useMessagesContext();
  const [formData, setFormData] = useState<typeFormData>(formInitialData);
  const [isSubmitted, setIsSubmited] = useState(false);

  const handleClose = () => {
    setIsSubmited(false);
    setFormData(formInitialData);
    closeModal();
  };

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    setIsSubmited(true);
  };

  useEffect(() => {
    handleClose();
    if (groupEdit?.data) {
      addInfo(`Група: ${getGroupId?.data?.name} з номером наказу:
      ${getGroupId?.data?.orderNumber} успішно відредагована.`);
    }
  }, [groupEdit?.data]);

  useEffect(() => {
    if (Id) {
      getGroupId?.getGroupId({ id: `${Id}` });
    }
  }, [Id]);

  return (
    <ModalWindow modalTitle="Редагування оцінки" active={modalActive} closeModal={handleClose}>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.subtitle}>Куратор Іван Сидорович, 2К-19</div>
        <div className={styles.subtitle}>Предмет :Інженерія програмного забеспечення</div>
        <div className={styles.subtitle}>Поточна оцінка: 82</div>
        <ModalInput
          onChange={(event) => {
            setFormData({ ...formData, rating: +event.target.value });
          }}
          value={formData.rating}
          error={isSubmitted && !formData.rating ? 'Оцінку не введено.' : ''}
          placeholder="Нова оцінка"
          label="Введіть нову оцінку"
          required
          pattern={OnlyNumbers}
        />
        <SelectReason
          type="modal"
          label="Причина зміни"
          placeholder="Причина зміни"
          required
          isSearchable
          onChange={(value) => {
            setFormData({ ...formData, reason: +value });
          }}
          value={formData.reason}
          error={isSubmitted && !formData.reason ? 'Причину зміни не обрано.' : ''}
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

export default TeacherRatingEdit;
