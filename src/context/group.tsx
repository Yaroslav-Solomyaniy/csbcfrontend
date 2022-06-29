import React, { createContext, useContext } from 'react';
import {
  IUseGetGroupId,
  IUseGroupCreate,
  IUseGroupDelete,
  IUseGroupEdit,
  IUseGroupsGet,
  useGetGroupId,
  useGroupCreate,
  useGroupDelete,
  useGroupEdit,
  useGroupsGet,
} from '../hooks/useGroups';

interface GroupContext {
  groupsGet: IUseGroupsGet | null;
  groupCreate: IUseGroupCreate | null;
  getGroupId: IUseGetGroupId | null;
  groupEdit: IUseGroupEdit | null;
  groupDelete: IUseGroupDelete | null;

}

const defaultValue: GroupContext = {
  groupsGet: null,
  groupCreate: null,
  getGroupId: null,
  groupEdit: null,
  groupDelete: null,
};

export const GroupContext = createContext<GroupContext>(defaultValue);

const GroupProvider: React.FC = ({ children }): JSX.Element => {
  const groupsGet = useGroupsGet();
  const groupCreate = useGroupCreate();
  const getGroupId = useGetGroupId();
  const groupEdit = useGroupEdit();
  const groupDelete = useGroupDelete();

  return (
    <GroupContext.Provider value={{ groupsGet, groupCreate, getGroupId, groupEdit, groupDelete }}>
      {children}
    </GroupContext.Provider>
  );
};

export default GroupProvider;

export const useGroupContext = (): GroupContext => useContext(GroupContext);
