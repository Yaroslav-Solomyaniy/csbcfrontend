import React from 'react';
import Table from '../../../components/common/Table';
import styles from './index.module.scss';
import { IndividualPlanTableHeader } from './types';

interface IProfessionalsCoursesTableInIndividualPlan{
  data: any;
}

const ProfessionalsCoursesTableInIndividualPlan = ({ data }:IProfessionalsCoursesTableInIndividualPlan):JSX.Element => (
  <Table gridColumns={styles.columns} dataRow={[]} dataHeader={IndividualPlanTableHeader} />
);

export default ProfessionalsCoursesTableInIndividualPlan;
