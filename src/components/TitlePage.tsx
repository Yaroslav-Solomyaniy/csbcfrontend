import React from 'react';
import '../style/Components/TitlePage.css';

interface ITitlePage{
    title:string;
}

function TitlePage({ title }:ITitlePage) {
  return (
    <h1 className="title">{title}</h1>
  );
}
export default TitlePage;
