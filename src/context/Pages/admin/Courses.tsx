import React, { createContext, useContext } from 'react';
import { IUseGetCourses, useGetCourses } from '../../../hooks/api/admin/courses/useGet';
import { IUseCreateCourse, useCreateCourse } from '../../../hooks/api/admin/courses/useCreate';
import { IUseGetCourseById, useGetCourseById } from '../../../hooks/api/admin/courses/useGetById';
import { IUseEditCourse, useEditCourse } from '../../../hooks/api/admin/courses/useEdit';
import { IUseDeleteCourse, useDeleteCourse } from '../../../hooks/api/admin/courses/useDelete';

interface ICoursesContext {
  getCourses: IUseGetCourses | null;
  createCourse: IUseCreateCourse | null;
  getCourseById: IUseGetCourseById | null;
  editCourse: IUseEditCourse | null;
  deleteCourse: IUseDeleteCourse | null;
}

const defaultValue: ICoursesContext = {
  getCourses: null,
  createCourse: null,
  getCourseById: null,
  editCourse: null,
  deleteCourse: null,
};

export const coursesContext = createContext<ICoursesContext>(defaultValue);

const CoursesProvider: React.FC = ({ children }): JSX.Element => {
  const getCourses = useGetCourses();
  const createCourse = useCreateCourse();
  const getCourseById = useGetCourseById();
  const editCourse = useEditCourse();
  const deleteCourse = useDeleteCourse();

  return (
    <coursesContext.Provider value={{ getCourses, createCourse, getCourseById, editCourse, deleteCourse }}>
      {children}
    </coursesContext.Provider>
  );
};

export default CoursesProvider;

export const CoursesContext = (): ICoursesContext => useContext(coursesContext);
