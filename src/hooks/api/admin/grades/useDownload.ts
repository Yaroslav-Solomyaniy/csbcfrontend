import { useState } from 'react';
import { AxiosResponse } from 'axios';
import $api from '../../config';

interface IDownloadGradesParams {
  id: number;
}

export interface IUseDownloadGrades {
  dataFile: Blob | undefined;
  download: (params: IDownloadGradesParams) => void;
}

export const useDownloadGrades = (): IUseDownloadGrades => {
  const [dataFile, setDataFile] = useState<Blob | undefined>();

  const download = (params: IDownloadGradesParams) => {
    $api.get(`/grades/download-grades/student/${params.id}`, {
      responseType: 'arraybuffer',
    })
      .then((response: AxiosResponse<Blob | undefined>) => {
        setDataFile(response.data);
      });
  };

  return { dataFile, download };
};
