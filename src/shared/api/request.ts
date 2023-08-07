import axios from 'axios';
import {attach, createEffect} from 'effector';

interface Request {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  instance?: 'mockapi' | 'api';
}

axios.defaults.withCredentials = true;

export const api = axios.create({
  baseURL: 'http://localhost:9090/api/v1',
  withCredentials: true,
});

export const mockapi = axios.create({
  baseURL: '/api',
  //timeout: 5000,
  validateStatus: (status) => status >= 200 && status < 300,
});

export const requestFx = createEffect<Request, any>((request) => {
  const selectedApi = request.instance === 'api' ? api : mockapi;

  return selectedApi({
    method: request.method,
    url: request.path,
    data: request.body,
    withCredentials: true,
  })
    .then((response) => {
      return response.data;
    })
    .catch((response) => Promise.reject(response.response.data));
});

export const requestApiFx = attach({
  effect: requestFx,
  mapParams: (params): Request => {
    return {
      ...params,
      instance: 'api',
    };
  },
});

export const requestMockApiFx = attach({
  effect: requestFx,
  mapParams: (params): Request => {
    return {
      ...params,
      instance: 'mockapi',
    };
  },
});
