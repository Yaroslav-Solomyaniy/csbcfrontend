import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { AuthContext } from '../../../context/All/AuthContext';
import { MessagesContext } from '../../../context/All/Messages';

interface IDownloadPlanParams {
  id: number;
  semester: number;
}

export interface IUseDownloadPlan {
  dataFile: Blob | undefined;
  download: (params: IDownloadPlanParams) => void;
}

export const useDownloadPlan = (): IUseDownloadPlan => {
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [dataFile, setDataFile] = useState<Blob | undefined>();

  const download = (params: IDownloadPlanParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/students/download-individual-plan/${params.id}`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      responseType: 'arraybuffer',
      params: { semester: params.semester },
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
