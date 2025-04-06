// src/services/ApiService.js

import axios from 'axios'
import type { AxiosResponse } from 'axios'

const API_BASE_URL = 'https://api.escuelajs.co/api/v1'

class ApiService {
  axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })

  async get<T>(endpoint: string): Promise<AxiosResponse<T>> {
    try {
      const response = await this.axiosInstance.get<T>(endpoint)
      return response
    } catch (error) {
      console.error('Error in GET request', error)
      throw error
    }
  }
}

export default new ApiService()
