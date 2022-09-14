import React, { SetStateAction } from 'react';
import { Params } from 'react-router-dom';
import SelectStudent from '../../../components/common/Select/SelectStudent';
import { initialPagination } from '../../../types';
import SelectGroupById from '../../../components/common/Select/SelectGroupById';
import SelectCourse from '../../../components/common/Select/SelectCourse';
import { IParams } from '../index';

interface IPageFilter{
value: IParams;
setParams:(newValue:IParams) => void;
}

const PageFilter = ({ value, setParams }:IPageFilter):JSX.Element => (
  <>
    <SelectStudent
      type="filter"
      placeholder="ПІБ"
      onChange={(newValue) => setParams(
        { ...value,
          filter: { ...value.filter, student: newValue },
          pagination: initialPagination,
        },
      )}
      value={value.filter.student}
      isClearable
      isSearchable
      isTeacher
    />
    <SelectGroupById
      type="filter"
      placeholder="Група"
      onChange={(newValue) => setParams(
        { ...value,
          filter: { ...value.filter, group: newValue },
          pagination: initialPagination,
        },
      )}
      value={value.filter.group}
      isClearable
      isSearchable
      isTeacher
    />
    <SelectCourse
      type="filter"
      placeholder="Предмет"
      onChange={(newValue) => setParams(
        { ...value,
          filter: { ...value.filter, course: newValue },
          pagination: initialPagination,
        },
      )}
      value={value.filter.course}
      isClearable
      isSearchable
      isTeacher
    />
  </>
);

export default PageFilter;
