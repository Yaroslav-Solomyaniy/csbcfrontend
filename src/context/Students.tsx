import React, { createContext, useContext, useState } from 'react';

interface IStudentsContext {
  cildren: JSX.ElementChildrenAttribute | null;
}

const defaultValue: IStudentsContext = {
  cildren: null,
};

export const StudentsContext = createContext<IStudentsContext>(defaultValue);

const StudentsProvider = (cildren: JSX.ElementChildrenAttribute | null) => {
  const [data, setData] = useState('');

  return (
    <div>
      {cildren}
    </div>
  );
};

export default StudentsProvider;

export const useAuthContext = (): IStudentsContext => useContext(StudentsContext);
