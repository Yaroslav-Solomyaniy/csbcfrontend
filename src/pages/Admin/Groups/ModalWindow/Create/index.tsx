import React, { useEffect, useState } from 'react';
import { useGroupContext } from '../../../../../context/groups';
import { IGroupCreateParams } from '../../../../../hooks/useGroups';
import ModalWindow from '../../../../../components/common/ModalWindow';
import { useMessagesContext } from '../../../../../context/messagesContext';
import { ICreateModal } from '../../../../../types';
import GroupPageModalForm from '../form/Create&Edit/modalForm';
import { useDeviceContext } from '../../../../../context/TypeDevice';
import MobileModalWindow from '../../../../../components/common/MobileModalWindow';

const formInitialData = {
  name: '',
  curatorId: 0,
  orderNumber: '',
};

export const GroupCreate = ({ modalActive, closeModal }: ICreateModal): JSX.Element => {
  const [formData, setFormData] = useState<IGroupCreateParams>(formInitialData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isDesktop, isTablet, isPhone } = useDeviceContext();
  const { groupCreate } = useGroupContext();
  const { addInfo } = useMessagesContext();

  const handleClose = () => {
    setIsSubmitted(false);
    closeModal();
    setTimeout(() => {
      setFormData(formInitialData);
    }, 200);
  };

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    setIsSubmitted(true);
    if (formData.name
      && (`${formData.orderNumber}`.length >= 6 && `${formData.orderNumber}`.length <= 20)
      && formData.curatorId) {
      groupCreate?.groupCreate(formData);
    }
  };

  useEffect(() => {
    handleClose();
    if (groupCreate?.data) {
      addInfo(`Група "${groupCreate?.data?.name}" успішно створена`);
    }
  }, [groupCreate?.data]);

  return (
    <>
      {isDesktop && (
      <ModalWindow modalTitle="Створення групи" active={modalActive} closeModal={handleClose}>
        <GroupPageModalForm
          handleClose={handleClose}
          isSubmitted={isSubmitted}
          setFormData={setFormData}
          formData={formData}
          onSubmit={onSubmit}
        />
      </ModalWindow>
      )}
      {(isTablet || isPhone) && (
        <MobileModalWindow isActive={modalActive}>
          <GroupPageModalForm
            modalTitle="Створення групи"
            handleClose={handleClose}
            isSubmitted={isSubmitted}
            setFormData={setFormData}
            formData={formData}
            onSubmit={onSubmit}
          />
        </MobileModalWindow>
      )}
    </>
  );
};

export default GroupCreate;
