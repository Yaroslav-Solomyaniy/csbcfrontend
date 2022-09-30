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
} from '../../hooks/PagesInAdmin/useGroups';

interface IGroupsContext {
  getGroups: IUseGroupsGet | null;
  groupCreate: IUseGroupCreate | null;
  getGroupId: IUseGetGroupId | null;
  groupEdit: IUseGroupEdit | null;
  groupDelete: IUseGroupDelete | null;

}

const defaultValue: IGroupsContext = {
  getGroups: null,
  groupCreate: null,
  getGroupId: null,
  groupEdit: null,
  groupDelete: null,
};

export const groupsContext = createContext<IGroupsContext>(defaultValue);

const GroupProvider: React.FC = ({ children }): JSX.Element => {
  const getGroups = useGroupsGet();
  const groupCreate = useGroupCreate();
  const getGroupId = useGetGroupId();
  const groupEdit = useGroupEdit();
  const groupDelete = useGroupDelete();

  return (
    <groupsContext.Provider value={{ getGroups, groupCreate, getGroupId, groupEdit, groupDelete }}>
      {children}
    </groupsContext.Provider>
  );
};

export default GroupProvider;

export const GroupsContext = (): IGroupsContext => useContext(groupsContext);
