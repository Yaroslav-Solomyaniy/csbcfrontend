import React from 'react';
import styles from './index.module.scss';
import SelectSemester from '../../Select/SelectSemester';
import SelectCourse from '../../Select/SelectCourse';
import Button from '../../Button';
import plus from '../../../../images/plus.svg';
import minus from '../../../../images/minus.svg';
import { Minus, Plus } from '../../Icon';

interface IMultiSelectCourseSemestr{
  error?: string;
  isProfileCourse?: boolean;
  data: {
    id: number;
    courseId: string;
    semester: number;
  }[];
  setData: (data: { id: number; courseId: string; semester: number; }[]) => void;
}

const MultiSelectCourseSemestr = ({
  error,
  isProfileCourse,
  data,
  setData,
}: IMultiSelectCourseSemestr): JSX.Element => {
  const updateCourse = (id: number, course: string) => {
    const newState = data.map((obj) => {
      if (obj.id === id) {
        return { ...obj, courseId: course };
      }

      return obj;
    });

    setData(newState);
  };

  const updateSemester = (id: number, item: string) => {
    const newState = data.map((obj) => {
      if (obj.id === id) {
        return { ...obj, semester: +item };
      }

      return obj;
    });

    setData(newState);
  };

  const addNewRow = () => {
    setData([...data, { id: new Date().getTime(), courseId: '', semester: 1 }]);
  };
  const deleteRowById = (itemId: number) => {
    setData(data.filter((items) => items.id !== itemId));
  };

  return (
    <div className={styles.multiSel}>
      <h6 className={styles.title}>{isProfileCourse ? 'Профільні предмети:' : 'Непрофільні предмети:'}</h6>
      {data.map((obj, index) => (
        <div key={obj.id} className={styles.row}>
          <SelectCourse
            placeholder="Предмет"
            isClearable
            isSearchable
            value={obj.courseId}
            onChange={(e) => updateCourse(obj.id, e)}
            type="multimodal"
            menuPos="absolute"
            menuPlace={
           /*  data.length < 3 && */'auto'
            }
          />
          <SelectSemester
            value={obj.semester}
            onChange={(e) => updateSemester(obj.id, e)}
            type="modal"
            menuPos="absolute"
            menuPlace="bottom"
          />
          {index === data.length - 1
            ? (
              <Button onClick={(e) => addNewRow()} isImg className={styles.button}>
                <Plus />
              </Button>
            )
            : (
              <Button onClick={(e) => deleteRowById(obj.id)} isImg className={styles.button}>
                <Minus />
              </Button>
            )}
        </div>
      ))}
      {error && (
        <div className={styles.error}>
          <div className={styles.textError}>{error}</div>
        </div>
      )}
    </div>
  );
};

MultiSelectCourseSemestr.defaultProps = {
  error: '',
  isProfileCourse: false,
};

export default MultiSelectCourseSemestr;
