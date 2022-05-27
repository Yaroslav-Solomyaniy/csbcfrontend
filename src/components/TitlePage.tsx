import React, { FC } from 'react';
import '../style/Components/TitlePage.css';

interface ITitlePage{
    title:string;
}

const TitlePage:FC<ITitlePage> = ({ title }) => (
  <h1 className="title">{title}</h1>
);

export default TitlePage;
