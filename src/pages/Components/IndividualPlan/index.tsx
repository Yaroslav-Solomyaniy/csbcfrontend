import React from 'react';
import styles from './index.module.scss';
import TitlePage from '../../../components/common/TitlePage';
import Button from '../../../components/common/Button';
import Table from '../../../components/common/Table';
import { ITableHeader } from '../../../components/common/Table/TypeDisplay/Desktop/TableHeader';
import SelectSemester from '../../../components/common/Select/SelectSemester';

interface IPageIndividualPlan{
  data: any;
  // changeCourses: ()=>void;
}

// const StudentInvidualPlanActions = () => (
//   <div>
//  <SelectSemester onChange={o} type={} value={}
//   </div>
// )

const PageIndividualPlan = ({ data }:IPageIndividualPlan):JSX.Element => (
  <div className={styles.content}>
    <TitlePage title="Індивідуальний план" />
  </div>
);

export default PageIndividualPlan;
