import React, { useState } from 'react';
import ModalWindow from '../../../components/common/ModalWindow';
import pagesStyle from '../../pagesStyle.module.scss';
import ModalControlButtons from '../../../components/common/ModalControlButtons';
import { IEditModal } from '../../../types';
import 'react-datepicker/dist/react-datepicker.css';
import SelectDate from '../../../components/common/Select/SelectDate';
import MultiSelectGroup from '../../../components/common/MultiSelect/MultiSelectGroup';
import MultiSelectCourseSemestr from '../../../components/common/MultiSelect/MultiSelectCourseSemestr';

export interface IVoting {
  groups: number [];
  firstDate: Date | null;
  lastDate: Date | null;
  requiredCourse: { id: number; courseId: string; semester: number; }[];
  notRequiredCourse: { id: number; courseId: string; semester: number; }[];
}

export const initialState = [
  { id: new Date().getTime(), courseId: '', semester: 1 },
];

const formInitialData: IVoting/*: IUserCreateParams */ = {
  groups: [],
  firstDate: null,
  lastDate: null,
  requiredCourse: initialState,
  notRequiredCourse: initialState,
};

export const VotingEditModal = ({ modalActive, closeModal }: IEditModal): JSX.Element => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState(formInitialData);

  const handleClose = () => {
    setIsSubmitted(false);
    setFormData(formInitialData);
    closeModal();
  };

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    setIsSubmitted(true);
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

  /* useEffect(() => {
     setFormData({ ...formData, requireCourse: requiredCourse, notRequireCourse: notRequiredCourse });
   }, [requiredCourse, notRequiredCourse]);
 */
  return (
    <ModalWindow modalTitle="Редагування голосування" active={modalActive} closeModal={handleClose}>
      <form className={pagesStyle.form} onSubmit={onSubmit}>
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
        <MultiSelectCourseSemestr
          data={formData.requiredCourse}
          setData={(item) => setFormData({ ...formData, requiredCourse: item })}
          isProfileCourse
          error={isSubmitted && (formData.requiredCourse.every((element) => element.courseId === ''))
            ? 'Не обрано жодного профільного предмету' : ''}
        />
        <MultiSelectCourseSemestr
          data={formData.notRequiredCourse}
          setData={(item) => setFormData({ ...formData, notRequiredCourse: item })}
          error={isSubmitted && (formData.notRequiredCourse.every((element) => element.courseId === ''))
            ? 'Не обрано жодного непрофільного предмету' : ''}
        />
        <SelectDate
          label="Дата початку"
          onChange={(item) => setFormData({ ...formData, firstDate: item })}
          value={formData.firstDate}
          error={isSubmitted && !formData.firstDate ? 'Дата початку голосування не обрана' : ''}
        />
        <SelectDate
          label="Дата кінця"
          onChange={(item) => setFormData({ ...formData, lastDate: item })}
          value={formData.lastDate}
          error={isSubmitted && !formData.lastDate ? 'Дата кінця голосування не обрана' : ''}
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

export default VotingEditModal;
