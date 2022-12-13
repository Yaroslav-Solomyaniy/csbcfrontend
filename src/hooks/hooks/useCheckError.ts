import { MessagesContext } from '../../context/All/Messages';

const useCheckError = (error:any) => {
  const { addErrors } = MessagesContext();

  if (error.response.status !== 401) {
    addErrors(error.response.data.message);
  }
};

export default useCheckError;
