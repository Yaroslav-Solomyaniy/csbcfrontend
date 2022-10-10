import React, { useEffect, useState } from 'react';
import ModalWindow from '../../../../../components/common/ModalWindow';
import { IGroupEditParams } from '../../../../../hooks/PagesInAdmin/useGroups';
import { GroupsContext } from '../../../../../context/PagesInAdmin/Groups';
import { MessagesContext } from '../../../../../context/All/Messages';
import { IEditModal } from '../../../../../types';
import GroupPageModalForm from '../form/Create&Edit/modalForm';
import ModalControlButtons from '../../../../../components/common/ModalControlButtons';
import Preloader from '../../../../../components/common/Preloader/Preloader';

const formInitialData = {
  name: '',
  curatorId: 0,
  orderNumber: '',
};

export const GroupEdit = ({ modalActive, closeModal, studentId }: IEditModal): JSX.Element => {
  const [formData, setFormData] = useState<IGroupEditParams>(formInitialData);
  const [isSubmitted, setIsSubmited] = useState(false);

  const { groupEdit, getGroupId } = GroupsContext();
  const { addInfo } = MessagesContext();

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
        name: getGroupId?.data?.name || '',
        orderNumber: getGroupId?.data?.orderNumber || '',
        curatorId: getGroupId?.data?.curator?.id || 0,
      });
    }
  }, [getGroupId?.data]);

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
