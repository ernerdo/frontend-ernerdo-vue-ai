import axios from 'axios'
import { defineStore } from 'pinia'
export const AI_API_URL = import.meta.env.VITE_AI_API_URL

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: null as string | null,
    refreshToken: null as string | null,
    user: null as object | null,
  }),

  actions: {
    async login(email: string, password: string) {
      try {
        const response = await axios.post(
          `${AI_API_URL}/login`,
          { email, password },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )

        this.accessToken = response.data.access_token
        this.refreshToken = response.data.refresh_token
        this.user = response.data.user

        axios.defaults.headers.common['Authorization'] = `Bearer ${this.accessToken}`
      } catch (error) {
        console.error('Login failed:', error)
        throw error
      }
    },

    logout() {
      this.accessToken = null
      this.refreshToken = null
      this.user = null
      delete axios.defaults.headers.common['Authorization']
    },
  },

  getters: {
    isAuthenticated: (state) => !!state.accessToken,
  },
})