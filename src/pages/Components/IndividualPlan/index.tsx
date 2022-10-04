import React from 'react';
import styles from './index.module.scss';
import TitlePage from '../../../components/common/TitlePage';

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
