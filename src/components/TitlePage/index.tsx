import React from 'react';
import styles from './index.module.scss';

interface ITitlePage {
  title: string;
  action?: JSX.Element;
}

const TitlePage = ({ title, action }: ITitlePage):JSX.Element => (
  <div className={styles.top_row}>
    <h1 className={styles.title}>{title}</h1>
    {action}
  </div>
);

TitlePage.defaultProps = {
  action: '',
};

export default TitlePage;
