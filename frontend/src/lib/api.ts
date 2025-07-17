import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3333',
  withCredentials: true,
})

// Isso garante que mesmo fora do Zustand, ele pega a função logout atual
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Importação dinâmica para evitar erro de contexto
      import('@/stores/use-auth').then(({ useAuth }) => {
        useAuth.getState().logout()
      })
    }

    return Promise.reject(error)
  },
)
