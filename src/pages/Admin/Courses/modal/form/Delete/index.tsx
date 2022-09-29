import React from 'react';
import ModalControlButtons from '../../../../../../components/common/ModalControlButtons';
import styles from '../../../../../pagesStyle.module.scss';

interface ICourseDeleteForm{
  courseName: string | undefined;
  handleClose:() => void;
  onSubmit: (e: React.FormEvent | undefined) => void;
  modalTitle?: string;
}

const CourseDeleteForm = ({ courseName,
  handleClose,
  modalTitle,
  onSubmit,
}:ICourseDeleteForm):JSX.Element => (
  <>
    {modalTitle && (<div className={styles.modal__title}>{modalTitle}</div>)}
    <form className={styles.form} onSubmit={onSubmit}>
      <h3 className={styles.subtitle}>{`Ви дійсно бажаєте видалити предмет "${courseName}" ?`}</h3>
    </form>
    <ModalControlButtons
      handleClose={handleClose}
      onSubmit={onSubmit}
      cancelButtonText="Відміна"
      mainButtonText="Видалити"
    />
  </>
);

CourseDeleteForm.defaultProps = {
  modalTitle: '',
};

export default CourseDeleteForm;
