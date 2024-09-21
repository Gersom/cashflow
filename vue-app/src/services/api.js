import { axiosDefault, axiosInterceptors } from '@src/services/axiosConfig.js'

const createRequest = (method, path = '') => (options = {}) =>
  axiosDefault({
    method,
    ...options,
    url: path + (options.url || '')
  })

const createSpecialRequest = (method, path = '') => (options = {}) =>
  axiosInterceptors({
    method,
    ...options,
    url: path + (options.url || '')
  })

const createApiObject = (createRequestFunc, basePath = '') => ({
  get: createRequestFunc('GET', basePath),
  post: createRequestFunc('POST', basePath),
  put: createRequestFunc('PUT', basePath),
  patch: createRequestFunc('PATCH', basePath),
  delete: createRequestFunc('DELETE', basePath)
})

export const apiDefault = createApiObject(createRequest)
export const apiAuth = createApiObject(createRequest, '/auth')
export const apiAuthToken = createApiObject(createSpecialRequest, '/auth')
export const apiApp = createApiObject(createSpecialRequest, '/common')

export default {
  apiDefault,
  apiAuth,
  apiAuthToken,
  apiApp
}