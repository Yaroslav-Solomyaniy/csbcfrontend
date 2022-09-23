import { useLocation } from 'react-router-dom';

interface GetListLocationParams {
  // eslint-disable-next-line
  [key: string]: string[]
}

export const getListLocationParams = ({ search }: { search: string; }): GetListLocationParams => {
  if (!search) {
    return {};
  }

  const decodeSearch = decodeURI(search);

  if (decodeSearch && !decodeSearch.indexOf('?')) {
    return decodeSearch
      .slice(1)
      .split('&')
      .map((value) => value.split('='))
      .reduce((accumulator, [key, value]) => {
        const str = decodeURIComponent(value);
        const list = str.split(',');

        return Object.assign(accumulator, {
          [key]: list.filter((v: string) => v !== '').length !== list.length ? [str] : list,
        });
      }, {});
  }

  return {};
};
