import './Table.css';
import React from 'react';

interface TableHeader {
  name: string;
  title: string;
}

interface Table {
  header: TableHeader[];
  list: Record<string, string | number>[]
}

function Table({ header }: Table) {
  return (
    <div className="table">
        {header.map(({ title}) => (
          <div className="table__header">{title}</div>
        ))}

      <div className="table__item">2П-18</div>
      <div className="table__item">Фай Вікторія Степанівна</div>
      <div className="table__item">AO23F2</div>
      <div className="table__item">24</div>
      <div className="table__item">copm | comp</div>

      <div className="table__item">1П-18</div>
      <div className="table__item">Куцевський Сергій Миколайович</div>
      <div className="table__item">AO22F1</div>
      <div className="table__item">25</div>
      <div className="table__item">copm | comp</div>
    </div>
  );
}

export default Table;
