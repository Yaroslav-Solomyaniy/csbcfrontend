import { IGetVotingSubmitDataById, IVotingSubmitParams } from '../../../../../hooks/PagesInAdmin/useVotings';
import styles from '../../../../pagesStyle.module.scss';
import columns from './submitForm.module.scss';
import Table from '../../../../../components/common/Table';
import { ITableHeader } from '../../../../../components/common/Table/TypeDisplay/Desktop/TableHeader';
import CheckBox from '../../../../All/Login/MyCheckBox.module.scss';

const dataHeader: ITableHeader[] = [
  { id: 1, label: 'Дія' },
  { id: 2, label: 'Назва дисципліни' },
  { id: 3, label: 'Викладач' },
  { id: 4, label: 'К-ть голосів' },

];

interface ISubmitVotingForm{
data: IGetVotingSubmitDataById | undefined;
formData: number[];
onSubmit: (e:React.FormEvent | undefined) => void;
setFormData:(value:IVotingSubmitParams) => void;
}

const SubmitVotingForm = ({ data, formData, onSubmit, setFormData }:ISubmitVotingForm) => (
  <form className={styles.form} onSubmit={onSubmit}>
    <div className={columns.submitContent}>
      <h1 className={styles.title}>Фахова компетентність - I семестр</h1>
      <Table
        dataHeader={dataHeader}
        isTableResult
        isTableVoting
        heightVH="auto"
        dataRow={data?.requiredCourses
          .filter((item) => item.semester === (1 || 3 || 5 || 7))
          .map((course) => ({ list: [
            { id: 1,
              label: (
                <div className={styles.checkbox}>
                  <input
                    className={CheckBox.custom__CheckBox}
                    checked={formData.includes(course.id)}
                    onChange={(event) => {
                      if (event.target.checked) {
                        setFormData({ courses: [...formData, +event.target.value] });
                      } else {
                        setFormData({ courses: formData.filter((value) => value !== +event.target.value) });
                      }
                    }}
                    value={course.id}
                    type="checkbox"
                    id={`MyCheckBox${course.id}`}
                  />
                  <label htmlFor={`MyCheckBox${course.id}`} />
                </div>),
            },
            { id: 2, label: course.name },
            { id: 3,
              label: `${course.teacher.lastName}
          ${course.teacher.firstName[0]}.
          ${course.teacher.patronymic[0]}.` },
            { id: 4, label: course.allVotes },
          ],
          key: course.id })) || []}
        gridColumns={columns.columns}
      />
      <h1 className={styles.title}>Загальна компетентність - I семестр</h1>
      <Table
        isTableVoting
        isTableResult
        heightVH="auto"
        dataHeader={dataHeader}
        dataRow={data?.notRequiredCourses
          .filter((item) => item.semester === (1 || 3 || 5 || 7))
          .map((course) => ({ list: [
            { id: 1,
              label: (
                <div className={styles.checkbox}>
                  <input
                    className={CheckBox.custom__CheckBox}
                    checked={formData.includes(course.id)}
                    onChange={(event) => {
                      if (event.target.checked) {
                        setFormData({ courses: [...formData, +event.target.value] });
                      } else {
                        setFormData({ courses: formData.filter((value) => value !== +event.target.value) });
                      }
                    }}
                    value={course.id}
                    type="checkbox"
                    id={`MyCheckBox${course.id}`}
                  />
                  <label htmlFor={`MyCheckBox${course.id}`} />
                </div>),
            },
            { id: 2, label: course.name },
            { id: 3,
              label: `${course.teacher.lastName}
          ${course.teacher.firstName[0]}.
          ${course.teacher.patronymic[0]}.` },
            { id: 4, label: course.allVotes },
          ],
          key: course.id })) || []}
        gridColumns={columns.columns}
      />
      <h1 className={styles.title}>Фахова компетентність - II семестр</h1>
      <Table
        isTableVoting
        isTableResult
        heightVH="auto"
        dataHeader={dataHeader}
        dataRow={data?.requiredCourses
          .filter((item) => item.semester === (2 || 4 || 6 || 8))
          .map((course) => ({ list: [
            { id: 1,
              label: (
                <div className={styles.checkbox}>
                  <input
                    className={CheckBox.custom__CheckBox}
                    checked={formData.includes(course.id)}
                    onChange={(event) => {
                      if (event.target.checked) {
                        setFormData({ courses: [...formData, +event.target.value] });
                      } else {
                        setFormData({ courses: formData.filter((value) => value !== +event.target.value) });
                      }
                    }}
                    value={course.id}
                    type="checkbox"
                    id={`MyCheckBox${course.id}`}
                  />
                  <label htmlFor={`MyCheckBox${course.id}`} />
                </div>),
            },
            { id: 2, label: course.name },
            { id: 3,
              label: `${course.teacher.lastName}
          ${course.teacher.firstName[0]}.
          ${course.teacher.patronymic[0]}.` },
            { id: 4, label: course.allVotes },
          ],
          key: course.id })) || []}
        gridColumns={columns.columns}
      />
      <h1 className={styles.title}>Загальна компетентність - II семестр</h1>
      <Table
        isTableVoting
        isTableResult
        heightVH="auto"
        dataHeader={dataHeader}
        dataRow={data?.notRequiredCourses
          .filter((item) => item.semester === (2 || 4 || 6 || 8))
          .map((course) => ({ list: [
            { id: 1,
              label: (
                <div className={styles.checkbox}>
                  <input
                    className={CheckBox.custom__CheckBox}
                    checked={formData.includes(course.id)}
                    onChange={(event) => {
                      if (event.target.checked) {
                        setFormData({ courses: [...formData, +event.target.value] });
                      } else {
                        setFormData({ courses: formData.filter((value) => value !== +event.target.value) });
                      }
                    }}
                    value={course.id}
                    type="checkbox"
                    id={`MyCheckBox${course.id}`}
                  />
                  <label htmlFor={`MyCheckBox${course.id}`} />
                </div>),
            },
            { id: 2, label: course.name },
            { id: 3,
              label: `${course.teacher.lastName}
          ${course.teacher.firstName[0]}.
          ${course.teacher.patronymic[0]}.` },
            { id: 4, label: course.allVotes },
          ],
          key: course.id })) || []}
        gridColumns={columns.columns}
      />
    </div>
  </form>
);

export default SubmitVotingForm;
