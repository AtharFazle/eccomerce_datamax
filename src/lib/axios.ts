import { API_URL } from '@/constant'
import axios from 'axios'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Middleware auth: tambahkan token jika kamu pakai json-server-auth
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
