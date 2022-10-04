import React from 'react';
import { IGroupCreateParams } from '../../../../../../hooks/PagesInAdmin/useGroups';
import styles from '../../../../../pagesStyle.module.scss';
import ModalInput from '../../../../../../components/common/MyInput';
import { LettersAndNumbersEnUa, NumbersAndLettersEn } from '../../../../../../types/regExp';
import SelectCurator from '../../../../../../components/common/Select/SelectCurator';

interface IGroupPageModalForm{
  onSubmit: (e: React.FormEvent | undefined) => void;
  isSubmitted: boolean;
  formData:IGroupCreateParams;
  setFormData: (value: IGroupCreateParams) => void;
  modalTitle?: string;
}

const GroupPageModalForm = ({ modalTitle, isSubmitted, onSubmit, formData, setFormData }:IGroupPageModalForm) => (
  <>
    {modalTitle && (<div className={styles.modal__title}>{modalTitle}</div>)}
    <form className={styles.form} onSubmit={onSubmit}>
      <ModalInput
        onChange={(event) => {
          setFormData({ ...formData, name: event.target.value.slice(0, 6) });
        }}
        value={formData.name}
        placeholder="Номер групи"
        label="Номер групи"
        required
        error={isSubmitted && !formData.name ? 'Номер групи не введено.' : ''}
        pattern={LettersAndNumbersEnUa}
      />

      <ModalInput
        onChange={(event) => {
          setFormData({ ...formData, orderNumber: event.target.value.slice(0, 8) });
        }}
        value={formData.orderNumber}
        error={isSubmitted && (`${formData.orderNumber}`.length < 6
      || `${formData.orderNumber}`.length > 20
          ? 'Номер наказу повинен містити не менше 6-ти символів.' : '')}
        placeholder="Номер наказу"
        label="Номер наказу"
        required
        pattern={NumbersAndLettersEn}
      />
      <SelectCurator
        type="modal"
        label="Куратор"
        placeholder="Куратор"
        required
        isSearchable
        isClearable
        onChange={(value) => {
          setFormData({ ...formData, curatorId: +value });
        }}
        value={formData.curatorId}
        error={isSubmitted && !formData.curatorId ? 'Куратор не обраний.' : ''}
      />
    </form>
  </>
);

GroupPageModalForm.defaultProps = {
  modalTitle: '',
};

export default GroupPageModalForm;
