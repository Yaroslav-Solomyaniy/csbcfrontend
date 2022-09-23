import React, { useEffect, useState } from 'react';
import ModalWindow from '../../../../components/common/ModalWindow';
import { IGroupEditParams } from '../../../../hooks/useGroups';
import { useGroupContext } from '../../../../context/groups';
import { useMessagesContext } from '../../../../context/messagesContext';
import { IEditModal } from '../../../../types';
import GroupPageModalForm from '../form/Create&Edit/modalForm';
import MobileModalWindow from '../../../../components/common/MobileModalWindow';
import { useDeviceContext } from '../../../../context/TypeDevice';

const formInitialData = {
  name: '',
  curatorId: 0,
  orderNumber: '',
};

export const GroupEdit = ({ modalActive, closeModal, studentId }: IEditModal): JSX.Element => {
  const [formData, setFormData] = useState<IGroupEditParams>(formInitialData);
  const [isSubmitted, setIsSubmited] = useState(false);

  const { groupEdit, getGroupId } = useGroupContext();
  const { addInfo } = useMessagesContext();
  const { isDesktop, isTablet, isPhone } = useDeviceContext();

  const handleClose = () => {
    setIsSubmited(false);
    closeModal();
    setTimeout(() => {
      setFormData(formInitialData);
    }, 200);
  };

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    setIsSubmited(true);
    if (formData.name && (`${formData.orderNumber}`.length >= 6
      && `${formData.orderNumber}`.length <= 20) && formData.curatorId) {
      groupEdit?.groupEdit({ ...formData }, studentId);
    }
  };

  useEffect(() => {
    if (groupEdit?.data) {
      handleClose();
      addInfo(`Група "${getGroupId?.data?.name}" успішно відредагована`);
    }
  }, [groupEdit?.data]);

  useEffect(() => {
    if (studentId) {
      getGroupId?.getGroupId({ id: `${studentId}` });
    }
  }, [studentId]);

  useEffect(() => {
    if (getGroupId?.data) {
      setFormData({
        name: getGroupId?.data.name,
        orderNumber: getGroupId?.data.orderNumber,
        curatorId: getGroupId?.data.curator.id,
      });
    }
  }, [getGroupId?.data]);

  return (
    <>
      {isDesktop && (
        <ModalWindow modalTitle="Редагування групи" active={modalActive} closeModal={handleClose}>
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
            modalTitle="Редагування групи"
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

export default GroupEdit;
