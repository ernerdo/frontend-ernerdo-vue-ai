<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
const AI_API_URL = import.meta.env.VITE_AI_API_URL

const input = ref('')
const messages = ref<{ sender: string; text: string }[]>([])
const loading = ref(false)

const sendMessage = async () => {
  if (!input.value.trim() || input.value.length > 100) return

  messages.value.push({ sender: 'user', text: input.value })

  const userMessage = input.value
  input.value = ''
  loading.value = true

  try {
    const response = await axios.post(
      `${AI_API_URL}/ask`,
      { prompt: userMessage },
      { headers: { 'Content-Type': 'application/json' } },
    )

    messages.value.push({ sender: 'bot', text: response.data })
  } catch (error) {
    console.error(error)
    messages.value.push({
      sender: 'bot',
      text: "Sorry, I couldn't process your request.",
    })
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <section class="chat-container">
    <div class="chat-box">
      <div v-for="(message, index) in messages" :key="index" class="message">
        <div :class="['bubble', message.sender === 'user' ? 'user' : 'bot']">
          {{ message.text }}
        </div>
      </div>
    </div>
    <form class="input-container" @submit.prevent="sendMessage">
      <textarea
        v-model="input"
        placeholder="Type your message..."
        class="chat-textarea"
        required
        :disabled="loading"
        maxlength="100"
      ></textarea>
      <button type="submit" class="send-button" :disabled="loading">
        {{ loading ? 'Sending...' : 'Send' }}
      </button>
    </form>
    <p class="char-counter">{{ input.length }}/100 characters</p>
  </section>
</template>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 50%;
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.chat-textarea {
  flex-grow: 1;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  font-size: 1rem;
  resize: none;
  height: 50px;
  background-color: #fff;
  transition: background-color 0.3s ease;
}
.chat-textarea:disabled {
  background-color: #f0f0f0;
  cursor: not-allowed;
}

.char-counter {
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.5rem;
  text-align: right;
}

.chat-box {
  flex-grow: 1;
  overflow-y: auto;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.message {
  margin-bottom: 1rem;
}

.bubble {
  padding: 0.8rem 1rem;
  border-radius: 20px;
  max-width: 75%;
  word-wrap: break-word;
}

.user {
  background-color: #007bff;
  color: white;
  align-self: flex-end;
}

.bot {
  background-color: #f1f1f1;
  color: #333;
  align-self: flex-start;
}

/* Contenedor del input */
.input-container {
  display: flex;
  gap: 0.5rem;
}

.chat-input {
  flex-grow: 1;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 20px;
  outline: none;
  font-size: 1rem;
  background-color: #fff;
  transition: background-color 0.3s ease;
}

.chat-input:disabled {
  background-color: #f0f0f0;
  cursor: not-allowed;
}

.send-button {
  padding: 0.8rem 1rem;
  border: none;
  border-radius: 20px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
}

.send-button:hover {
  background-color: #0056b3;
}

.send-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

/* Diseño Responsivo */
@media (max-width: 768px) {
  .chat-container {
    height: 90vh;
    padding: 0.5rem;
  }

  .chat-input {
    font-size: 0.9rem;
  }

  .send-button {
    font-size: 0.9rem;
    padding: 0.7rem 1rem;
  }
}
</style>
