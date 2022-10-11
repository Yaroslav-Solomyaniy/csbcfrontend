export interface Option {
  value: string | number | boolean;
  label: string | number;
}

export interface Size {
  width: number | undefined;
  height: number | undefined;
}

export type SelectType = 'filter' | 'modal' | 'pagination' | 'mini';
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

export interface Pagination {
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
  meta: Pagination;
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
