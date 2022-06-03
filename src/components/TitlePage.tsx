import React from 'react';
import '../style/Components/TitlePage.css';

interface ITitlePage {
  title: string;
}

const TitlePage = ({ title }: ITitlePage):JSX.Element => (
  <div className="headerPage">
    <h1 className="title">{title}</h1>
  </div>
);

export default TitlePage;
