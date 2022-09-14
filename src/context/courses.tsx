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
} from '../hooks/useCourses';

interface ICourseContext {
  getCourses: IUseCoursesGet | null;
  courseCreate: IUseCoursesCreate | null;
  getCourseId: IUseGetCourseId | null;
  courseEdit: IUseCourseEdit | null;
  courseDelete: IUseCourseDelete | null;
}

const defaultValue: ICourseContext = {
  getCourses: null,
  courseCreate: null,
  getCourseId: null,
  courseEdit: null,
  courseDelete: null,
};

export const CoursesContext = createContext<ICourseContext>(defaultValue);

const CourseProvider: React.FC = ({ children }): JSX.Element => {
  const getCourses = useCoursesGet();
  const createCourse = useCreateCourse();
  const getCourseId = useCourseGetId();
  const courseEdit = useCourseEdit();
  const courseDelete = useCourseDelete();

  return (
    <CoursesContext.Provider value={{ getCourses, courseCreate: createCourse, getCourseId, courseEdit, courseDelete }}>
      {children}
    </CoursesContext.Provider>
  );
};

export default CourseProvider;

export const useCourseContext = (): ICourseContext => useContext(CoursesContext);
