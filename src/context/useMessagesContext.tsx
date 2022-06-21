import React, { createContext, useContext, useState } from 'react';

interface IMessages {
  error: string[];
  warning: string[];
  info: string[];
}

// export interface IMessageItem {
//   type: 'error' | 'warning' | 'info';
//   messages: string[];
// }

interface IMessagesContext {
  messages: IMessages;
  addErrors: (error: string) => void;
  closeError: (index: number) => void;
}

const defaultValue: IMessagesContext = {
  messages: { error: [], warning: [], info: [] },
  addErrors: () => undefined,
  closeError: () => undefined,
};

export const MessagesContext = createContext<IMessagesContext>(defaultValue);

const MessagesProvider = ({ children }: { children: JSX.Element; }): JSX.Element => {
  const [messages, setMessages] = useState<IMessages>({
    error: ['403', '234', '123'],
    warning: [],
    info: [],
  });

  const addErrors = (error: string) => {
    setMessages({
      ...messages, error: [...messages.error, error],
    });
  };

  const closeError = (index: number): void => {
    setMessages({
      ...messages,
      error: messages.error.filter((_, i) => index !== i),
    });
  };

  return (
    <MessagesContext.Provider value={{ closeError, addErrors, messages }}>
      {children}
    </MessagesContext.Provider>
  );
};

export default MessagesProvider;

export const useMessagesContext = (): IMessagesContext => useContext(MessagesContext);
