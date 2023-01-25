import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/All/AuthContext';
import { MessagesContext } from '../../context/All/Messages';

const useClearMessages = () => {
  const { user } = AuthContext();
  const { clearMessages } = MessagesContext();
  const location = useLocation();

  useEffect(() => {
    clearMessages();
  }, [location.pathname, user]);
};

export default useClearMessages;
