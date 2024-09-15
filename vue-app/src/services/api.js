import { axiosApi, axiosAuth } from '@src/services/axiosConfig.js';

const createRequest = (method) => (options) =>
  axiosAuth({
    method,
    ...options
  });


const createSpecialRequest = (method) => (options) =>
  axiosApi({
    method,
    ...options
  });

export const apiPost = createRequest('POST');
export const apiGet = createRequest('GET');
export const apiPut = createRequest('PUT');
export const apiDel = createRequest('DELETE');
export const apiPatch = createRequest('PATCH');

export const apiPostAuth = createSpecialRequest('POST');
export const apiGetAuth = createSpecialRequest('GET');
export const apiPutAuth = createSpecialRequest('PUT');
export const apiDelAuth = createSpecialRequest('DELETE');
export const apiPatchAuth = createSpecialRequest('PATCH');