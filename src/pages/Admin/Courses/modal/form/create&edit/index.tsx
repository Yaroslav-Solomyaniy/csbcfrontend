import React from 'react';
import ModalInput from '../../../../../../components/common/MyInput';
import { FiveSymbolOnlyNumbers, LettersAndNumbersEnUa } from '../../../../../../types/regExp';
import MultiSelectGroup from '../../../../../../components/common/MultiSelect/MultiSelectGroup';
import SelectTeacher from '../../../../../../components/common/Select/SelectTeacher';
import SelectSemester from '../../../../../../components/common/Select/SelectSemester';
import SelectExam from '../../../../../../components/common/Select/SelectIsExam';
import SelectCompulsory from '../../../../../../components/common/Select/SelectTypeCourse';
import { ICourseEditParams, ICoursesCreateParams } from '../../../../../../hooks/PagesInAdmin/useCourses';
import styles from '../../../../../pagesStyle.module.scss';

interface ICoursesInputForm{
  formData: ICourseEditParams | ICoursesCreateParams;
  setFormData: (value:any) => void;
  isSubmitted: boolean;
  onSubmit: (e: React.FormEvent | undefined) => void;
  modalTitle?: string;
}

const CoursesInputForm = ({ formData,
  setFormData,
  isSubmitted,
  onSubmit,
  modalTitle }:ICoursesInputForm) => (
    <>
      {modalTitle && (<div className={styles.modal__title}>{modalTitle}</div>)}
      <form className={styles.form} onSubmit={onSubmit}>
        <ModalInput
          onChange={(event) => {
            setFormData({ ...formData, name: event.target.value.slice(0, 50) });
          }}
          value={formData.name}
          placeholder="Назва предмету"
          label="Назва предмету"
          required
          error={isSubmitted && !formData.name ? 'Назву предмету не введено.' : ''}
          pattern={LettersAndNumbersEnUa}
        />
        <MultiSelectGroup
          type="modal"
          label="Групи"
          placeholder="Групи"
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
        />
        <SelectTeacher
          type="modal"
          label="ПІБ викладача"
          placeholder="ПІБ викладача"
          required
          isSearchable
          isClearable
          onChange={(value) => {
            setFormData({ ...formData, teacher: +value });
          }}
          value={formData.teacher}
          error={isSubmitted && !formData.teacher ? 'Викладача не обрано.' : ''}
        />
        <ModalInput
          onChange={(event) => {
            setFormData({ ...formData, credits: +event.target.value });
          }}
          value={formData.credits || ''}
          placeholder="К-сть кредитів"
          label="К-сть кредитів"
          required
          error={isSubmitted && !formData.credits ? 'К-сть кредитів не введено.' : ''}
          pattern={FiveSymbolOnlyNumbers}
        />
        <SelectSemester
          type="modal"
          label="Семестр"
          placeholder="Семестр"
          required
          onChange={(value) => {
            setFormData({ ...formData, semester: +value });
          }}
          value={formData.semester}
          error={isSubmitted && !formData.semester ? 'Семестр не обрано.' : ''}
        />
        <SelectExam
          type="modal"
          label="Вид контролю"
          placeholder="Вид контролю"
          required
          onChange={(value) => {
            setFormData({ ...formData, isExam: !!value });
          }}
          value={formData.isExam}
          error={(isSubmitted && !(formData.isExam || !formData.isExam)) ? 'Вид контролю не обрано.' : ''}
        />
        <ModalInput
          onChange={(event) => {
            setFormData({ ...formData, lectureHours: +event.target.value });
          }}
          value={formData.lectureHours || ''}
          placeholder="К-сть ауд.годин"
          label="К-сть ауд.годин"
          required
          error={isSubmitted && !formData.lectureHours ? 'К-сть ауд.годин не введено.' : ''}
          pattern={FiveSymbolOnlyNumbers}
        />
        <SelectCompulsory
          type="modal"
          label="Вид проведення"
          placeholder="Вид проведення"
          required
          onChange={(value) => {
            setFormData({ ...formData, type: value });
          }}
          value={formData.type}
          error={(isSubmitted && !formData.type) ? 'Вид проведення не обрано.' : ''}
        />
      </form>

    </>

);

CoursesInputForm.defaultProps = {
  modalTitle: '',
};

export default CoursesInputForm;
