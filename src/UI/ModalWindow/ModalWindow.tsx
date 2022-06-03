import React, { Dispatch, SetStateAction } from 'react';
import './ModalWindow.css';

interface ImodalWindow{
  modalTitle:string;
  active:boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode | React.ReactChild;
}

const ModalWindow = ({ modalTitle, active, setActive, children }:ImodalWindow):JSX.Element => (
  <div className={active ? 'modal active' : 'modal'} onClick={() => { setActive(false); }}>
    <div className={active ? 'modalContent active' : 'modalContent'} onClick={(e) => e.stopPropagation()}>
      <div className="modalTitle">{modalTitle}</div>
      {children}
    </div>
  </div>
);

export default ModalWindow;
