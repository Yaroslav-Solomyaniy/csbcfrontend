import React from 'react';

interface IGroupCreateModal {
  modalActive: boolean;
  closeModal: () => void;
  groupId: number;
}

export const StudentsDeleteModal = ({ modalActive, closeModal, groupId }: IGroupCreateModal): JSX.Element => (
  <div />
);

export default StudentsDeleteModal;
