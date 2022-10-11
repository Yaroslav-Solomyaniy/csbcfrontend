import React, { createContext, useContext, useState } from 'react';

interface IMessageItem {
  id: number;
  text: string;
}

interface IMessages {
  error: IMessageItem[];
  warning: IMessageItem[];
  info: IMessageItem[];
  voting: IMessageItem[];
}

interface IMessagesContext {
  messages: IMessages;
  addErrors: (error: string) => void;
  closeError: (index: number) => void;
  addWarning: (warning: string) => void;
  closeWarning: (index: number) => void;
  addInfo: (info: string) => void;
  closeInfo: (index: number) => void;
  addVoting: (voting: string) => void;
  closeVoting: (index: number) => void;
  clearMessages:() => void;
}

const defaultValue: IMessagesContext = {
  messages: { error: [], warning: [], info: [], voting: [] },
  addErrors: () => undefined,
  closeError: () => undefined,
  addWarning: () => undefined,
  closeWarning: () => undefined,
  addInfo: () => undefined,
  closeInfo: () => undefined,
  addVoting: () => undefined,
  closeVoting: () => undefined,
  clearMessages: () => undefined,
};

export const messagesContext = createContext<IMessagesContext>(defaultValue);
let id = 1;

const MessagesProvider = ({ children }: { children: JSX.Element; }): JSX.Element => {
  const [messages, setMessages] = useState<IMessages>({
    error: [],
    warning: [],
    info: [],
    voting: [],
  });

  const clear = () => {
    setMessages({
      error: [],
      warning: [],
      info: [],
      voting: [],
    });
  };

  const addErrors = (text: string) => {
    setMessages((prevState) => ({
      ...prevState,
      error: [...prevState.error, { id, text }],
    }));
    id++;
  };

  const closeError = (messageId: number): void => {
    setMessages({
      ...messages,
      error: messages.error.filter((message) => messageId !== message.id),
    });
  };

  const addWarning = (text: string) => {
    setMessages((prevState) => ({
      ...prevState,
      warning: [...prevState.warning, { id, text }],
    }));
    id++;
  };

  const closeWarning = (messageId: number): void => {
    setMessages({
      ...messages,
      warning: messages.warning.filter((message) => messageId !== message.id),
    });
  };

  const addInfo = (text: string) => {
    setMessages((prevState) => ({
      ...prevState, info: [...prevState.info, { id, text }],
    }));
    id++;
  };

  const closeInfo = (messageId: number): void => {
    setMessages({
      ...messages,
      info: messages.info.filter((message) => messageId !== message.id),
    });
  };

  const addVoting = (text: string) => {
    setMessages((prevState) => ({
      ...prevState,
      voting: [...prevState.voting, { id, text }],
    }));
    id++;
  };

  const closeVoting = (messageId: number): void => {
    setMessages({
      ...messages,
      voting: messages.voting.filter((message) => messageId !== message.id),
    });
  };

  return (
    <messagesContext.Provider value={{
      messages,
      closeError,
      addErrors,
      addWarning,
      closeWarning,
      addInfo,
      closeInfo,
      addVoting,
      closeVoting,
      clearMessages: clear,
    }}
    >
      {children}
    </messagesContext.Provider>
  );
};

export default MessagesProvider;

export const MessagesContext = (): IMessagesContext => useContext(messagesContext);
