import React, { useEffect, useState } from 'react';
import ModalWindow from '../../../../../components/common/ModalWindow';
import { GroupsContext } from '../../../../../context/Pages/admin/Groups';
import { MessagesContext } from '../../../../../context/All/Messages';
import { IEditModal } from '../../../../../types';
import GroupPageModalForm from '../form/Create&Edit/modalForm';
import ModalControlButtons from '../../../../../components/common/ModalControlButtons';
import { IEditGroupParams } from '../../../../../hooks/api/admin/groups/useEdit';

const formInitialData = {
  name: '',
  curatorId: 0,
  orderNumber: '',
};

export const GroupEdit = ({ modalActive, closeModal, studentId }: IEditModal): JSX.Element => {
  const [formData, setFormData] = useState<IEditGroupParams>(formInitialData);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { editGroup, getGroupById } = GroupsContext();
  const { addInfo } = MessagesContext();

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
    if (formData.name && (`${formData.orderNumber}`.length >= 6
      && `${formData.orderNumber}`.length <= 20) && formData.curatorId) {
      editGroup?.editGroup({ ...formData }, studentId);
    }
  };

  useEffect(() => {
    if (editGroup?.data) {
      handleClose();
      addInfo(`Група "${getGroupById?.data?.name}" успішно відредагована`);
    }
  }, [editGroup?.data]);

  useEffect(() => {
    if (studentId) {
      getGroupById?.getGroupById({ id: `${studentId}` });
    }
  }, [studentId]);

  useEffect(() => {
    if (getGroupById?.data) {
      setFormData({
        name: getGroupById?.data?.name || '',
        orderNumber: getGroupById?.data?.orderNumber || '',
        curatorId: getGroupById?.data?.curator?.id || 0,
      });
    }
  }, [getGroupById?.data]);

  return (
    <ModalWindow modalTitle="Редагування групи" active={modalActive} closeModal={handleClose}>
      <GroupPageModalForm
        isSubmitted={isSubmitted}
        setFormData={setFormData}
        formData={formData}
        onSubmit={onSubmit}
      />
      <ModalControlButtons
        handleClose={handleClose}
        onSubmit={onSubmit}
        cancelButtonText="Відміна"
        mainButtonText="Зберегти"
      />
    </ModalWindow>
  );
};

export default GroupEdit;
