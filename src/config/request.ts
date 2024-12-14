import axios, { AxiosError, AxiosResponse } from "axios";
import i18n from "../locales/i18n";
import { Alert } from "react-native";
import jwt_decode from 'jwt-decode'
import { getAcToken } from "../utils/store";

const API_BASE_URL = 'http://localhost:8000/api'

let errorMessages = [] as string[]

const service = axios.create({
  baseURL: API_BASE_URL,
  maxBodyLength: Infinity
})

// Request interceptors
service.interceptors.request.use(
  async(config) => {
    const acToken = await getAcToken()
    if (acToken.length > 0) {
      const decodeToken: any = await jwt_decode(acToken)
      const nowInSecs = Date.now() / 1000
      const isExpiring = (decodeToken.exp - nowInSecs) < 0
      if (!isExpiring) {
        config.headers.Authorization = `Bearer ${acToken}`
      }
      config.headers['Content-type'] = 'application/json'
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// Response interceptors
service.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data
  },
  (error: AxiosError) => {
    if (!error?.response) {
      errorMessages.push(i18n.t('message.serverConnectError'))
      return Promise.reject(new Error(i18n.t('message.serverConnectError')))
    }

    const { status, data: { message, data } } = error.response

    switch (status) {
      case 301:
        errorMessages.push(i18n.t('message.movedPermanently'))
        return Promise.reject(new Error(i18n.t('message.movedPermanently')))
      case 401:
      case 403:
        errorMessages.push(i18n.t('message.forbiddenError'))
        return Promise.reject(new Error(i18n.t('message.forbiddenError')))
      case 404:
        errorMessages.push(i18n.t('message.notFoundError'))
        return Promise.reject(new Error(i18n.t('message.notFoundError')))
      case 500:
        errorMessages.push(i18n.t('message.serverConnectError'))
        return Promise.reject(new Error(i18n.t('message.serverConnectError')))
      default:
        return Promise.reject(new Error(i18n.t('message.serverConnectError')))
    }
  }
)

const showErrorMessages = () => {
  errorMessages.forEach(message => {
    Alert.alert(
      `Error: ${message}`,
      '',
      [{
        text: 'Ok',
      }]
    );
  })
  errorMessages = []
};

export default service