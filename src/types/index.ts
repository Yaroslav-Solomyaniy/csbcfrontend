export interface Option {
  value: string | number | boolean;
  label: string | number;
}

export interface Size {
  width: number | undefined;
  height: number | undefined;
}

export const Semesters:Record<number, string> = {
  1: 'I семестр',
  2: 'II семестр',
  3: 'III семестр',
  4: 'IV семестр',
  5: 'V семестр',
  6: 'VI семестр',
  7: 'VII семестр',
  8: 'VIII семестр',
};

export type CourseTypes = 'Загальна компетентність'
  | 'Фахова компетентність'
  | 'Вибіркова загальна компетентність'
  | 'Вибіркова фахова компетентність';

export type SelectTypes = 'filter' | 'modal' | 'pagination' | 'mini';
export type OrderBy = 'ASC' | 'DESC';

export interface IEditModal {
  modalActive: boolean;
  closeModal: () => void;
  studentId: number;
  courseId?: number;
  gradeId?: number;
  semester?: number;
}

export interface IDeleteModal {
  modalActive: boolean;
  closeModal: () => void;
  Id: number;
}

export interface ICreateModal {
  modalActive: boolean;
  closeModal: () => void;
}

export interface IPagination {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export const initialPagination = {
  currentPage: 1,
  itemCount: 0,
  itemsPerPage: 10,
  totalItems: 0,
  totalPages: 0,
};

export interface IPaginateData<Item> {
  items: Item[];
  meta: IPagination;
  links: {
    first: string;
    previous: string;
    next: string;
    last: string;
  };
}

export interface FetchSuccess {
  success: boolean;
}
