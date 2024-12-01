<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
const authStore = useAuthStore()
const router = useRouter()

const logOut = () => {
  authStore.logout()
  router.push('/login')
}
</script>
<template>
  <div class="parent">
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
  </div>
</template>

<style scoped>
.parent {
  display: grid;
  grid-template-areas: 'header' 'main';
  grid-template-columns: 100%;
  grid-template-rows: 50px 1fr;
  height: 100vh;
}
.main-header {
  grid-area: header;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #007bffe7;
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
  grid-area: main;
  height: 100%;
  padding: 1rem;
  background-color: #f8f9fa;
}
</style>
