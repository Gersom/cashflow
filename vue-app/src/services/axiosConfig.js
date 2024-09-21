import axios from 'axios'

const mode = import.meta.env.MODE
const isDevelopment = mode === 'development'
const isProduction = mode === 'production'
const backendUrlDev = import.meta.env.VITE_DEV_BACKEND_URL
const backendUrlProd = import.meta.env.VITE_PROD_BACKEND_URL

if (isDevelopment) {
  console.log('ENV:', mode)
  console.log('DEV BACK URL:', backendUrlDev)
  console.log('PROD BACK URL:', backendUrlProd)
}

// Función para crear una instancia de Axios con baseURL y withCredentials
export function createAxiosInstance () {
  const backendUrl = isProduction ? backendUrlProd : backendUrlDev

  return axios.create({
    baseURL: `${backendUrl}/api`,
    withCredentials: true
  })
}

// Función para crear una instancia de Axios con baseURL, withCredentials e interceptors
export function createAxiosInstanceWithInterceptors () {
  const axiosInstance = createAxiosInstance()

  let isRefreshing = false
  let failedQueue = []

  const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
      if (error) {
        prom.reject(error)
      } else {
        prom.resolve(token)
      }
    })
    failedQueue = []
  }

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config

      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject })
          }).then(() => {
            return axiosInstance(originalRequest)
          }).catch(err => Promise.reject(err))
        }

        originalRequest._retry = true
        isRefreshing = true

        try {
          const axiosAuth = createAxiosInstance()
          const { data } = await axiosAuth.post('/auth/token/refresh')

          processQueue(null, data.access_token)
          return axiosInstance(originalRequest)
        } catch (refreshError) {
          processQueue(refreshError, null)
          return Promise.reject(refreshError)
        } finally {
          isRefreshing = false
        }
      }

      return Promise.reject(error)
    }
  )

  return axiosInstance
}

// Uso de las funciones
export const axiosDefault = createAxiosInstance()
export const axiosInterceptors = createAxiosInstanceWithInterceptors()