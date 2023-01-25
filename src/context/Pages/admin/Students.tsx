import React, { createContext, useContext } from 'react';
import { IUseGetStudents, useGetStudents } from '../../../hooks/api/admin/students/useGet';
import { IUseCreateStudent, useCreateStudent } from '../../../hooks/api/admin/students/useCreate';
import { IUseGetStudentById, useGetStudentById } from '../../../hooks/api/admin/students/useGetById';
import { IUseEditStudent, useEditStudent } from '../../../hooks/api/admin/students/useEdit';
import { IUseDeleteStudent, useDeleteStudent } from '../../../hooks/api/admin/students/useDelete';

interface IStudentsContext {
  getStudents: IUseGetStudents | null;
  createStudent: IUseCreateStudent | null;
  getStudentById: IUseGetStudentById | null;
  editStudent: IUseEditStudent | null;
  deleteStudent: IUseDeleteStudent | null;
}

const defaultValue: IStudentsContext = {
  getStudents: null,
  createStudent: null,
  getStudentById: null,
  editStudent: null,
  deleteStudent: null,
};

export const studentsContext = createContext<IStudentsContext>(defaultValue);

const StudentsProvider = ({ children }: JSX.ElementChildrenAttribute): JSX.Element => {
  const getStudents = useGetStudents();
  const createStudent = useCreateStudent();
  const getStudentById = useGetStudentById();
  const editStudent = useEditStudent();
  const deleteStudent = useDeleteStudent();

  return (
    <studentsContext.Provider value={{ getStudents, createStudent, getStudentById, editStudent, deleteStudent,
    }}
    >
      {children}
    </studentsContext.Provider>
  );
};

export default StudentsProvider;

export const StudentsContext = (): IStudentsContext => useContext(studentsContext);
