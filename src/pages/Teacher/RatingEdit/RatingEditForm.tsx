import React from 'react';
import { typeFormData, typeInfoRow } from './index';
import styles from '../../pagesStyle.module.scss';
import ModalInput from '../../../components/common/ModalInput';
import { OnlyNumbers } from '../../../types/regExp';
import SelectReason from '../../../components/common/Select/SelectReason';
import ModalControlButtons from '../../../components/common/ModalControlButtons';

interface IRatingEditModal{
  closeModal:() => void;
  onSubmit: (e: any) => void;
  isSubmitted: boolean;
  infoRow: typeInfoRow;
  formData: typeFormData;
  setFormData: (value: typeFormData) => void;
  modalTitle?: string;
}
const RatingEditForm = ({
  closeModal,
  onSubmit,
  isSubmitted,
  infoRow,
  formData,
  modalTitle,
  setFormData }:IRatingEditModal):JSX.Element => ((
    <>
      {modalTitle && (<div className={styles.modal__title}>{modalTitle}</div>)}
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.subtitle}>
          {`${infoRow.lastName} ${infoRow.firstName} ${infoRow.patronymic}, ${infoRow.groupName}`}
        </div>
        <div className={styles.subtitle}>{`Предмет: ${infoRow.courseName}`}</div>
        <div className={styles.subtitle}>{`Поточна оцінка: ${infoRow.grade}`}</div>
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
    </>
  )
) as JSX.Element;

RatingEditForm.defaultProps = {
  modalTitle: '',
};

export default RatingEditForm;
