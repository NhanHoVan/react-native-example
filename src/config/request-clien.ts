import axios, { AxiosError, AxiosResponse } from "axios";

const TRANSLATION_GOOGLE_URL = 'https://translation.googleapis.com/language'

const service = axios.create({
  baseURL: TRANSLATION_GOOGLE_URL
})

// Request interceptors
service.interceptors.request.use(
  async(config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptors
service.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data
  },
  (error: AxiosError) => {
    if (error?.message) {
      return Promise.reject(new Error(error.message))
    }
  }
)

export default service