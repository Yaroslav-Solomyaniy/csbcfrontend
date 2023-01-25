import React, { createContext, useContext } from 'react';
import { IUseGetGroups, useGetGroups } from '../../../hooks/api/admin/groups/useGet';
import { IUseCreateGroup, useCreateGroup } from '../../../hooks/api/admin/groups/useCreate';
import { IUseGetGroupById, useGetGroupById } from '../../../hooks/api/admin/groups/useGetById';
import { IUseEditGroup, useEditGroup } from '../../../hooks/api/admin/groups/useEdit';
import { IUseDeleteGroup, useDeleteGroup } from '../../../hooks/api/admin/groups/useDelete';

interface IGroupsContext {
  getGroups: IUseGetGroups | null;
  createGroup: IUseCreateGroup | null;
  getGroupById: IUseGetGroupById | null;
  editGroup: IUseEditGroup | null;
  deleteGroup: IUseDeleteGroup | null;

}

const defaultValue: IGroupsContext = {
  getGroups: null,
  createGroup: null,
  getGroupById: null,
  editGroup: null,
  deleteGroup: null,
};

export const groupsContext = createContext<IGroupsContext>(defaultValue);

const GroupProvider: React.FC = ({ children }): JSX.Element => {
  const getGroups = useGetGroups();
  const createGroup = useCreateGroup();
  const getGroupById = useGetGroupById();
  const editGroup = useEditGroup();
  const deleteGroup = useDeleteGroup();

  return (
    <groupsContext.Provider value={{ getGroups, createGroup, getGroupById, editGroup, deleteGroup }}>
      {children}
    </groupsContext.Provider>
  );
};

export default GroupProvider;

export const GroupsContext = (): IGroupsContext => useContext(groupsContext);
