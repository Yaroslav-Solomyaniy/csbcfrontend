export interface Option {
  value: string | number;
  label: string | number;
}

export type OrderBy = 'ASC' | 'DESC';

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
