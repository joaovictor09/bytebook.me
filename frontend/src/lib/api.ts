import axios from 'axios'
import { useAuth } from '@/stores/use-auth'

export const api = axios.create({
  baseURL: 'http://localhost:3333',
  withCredentials: true,
})

let isRefreshing = false
let failedQueue: Array<{
  resolve: (value?: unknown) => void
  reject: (error: unknown) => void
}> = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error)
    else resolve(token)
  })
  failedQueue = []
}

// Intercepta todas as respostas
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const auth = useAuth.getState()

    if (!originalRequest) return Promise.reject(error)

    const isAuthRoute = ['/refresh', '/sessions'].some((route) =>
      originalRequest.url?.includes(route),
    )

    if (
      error.response?.status === 401 &&
      !(originalRequest as any)._retry &&
      !isAuthRoute
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            if (!token) return Promise.reject(new Error('No token'))
            originalRequest.headers.Authorization = `Bearer ${token}`
            return api(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      ;(originalRequest as any)._retry = true
      isRefreshing = true

      try {
        const response = await api.post('/refresh')
        const newToken = response.data.access_token

        auth.setAccessToken(newToken)
        processQueue(null, newToken)

        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return api(originalRequest)
      } catch (err) {
        processQueue(err, null)
        auth.logout()
        window.location.href = '/auth/sign-in' // redirect opcional
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  },
)

// Intercepta todas as requisições
api.interceptors.request.use((config) => {
  const token = useAuth.getState().accessToken
  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
