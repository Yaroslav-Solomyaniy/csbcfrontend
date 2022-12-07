import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { AuthContext } from '../../../../context/All/AuthContext';
import { MessagesContext } from '../../../../context/All/Messages';

interface IDownloadGradesParams {
  id: number;
}

export interface IUseDownloadGrades {
  dataFile: Blob | undefined;
  download: (params: IDownloadGradesParams) => void;
}

export const useDownloadGrades = (): IUseDownloadGrades => {
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [dataFile, setDataFile] = useState<Blob | undefined>();

  const download = (params: IDownloadGradesParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/grades/download-grades/student/${params.id}`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      responseType: 'arraybuffer',
    })
      .then((response: AxiosResponse<Blob | undefined>) => {
        setDataFile(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { dataFile, download };
};
