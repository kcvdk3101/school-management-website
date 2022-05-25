import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { API_CORPORATION_URL } from '../../constants'

const axiosCorporation = axios.create({
  baseURL: API_CORPORATION_URL,
  headers: {
    'Content-type': 'application/json;charset=utf-8',
  },
})

// Add a request interceptor
axiosCorporation.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// Add a response interceptor
axiosCorporation.interceptors.response.use(
  function (response: AxiosResponse) {
    return response.data
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default axiosCorporation
