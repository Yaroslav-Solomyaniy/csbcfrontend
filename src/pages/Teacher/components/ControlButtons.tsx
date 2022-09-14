import React from 'react';
import pagesStyle from '../../pagesStyle.module.scss';
import Button from '../../../components/common/Button';
import { Edit, History } from '../../../components/common/Icon';
import { IIsActiveModalState } from '../index';

interface IControlButtons{
  isActiveModal: IIsActiveModalState;
  setIsActiveModal: (value: IIsActiveModalState)=> void;
  itemId: number;
}
const ControlButtons = ({ isActiveModal, setIsActiveModal, itemId }:IControlButtons) => (
  <div className={pagesStyle.actions}>
    <Button
      onClick={() => setIsActiveModal({ ...isActiveModal, edit: itemId })}
      isImg
    >
      <Edit />
    </Button>
    <Button
      onClick={() => setIsActiveModal({ ...isActiveModal, history: itemId })}
      isImg
    >
      <History />
    </Button>
  </div>
);

export default ControlButtons;
