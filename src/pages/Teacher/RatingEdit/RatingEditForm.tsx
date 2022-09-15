import React from 'react';
import { typeFormData, typeInfoRow } from './index';
import ModalWindow from '../../../components/common/ModalWindow';
import styles from '../../pagesStyle.module.scss';
import ModalInput from '../../../components/common/ModalInput';
import { OnlyNumbers } from '../../../types/regExp';
import SelectReason from '../../../components/common/Select/SelectReason';
import ModalControlButtons from '../../../components/common/ModalControlButtons';

interface IRatingEditModal{
  modalActive: boolean;
  closeModal:() => void;
  onSubmit: (e: React.FormEvent | undefined) => void;
  isSubmitted: boolean;
  infoRow: typeInfoRow;
  formData: typeFormData;
  setFormData: (value: typeFormData) => void;
  // typeDevice: 'Desktop' | 'Notebook'| 'Tablet' | 'phone';
}
const RatingEditForm = ({
  modalActive,
  closeModal,
  onSubmit,
  isSubmitted,
  infoRow,
  formData,
  setFormData }:IRatingEditModal) => (
    <ModalWindow modalTitle="Редагування оцінки" active={modalActive} closeModal={closeModal}>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.subtitle}>
          {`${infoRow.lastName} ${infoRow.firstName} ${infoRow.patronymic}, ${infoRow.groupName}`}
        </div>
        <div className={styles.subtitle}>
          Предмет:
          {infoRow.courseName}
        </div>
        <div className={styles.subtitle}>
          Поточна оцінка:
          {infoRow.grade}
        </div>
        <ModalInput
          onChange={(event) => {
            setFormData({ ...formData, grade: +event.target.value });
          }}
          value={formData.grade || ''}
          error={isSubmitted && !formData.grade
            ? 'Оцінку не введено'
            : (formData.grade !== null && formData.grade > 100)
              ? 'Оцінка не може бути більше 100' : ''}
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
            setFormData({ ...formData, reasonForChange: value });
          }}
          value={formData.reasonForChange}
          error={isSubmitted && !formData.reasonForChange ? 'Причину зміни не обрано.' : ''}
        />
      </form>
      <ModalControlButtons
        handleClose={closeModal}
        onSubmit={onSubmit}
        cancelButtonText="Відміна"
        mainButtonText="Зберегти"
      />
    </ModalWindow>
);

export default RatingEditForm;
