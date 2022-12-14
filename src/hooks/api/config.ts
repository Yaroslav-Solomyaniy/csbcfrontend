import axios, { AxiosRequestConfig } from 'axios';
import { MessagesContext } from '../../context/All/Messages';

const $api = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL,
});

interface IAxiosInterceptor{
  children: JSX.Element;
}
const AxiosInterceptor = ({ children }:IAxiosInterceptor) => {
  const { addErrors } = MessagesContext();

  $api.interceptors.request.use((config:AxiosRequestConfig) => {
    // eslint-disable-next-line no-param-reassign
    (config.headers ??= {}).Authorization = `Bearer ${JSON.parse(sessionStorage.accessToken)}`;

    return config;
  });

  $api.interceptors.response.use(
    (response) => response,
    (error) => new Promise((resolve) => {
      const originalRequest = error.config;
      const accessToken = JSON.parse(sessionStorage.accessToken);

      // eslint-disable-next-line no-underscore-dangle
      if (error.response && error.response.status === 401 && error.config && !error.config.__isRetryRequest && accessToken) {
        // eslint-disable-next-line no-underscore-dangle
        originalRequest._retry = true;
        const response = fetch((`${process.env.REACT_APP_API_URL}/auth/refresh-token`), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then((res) => res.json())
          .then((res) => {
            localStorage.setItem('accessToken', JSON.stringify(res.accessToken));
            localStorage.setItem('refreshToken', JSON.stringify(res.refreshToken));
            sessionStorage.setItem('accessToken', JSON.stringify(res.accessToken));
            sessionStorage.setItem('refreshToken', JSON.stringify(res.refreshToken));

            return axios(
              { ...originalRequest,
                headers: { ...originalRequest.headers,
                  Authorization: `Bearer ${JSON.parse(sessionStorage.accessToken)}`,
                  'Content-Type': 'application/json' } },
            );
          });

        resolve(response);
      }

      addErrors(error.response.status === 401 ? 'Невідома помилка' : error.response.data.message);
    }),
  );

  return children;
};

export { AxiosInterceptor };
export default $api;
