import React from 'react';
import { IGroupDeleteParams } from '../../../../../hooks/useGroups';
import styles from '../../../../pagesStyle.module.scss';
import ModalInput from '../../../../../components/common/ModalInput';
import { NumbersAndLettersEn } from '../../../../../types/regExp';
import ModalControlButtons from '../../../../../components/common/ModalControlButtons';

interface IGroupPageModalDeleteForm{
  handleClose:() => void;
  onSubmit: (e: React.FormEvent | undefined) => void;
  isSubmitted: boolean;
  formData:IGroupDeleteParams;
  setFormData: (value: IGroupDeleteParams) => void;
  modalTitle?: string;
  orderNumber: string;
}

const GroupPageModalDeleteForm = ({
  handleClose,
  orderNumber,
  modalTitle,
  isSubmitted,
  onSubmit,
  formData,
  setFormData,
}:IGroupPageModalDeleteForm) => (
  <>
    {modalTitle && (<div className={styles.modal__title}>{modalTitle}</div>)}
    <form className={styles.form} onSubmit={onSubmit}>
      <h3 className={styles.subtitle}>Для підтвердження видалення групи введіть номер наказу.</h3>
      <ModalInput
        onChange={(event) => {
          setFormData({ ...formData, deletedOrderNumber: event.target.value.slice(0, 8) });
        }}
        value={formData.deletedOrderNumber}
        error={isSubmitted && orderNumber !== formData.deletedOrderNumber
          ? 'Номер наказу введено невірно'
          : (isSubmitted && (`${formData.deletedOrderNumber}`.length < 6 || `${formData.deletedOrderNumber}`.length > 20
            ? 'Номер наказу повинен містити не менше 6-ти символів' : ''))}
        placeholder="Номер наказу"
        label="Номер наказу"
        required
        pattern={NumbersAndLettersEn}
      />
    </form>
    <ModalControlButtons
      handleClose={handleClose}
      onSubmit={onSubmit}
      cancelButtonText="Відміна"
      mainButtonText="Видалити"
    />
  </>
);

GroupPageModalDeleteForm.defaultProps = {
  modalTitle: '',
};

export default GroupPageModalDeleteForm;
