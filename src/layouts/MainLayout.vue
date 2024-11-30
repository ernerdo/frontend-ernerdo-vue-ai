<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
const authStore = useAuthStore()
const router = useRouter()

const logOut = () => {
  authStore.logout()
  router.push('/login')
}
const currentYear = new Date().getFullYear()
</script>
<template>
  <div>
    <header class="main-header">
      <nav>
        <RouterLink to="/home">Home</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
        <button @click="logOut()">Logout</button>
      </nav>
    </header>
    <main class="main-content">
      <RouterView />
    </main>
    <footer class="main-footer">
      <p>&copy; {{ currentYear }}</p>
    </footer>
  </div>
</template>

<style scoped>
.main-header {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #007bff;
  color: white;
  padding: 1rem;
}

.main-header nav {
  display: flex;
  gap: 1rem;
}

.main-header nav a {
  text-decoration: none;
  color: white;
  font-weight: bold;
  transition: color 0.3s ease;
}

.main-header nav a:hover {
  color: #ffcc00;
}

.main-content {
  min-height: 80vh;
  padding: 2rem;
  background-color: #f8f9fa;
}

.main-footer {
  text-align: center;
  padding: 1rem;
  background-color: #343a40;
  color: white;
}
</style>
