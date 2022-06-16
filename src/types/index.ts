export interface Option {
  value: string | number;
  label: string | number;
}

export type OrderBy = 'ASC' | 'DESC';

export interface IPaginateData<Item> {
  'items': Item[];
  'meta': {
    'totalItems': number;
    'itemCount': number;
    'itemsPerPage': number;
    'totalPages': number;
    'currentPage': number;
  };
  'links': {
    'first': string;
    'previous': string;
    'next': string;
    'last': string;
  };
}
