import axios, { type AxiosInstance } from 'axios'

export const useApiClient = (): AxiosInstance => {
  const config = useRuntimeConfig()

  const apiClient = axios.create({
    baseURL: config.public.apiBase,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return apiClient
}
