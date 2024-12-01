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
        <button v-if="authStore.isAuthenticated()" @click="logOut">Logout</button>
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
  justify-content: flex-end;
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

.main-header nav button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: bold;
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
}

.main-header nav button:hover {
  background-color: #d9363e;
  transform: translateY(-2px);
}

.main-header nav button:active {
  transform: translateY(0);
}

.main-header nav button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
