import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import pagesStyle from '../../pagesStyle.module.scss';
import ModalWindow from '../../../components/common/ModalWindow';
import { IGroupDeleteParams } from '../../../hooks/useGroups';
import ModalControlButtons from '../../../components/common/ModalControlButtons';
import { useMessagesContext } from '../../../context/useMessagesContext';
import { useCourseContext } from '../../../context/course';

interface IGroupCreateModal {
  modalActive: boolean;
  closeModal: () => void;
  Id: number;
}

const formInitialData = {
  deletedOrderNumber: '',
};

export const CourseDeleteModal = ({ modalActive, closeModal, Id }: IGroupCreateModal): JSX.Element => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<IGroupDeleteParams>(formInitialData);
  const { courseDelete, getCourseId } = useCourseContext();
  const { addInfo } = useMessagesContext();

  const handleClose = () => {
    setIsSubmitted(false);
    setFormData(formInitialData);
    closeModal();
  };

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    setIsSubmitted(true);
    courseDelete?.courseDelete(Id);
  };

  useEffect(() => {
    if (courseDelete?.data) {
      handleClose();
      addInfo(`Предмет "${getCourseId?.data?.name}" успішно видалено`);
    }
  }, [courseDelete?.data]);

  useEffect(() => {
    if (Id) {
      getCourseId?.getCourseId({ id: `${Id}` });
    }
  }, [Id]);

  return (
    <ModalWindow modalTitle="Видалення предмету" active={modalActive} closeModal={handleClose}>
      <form className={pagesStyle.form} onSubmit={onSubmit}>
        <h3 className={pagesStyle.subtitle}>
          Ви дійсно бажаєте видалити предмет "
          {getCourseId?.data?.name}
          "?
        </h3>
      </form>
      <ModalControlButtons
        handleClose={handleClose}
        onSubmit={onSubmit}
        cancelButtonText="Відміна"
        mainButtonText="Видалити"
      />
    </ModalWindow>
  );
};

export default CourseDeleteModal;
