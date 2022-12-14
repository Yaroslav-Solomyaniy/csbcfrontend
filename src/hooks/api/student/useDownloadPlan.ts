import { useState } from 'react';
import { AxiosResponse } from 'axios';
import $api from '../config';

interface IDownloadPlanParams {
  id: number;
  semester: number;
}

export interface IUseDownloadPlan {
  dataFile: Blob | undefined;
  download: (params: IDownloadPlanParams) => void;
}

export const useDownloadPlan = (): IUseDownloadPlan => {
  const [dataFile, setDataFile] = useState<Blob | undefined>();

  const download = (params: IDownloadPlanParams) => {
    $api.get(`/students/download-individual-plan/${params.id}`, {
      responseType: 'arraybuffer',
      params: { semester: params.semester },
    })
      .then((response: AxiosResponse<Blob | undefined>) => {
        setDataFile(response.data);
      });
  };

  return { dataFile, download };
};
