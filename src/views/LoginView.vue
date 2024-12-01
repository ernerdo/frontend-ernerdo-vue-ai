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
  <div class="login-container">
    <div class="card">
      <h2 class="title">Ernerdo ChatBot</h2>
      <form @submit.prevent="handleLogin">
        <div class="field">
          <label for="email">Email</label>
          <input
            id="email"
            type="email"
            v-model="form.email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div class="field">
          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            v-model="form.password"
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 1rem;
}

.card {
  background: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.title {
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  font-weight: bold;
  color: #333333;
}

.field {
  margin-bottom: 1.5rem;
  text-align: left;
}

.field label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333333;
}

.field input {
  width: 100%;
  padding: 0.9rem;
  font-size: 1.1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  box-sizing: border-box;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.field input:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

button {
  width: 100%;
  padding: 0.9rem;
  font-size: 1.1rem;
  font-weight: bold;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-sizing: border-box;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
}

button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

button:active {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .card {
    padding: 1.5rem;
  }

  .title {
    font-size: 1.5rem;
  }

  button {
    font-size: 1rem;
  }
}
</style>
