export interface Option {
  value: string | number | boolean;
  label: string | number;
}

export type SelectType = 'filter' | 'modal' | 'pagination';
export type OrderBy = 'ASC' | 'DESC';

export const LettersAndNumbersEnUa = new RegExp("^[a-zA-Zа-яА-Яа-щА-ЩЬьЮюЯяЇїІіЄєҐ\\sґ0-9'_.-]*$");
export const OnlyNumbers = new RegExp('^[0-9]*$');
export const NumbersAndLettersEn = new RegExp('^[a-zA-Z0-9-]*$');

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
