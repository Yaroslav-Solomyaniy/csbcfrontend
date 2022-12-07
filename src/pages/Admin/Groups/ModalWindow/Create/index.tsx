import React, { useEffect, useState } from 'react';
import { GroupsContext } from '../../../../../context/Pages/admin/Groups';
import ModalWindow from '../../../../../components/common/ModalWindow';
import { MessagesContext } from '../../../../../context/All/Messages';
import { ICreateModal } from '../../../../../types';
import GroupPageModalForm from '../form/Create&Edit/modalForm';
import ModalControlButtons from '../../../../../components/common/ModalControlButtons';
import { ICreateGroupParams } from '../../../../../hooks/api/admin/groups/useCreate';

const formInitialData = {
  name: '',
  curatorId: 0,
  orderNumber: '',
};

export const GroupCreate = ({ modalActive, closeModal }: ICreateModal): JSX.Element => {
  const [formData, setFormData] = useState<ICreateGroupParams>(formInitialData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { createGroup } = GroupsContext();
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
    if (formData.name
      && (`${formData.orderNumber}`.length >= 6 && `${formData.orderNumber}`.length <= 20)
      && formData.curatorId) {
      createGroup?.createGroup(formData);
    }
  };

  useEffect(() => {
    handleClose();
    if (createGroup?.data) {
      addInfo(`Група "${createGroup?.data?.name}" успішно створена`);
    }
  }, [createGroup?.data]);

  return (
    <ModalWindow modalTitle="Створення групи" active={modalActive} closeModal={handleClose}>
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
        mainButtonText="Створити"
      />
    </ModalWindow>
  );
};

export default GroupCreate;
