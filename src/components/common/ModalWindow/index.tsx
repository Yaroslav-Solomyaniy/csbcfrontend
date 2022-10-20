import clsx from 'clsx';
import React, { useEffect } from 'react';
import DesktopStyles from './DesktopStyles.module.scss';
import MobileStyles from './MobileStyles.module.scss';
import { DeviceContext } from '../../../context/All/DeviceType';

interface IModalWindow {
  modalTitle?: string;
  active: boolean;
  children: React.ReactNode | React.ReactChild;
  closeModal: () => void;
  overflowY?: boolean;
  isStudentReview?: boolean;
}

const ModalWindow = ({ modalTitle, active, children, closeModal, overflowY, isStudentReview }: IModalWindow): JSX.Element => {
  const { isDesktop, isTablet, isPhone } = DeviceContext();

  useEffect(() => {
    const bodyStyle = document.body.style;

    if (active) {
      bodyStyle.overflowY = 'hidden';
    } else {
      bodyStyle.overflowY = 'auto';
    }
  }, [active]);

  return (
    <>
      {isDesktop && (
      <div className={clsx(DesktopStyles.modal, active && DesktopStyles.active)} onClick={closeModal}>
        <div
          className={clsx(
            DesktopStyles.modal__content,
            isStudentReview && DesktopStyles.modal__content__student,
            active && DesktopStyles.active,
            overflowY && DesktopStyles.modal__overflow,
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={DesktopStyles.modal__container}>
            <div className={DesktopStyles.title}>{modalTitle}</div>
            {children}
          </div>
        </div>
      </div>
      )}

      {(isTablet || isPhone) && (
        <div className={clsx(MobileStyles.overlay, active && MobileStyles.overlay_active)}>
          <div className={clsx(MobileStyles.modal, active && MobileStyles.modal_active)}>
            <div className={MobileStyles.title}>{modalTitle}</div>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

ModalWindow.defaultProps = {
  overflowY: false,
  modalTitle: '',
  isStudentReview: false,
};
export default ModalWindow;
