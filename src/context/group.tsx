import React, { createContext, useContext } from 'react';
import {
  IUseGroupDelete,
  IUseGroupEdit,
  IUseGroupIdGet,
  IUseGroupsCreate,
  IUseGroupsGet,
  useGroupDelete,
  useGroupEdit,
  useGroupId,
  useGroups,
  useGroupsCreate,
} from '../hooks/useGroups';

interface GroupContext {
  groupsGet: IUseGroupsGet | null;
  groupCreate: IUseGroupsCreate | null;
  getGroupId: IUseGroupIdGet | null;
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
  const groupsGet = useGroups();
  const groupCreate = useGroupsCreate();
  const getGroupId = useGroupId();
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
