import React from 'react';
import Table from '../../../components/common/Table';
import styles from './index.module.scss';
import { IndividualPlanTableHeader } from './types';

interface IRequiredCoursesTableInIndividualPlan{
  data: any;
}

const RequiredCoursesTableInIndividualPlan = ({ data }:IRequiredCoursesTableInIndividualPlan):JSX.Element => (
  <Table gridColumns={styles.columns} dataRow={[]} dataHeader={IndividualPlanTableHeader} />
);

export default RequiredCoursesTableInIndividualPlan;
