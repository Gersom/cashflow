import axios from 'axios';

const createRequest = (method) => (options) => 
  axios({
    method,
    withCredentials: true,
    ...options
  });

export const apiPost = createRequest('POST');
export const apiGet = createRequest('GET');
export const apiPut = createRequest('PUT');
export const apiDel = createRequest('DELETE');
export const apiPatch = createRequest('PATCH');