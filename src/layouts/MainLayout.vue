<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
const authStore = useAuthStore()
const router = useRouter()

const logOut = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="grid grid-rows-[50px_1fr] h-screen bg-[#f8f9fa]">
    <header
      class="row-span-1 flex justify-end items-center px-4 bg-[#007bffe7] text-white"
      v-if="authStore.isAuthenticated()"
    >
      <nav class="flex space-x-4">
        <!-- Botón de Logout -->
        <button
          class="bg-white text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 border border-gray-200 flex items-center gap-2 transition-colors"
          @click="logOut"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>
          Logout
        </button>
      </nav>
    </header>

    <main class="row-span-1 h-full p-4 bg-[#f8f9fa]">
      <RouterView />
    </main>
  </div>
</template>

