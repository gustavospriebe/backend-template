import { AxiosRequestConfig } from "axios"

import axios from "axios"

interface ServiceConfig {
  baseURL: string
  timeout?: number
  headers?: Record<string, string>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createApiClient = (config: ServiceConfig) => {
  const client = axios.create({
    baseURL: config.baseURL,
    timeout: config.timeout || 5000,
    headers: {
      "Content-Type": "application/json",
      ...config.headers,
    },
  })

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error(`API Error: ${error.message}`)
      return Promise.reject(error)
    },
  )

  return {
    get: (path: string, config?: AxiosRequestConfig) =>
      client.get(path, config),

    post: (path: string, data?: any, config?: AxiosRequestConfig) =>
      client.post(path, data, config),

    put: (path: string, data?: any, config?: AxiosRequestConfig) =>
      client.put(path, data, config),

    delete: (path: string, config?: AxiosRequestConfig) =>
      client.delete(path, config),
  }
}

// export const profileService = createApiClient({
//   baseURL: env.PROFILE_SERVICE_URL || "",
// })
