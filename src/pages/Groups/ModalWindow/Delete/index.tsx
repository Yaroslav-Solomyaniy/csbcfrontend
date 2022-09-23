import React, { useEffect, useState } from 'react';
import ModalWindow from '../../../../components/common/ModalWindow';
import { IGroupDeleteParams } from '../../../../hooks/useGroups';
import { useGroupContext } from '../../../../context/groups';
import { useMessagesContext } from '../../../../context/messagesContext';
import { IDeleteModal } from '../../../../types';
import MobileModalWindow from '../../../../components/common/MobileModalWindow';
import { useDeviceContext } from '../../../../context/TypeDevice';
import GroupPageModalDeleteForm from '../form/Delete';

const formInitialData = {
  deletedOrderNumber: '',
};

export const GroupDelete = ({ modalActive, closeModal, Id }: IDeleteModal): JSX.Element => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<IGroupDeleteParams>(formInitialData);

  const { addInfo } = useMessagesContext();
  const { groupDelete, getGroupId } = useGroupContext();
  const { isDesktop, isTablet, isPhone } = useDeviceContext();
  const [orderNumber, setOrderNumber] = useState('');

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

    if (
      (`${formData.deletedOrderNumber}`.length >= 6 && `${formData.deletedOrderNumber}`.length <= 20)
      && formData.deletedOrderNumber === orderNumber) {
      groupDelete?.groupDelete({ ...formData }, Id);
    }
  };

  useEffect(() => {
    if (groupDelete?.data) {
      handleClose();
      addInfo(`Група "${getGroupId?.data?.name}" успішно видалена`);
    }
  }, [groupDelete?.data]);

  useEffect(() => {
    if (getGroupId?.data) {
      setOrderNumber(getGroupId.data.orderNumber);
    }
  }, [getGroupId?.data]);

  useEffect(() => {
    if (Id) {
      getGroupId?.getGroupId({ id: `${Id}` });
    }
  }, [Id]);

  return (
    <>
      {isDesktop && (
        <ModalWindow modalTitle="Видалення групи" active={modalActive} closeModal={handleClose}>
          <GroupPageModalDeleteForm
            handleClose={handleClose}
            isSubmitted={isSubmitted}
            setFormData={setFormData}
            formData={formData}
            onSubmit={onSubmit}
            orderNumber={orderNumber}
          />
        </ModalWindow>
      )}
      {(isTablet || isPhone) && (
        <MobileModalWindow isActive={modalActive}>
          <GroupPageModalDeleteForm
            modalTitle="Видалення групи"
            handleClose={handleClose}
            isSubmitted={isSubmitted}
            setFormData={setFormData}
            formData={formData}
            onSubmit={onSubmit}
            orderNumber={orderNumber}
          />
        </MobileModalWindow>
      )}
    </>
  );
};

export default GroupDelete;
