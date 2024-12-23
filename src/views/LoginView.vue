<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const form = reactive({
  email: '',
  password: '',
})
const loading = ref(false)
const error = ref('')
const authStore = useAuthStore()

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    await authStore.login(form.email, form.password)
    console.log('Login successful:', authStore.user)
    router.push('/home')
  } catch (error) {
    console.error('Login error:', error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Ernerdo ChatBot</h2>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            v-model="form.email"
            placeholder="Enter your email"
            required
            :disabled="loading"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            v-model="form.password"
            placeholder="Enter your password"
            required
            :disabled="loading"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          :disabled="loading"
          class="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
        >
          {{ loading ? 'Loading...' : 'Login' }}
        </button>
      </form>
      <p v-if="error" class="text-red-500 text-sm mt-4">{{ error }}</p>
    </div>
  </div>
</template>
