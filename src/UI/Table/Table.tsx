import './Table.css';
import React from 'react';

function Table() {
  return (
    <div className="table">
      <div className="table__header table__header_left">Номер групи</div>
      <div className="table__header">Куратор</div>
      <div className="table__header">Номер наказу</div>
      <div className="table__header">К-сть студентів</div>
      <div className="table__header table__header_right">Дії</div>

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
