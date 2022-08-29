import React, { useEffect, useState } from 'react';
import styles from '../../../pagesStyle.module.scss';
import ModalWindow from '../../../../components/common/ModalWindow';
import ModalControlButtons from '../../../../components/common/ModalControlButtons';
import { IEditModal } from '../../../../types';
import { useEstimatesContext } from '../../../../context/estimates';
import ModalInput from '../../../../components/common/ModalInput';
import SelectReason from '../../../../components/common/Select/SelectReason';

const formInitialData = {
  newEstimates: 0,
  reasonChange: '',
};

export const EstimatesEdit = ({ modalActive, closeModal, studentId, courseId }: IEditModal): JSX.Element => {
  const { gradesEdit, gradesGetId } = useEstimatesContext();
  // const { addInfo } = useMessagesContext();
  const [formData, setFormData] = useState(formInitialData);
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
  }, [gradesEdit?.data]);

  useEffect(() => {
    if (studentId) {
      gradesGetId?.getEstimatesId({ id: studentId });
    }
  }, [studentId]);

  return (
    <ModalWindow modalTitle="Редагування групи" active={modalActive} closeModal={handleClose}>
      <form className={styles.form} onSubmit={onSubmit}>
        <p>
          {`${gradesGetId?.data?.user.lastName} ${gradesGetId?.data?.user.firstName}
        ${gradesGetId?.data?.user.patronymic}, ${gradesGetId?.data?.group.name}`}
        </p>
        <p>
          {`${
            // estimatesGetId?.data?.courses.filter((course) => course.id === courseId)[0].name
            courseId
          }, Поточна оцінка: ${
            // estimatesGetId?.data?.courses[0].grades[0].grade
            courseId
          }`}
        </p>
        <ModalInput
          onChange={(event) => {
            setFormData({ ...formData, newEstimates: +event.target.value });
          }}
          value={formData.newEstimates}
          error={isSubmitted && !formData.newEstimates ? 'Номер групи не введено.' : ''}
          placeholder="Введіть нову оцінку*"
          label="Введіть нову оцінку*"
          required
        />
        <SelectReason
          type="modal"
          label="Причина зміни*"
          placeholder="Причина зміни"
          required
          isSearchable
          isClearable
          onChange={(value) => {
            setFormData({ ...formData, reasonChange: value });
          }}
          value={formData.reasonChange}
          error={isSubmitted && !formData.reasonChange ? 'Куратор не обраний.' : ''}
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

EstimatesEdit.defaultProps = {
  gradeId: 0,
};

export default EstimatesEdit;
