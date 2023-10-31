import axios from 'axios'
import { API_URL } from '../../config'

export const axiosAuthClient = axios.create({
  baseURL: `${API_URL}/auth`,
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
  },
})

// axiosAuthClient.interceptors.request.use((config) => {
//   config.headers = {
//     ...config.headers,
//     Authorization: 'Bearer ' + localStorage.getItem('token'),
//   }

//   return config
// })
