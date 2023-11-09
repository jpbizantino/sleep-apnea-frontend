import axios from 'axios'
import { API_URL } from '../../../../../../../Clínica San Miguel/CSM-Frontend-TS/src/config'

export const axiosSurveyClient = axios.create({
  baseURL: `${API_URL}/surveys`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

axiosSurveyClient.interceptors.request.use((config) => {
  config.headers.setAuthorization('Bearer ' + localStorage.getItem('token'))
  return config
})
