import React, { createContext, useContext } from 'react';
import {
  IUseCourseDelete,
  IUseCourseEdit,
  IUseCoursesCreate,
  IUseCoursesGet,
  IUseGetCourseId,
  useCourseDelete,
  useCourseEdit,
  useCourseGetId,
  useCoursesGet,
  useCreateCourse,
} from '../../hooks/PagesInAdmin/useCourses';

interface ICoursesContext {
  getCourses: IUseCoursesGet | null;
  courseCreate: IUseCoursesCreate | null;
  getCourseId: IUseGetCourseId | null;
  courseEdit: IUseCourseEdit | null;
  courseDelete: IUseCourseDelete | null;
}

const defaultValue: ICoursesContext = {
  getCourses: null,
  courseCreate: null,
  getCourseId: null,
  courseEdit: null,
  courseDelete: null,
};

export const coursesContext = createContext<ICoursesContext>(defaultValue);

const CoursesProvider: React.FC = ({ children }): JSX.Element => {
  const getCourses = useCoursesGet();
  const createCourse = useCreateCourse();
  const getCourseId = useCourseGetId();
  const courseEdit = useCourseEdit();
  const courseDelete = useCourseDelete();

  return (
    <coursesContext.Provider value={{ getCourses, courseCreate: createCourse, getCourseId, courseEdit, courseDelete }}>
      {children}
    </coursesContext.Provider>
  );
};

export default CoursesProvider;

export const CoursesContext = (): ICoursesContext => useContext(coursesContext);
