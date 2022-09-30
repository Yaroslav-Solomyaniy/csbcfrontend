import React, { useEffect, useState } from 'react';
import ModalWindow from '../../../../../components/common/ModalWindow';
import { IGroupDeleteParams } from '../../../../../hooks/PagesInAdmin/useGroups';
import { GroupsContext } from '../../../../../context/PagesInAdmin/Groups';
import { MessagesContext } from '../../../../../context/All/Messages';
import { IDeleteModal } from '../../../../../types';
import { DeviceContext } from '../../../../../context/All/DeviceType';
import GroupPageModalDeleteForm from '../form/Delete';

const formInitialData = {
  deletedOrderNumber: '',
};

export const GroupDelete = ({ modalActive, closeModal, Id }: IDeleteModal): JSX.Element => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<IGroupDeleteParams>(formInitialData);

  const { addInfo } = MessagesContext();
  const { groupDelete, getGroupId } = GroupsContext();
  const { isDesktop, isTablet, isPhone } = DeviceContext();
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
  );
};

export default GroupDelete;
