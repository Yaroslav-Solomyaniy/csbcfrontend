import React, { createContext, useContext, useState } from 'react';

interface IMessages {
  error: string[];
  warning: string[];
  info: string[];
}

interface IMessagesContext {
  messages: IMessages;
  addErrors: (error: string) => void;
  closeError: (index: number) => void;
  addWarning: (warning: string) => void;
  closeWarning: (index: number) => void;
  addInfo: (info: string) => void;
  closeInfo: (index: number) => void;
}

const defaultValue: IMessagesContext = {
  messages: { error: [], warning: [], info: [] },
  addErrors: () => undefined,
  closeError: () => undefined,
  addWarning: () => undefined,
  closeWarning: () => undefined,
  addInfo: () => undefined,
  closeInfo: () => undefined,
};

export const MessagesContext = createContext<IMessagesContext>(defaultValue);

const MessagesProvider = ({ children }: { children: JSX.Element; }): JSX.Element => {
  const [messages, setMessages] = useState<IMessages>({
    error: [],
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

  const addWarning = (warning: string) => {
    setMessages({
      ...messages, warning: [...messages.warning, warning],
    });
  };

  const closeWarning = (index: number): void => {
    setMessages({
      ...messages,
      warning: messages.warning.filter((_, i) => index !== i),
    });
  };

  const addInfo = (info: string) => {
    setMessages({
      ...messages, info: [...messages.info, info],
    });
  };

  const closeInfo = (index: number): void => {
    setMessages({
      ...messages,
      info: messages.info.filter((_, i) => index !== i),
    });
  };

  return (
    <MessagesContext.Provider value={{
      messages,
      closeError,
      addErrors,
      addWarning,
      closeWarning,
      addInfo,
      closeInfo,
    }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export default MessagesProvider;

export const useMessagesContext = (): IMessagesContext => useContext(MessagesContext);
