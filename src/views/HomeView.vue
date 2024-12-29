<script setup lang="ts">
import axios from 'axios'
import { nextTick, ref } from 'vue'
import { useAuthStore } from '../stores/auth'
const AI_API_URL = import.meta.env.VITE_AI_API_URL

const input = ref('')
const authStore = useAuthStore()
const chatBox = ref<HTMLDivElement | null>(null)
const messages = ref<{ sender: string; text: string }[]>([])
const loading = ref(false)

const sendMessage = async () => {
  if (!input.value.trim() || input.value.length > 100) return

  messages.value.push({ sender: 'user', text: input.value })

  const userMessage = input.value
  input.value = ''
  loading.value = true

  await nextTick()
  scrollToBottom()
  try {
    const response = await axios.post(
      `${AI_API_URL}/ask`,
      { prompt: userMessage },
      { headers: { 'Content-Type': 'application/json' } },
    )

    messages.value.push({ sender: 'bot', text: response.data.message })
    authStore.updateCredits(response.data.credits)
    await nextTick()
    scrollToBottom()
  } catch (error) {
    console.error(error)
    messages.value.push({
      sender: 'bot',
      text: "Sorry, I couldn't process your request.",
    })
    await nextTick()
    scrollToBottom()
  } finally {
    loading.value = false
  }
}
const scrollToBottom = () => {
  if (chatBox.value) {
    chatBox.value.scrollTop = chatBox.value.scrollHeight
  }
}
</script>
<template>
  <section
    class="flex flex-col justify-between h-1/2 max-w-xl mx-auto p-4 border border-gray-300 rounded-lg shadow-md overflow-hidden"
  >
    <div
      class="h-[40vh] md:h-[60vh] overflow-y-auto p-4 mb-4 bg-white border border-gray-300 rounded-lg"
      ref="chatBox"
    >
      <div
        v-for="(message, index) in messages"
        :key="index"
        :class="['mb-4 flex', message.sender === 'user' ? 'flex-row-reverse' : 'justify-start']"
      >
        <!-- Ícono -->
        <div
          class="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white"
          :class="message.sender === 'user' ? 'bg-blue-500' : 'bg-gray-300'"
        >
          <span v-if="message.sender === 'user'">😎</span>
          <span v-else>🤖</span>
        </div>
        <!-- Burbuja de Mensaje -->
        <div
          :class="[
            'px-4 py-2 rounded-lg max-w-3/4 break-words ml-2',
            message.sender === 'user'
              ? 'bg-blue-500 text-white self-end'
              : 'bg-gray-100 text-gray-800 self-start',
          ]"
        >
          {{ message.text }}
        </div>
      </div>
    </div>
    <div v-if="authStore.user.credits !== 0">
      <form class="flex gap-2" @submit.prevent="sendMessage">
        <textarea
          v-model="input"
          placeholder="Type your message..."
          required
          :disabled="loading"
          maxlength="100"
          class="flex-grow p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring focus:ring-blue-200"
        ></textarea>
        <button
          type="submit"
          :disabled="loading"
          class="py-2 px-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
        >
          {{ loading ? 'Sending...' : 'Send' }}
        </button>
      </form>
      <div class="flex justify-between mt-4">
        <p class="text-left text-sm text-gray-600 mt-2">{{ authStore?.user?.credits }} credits</p>
        <p class="text-right text-sm text-gray-600 mt-2">{{ input.length }}/100 characters</p>
      </div>
    </div>
    <div v-else>
      <p class="text-center text-red-500">
        You have no credits left. Please recharge your account or wait 24 hours to get more credits.
      </p>
    </div>
  </section>
</template>
