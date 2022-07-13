export interface Option {
  value: string | number | boolean;
  label: string | number;
}

export type SelectType = 'filter' | 'modal' | 'pagination';
export type OrderBy = 'ASC' | 'DESC';
// eslint-disable-next-line prefer-regex-literals
export const validEmail = new RegExp(
  '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$',
);
// eslint-disable-next-line prefer-regex-literals
export const validInput = new RegExp('/^[a-zA-ZА-Яа-я0-9]+$/');

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
