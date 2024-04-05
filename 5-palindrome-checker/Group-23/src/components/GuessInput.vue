<script setup lang="ts">
import { WORD_SIZE } from '@/settings'
import { ref, computed, onMounted } from 'vue'
import englishWords from '@/englishWordsWith5Letters.json'
import GuessView from '@/components/GuessView.vue'
import { fiveLetterPalindrome } from '../settings.ts'

withDefaults(defineProps<{ disabled?: boolean }>(), { disabled: false })

const emit = defineEmits<{
  'guess-submitted': [guess: string]
}>()

const word = ref<string | null>(null)

const hasFailedValidation = ref<boolean>(false)

const formattedWord = computed<string>({
  get: () => word.value ?? '',
  set: (value: string) => {
    word.value = null
    word.value = value
      .slice(0, WORD_SIZE)
      .toUpperCase()
      .replace(/[^A-Z]+/gi, '')
  }
})

//define input to hold the input element
const Input = ref<HTMLInputElement | null>(null)

const onSubmit = () => {
  if (
    !englishWords.includes(formattedWord.value) &&
    !fiveLetterPalindrome.includes(formattedWord.value)
  ) {
    hasFailedValidation.value = true
    setTimeout(() => (hasFailedValidation.value = false), 500)
    return
  }
  emit('guess-submitted', formattedWord.value)

  word.value = null
}

const onKeyDown = (event: KeyboardEvent) => {
  const char = event.key.toUpperCase()
  if (
    (!/^[A-Z]$/.test(char) || formattedWord.value.length >= WORD_SIZE) &&
    char !== 'BACKSPACE' &&
    char !== 'DELETE'
  ) {
    event.preventDefault()
  }
}

onMounted(() => {
  if (Input.value !== null) {
    Input.value.focus()
  }
})
</script>

<template>
  <guess-view v-if="!disabled" :class="{ shake: hasFailedValidation }" :guess="formattedWord" />

  <input
    type="text"
    name="word"
    id="word"
    :maxlength="WORD_SIZE"
    :disabled="disabled"
    aria-label="Make your guess for the word of the day!"
    v-model="formattedWord"
    @keydown.enter="onSubmit"
    @keydown="onKeyDown"
    autofocus
    @blur="({ target }) => (target as HTMLInputElement).focus()"
    ref="Input"
  />
</template>

<style scoped>
input {
  position: absolute;
  opacity: 0;
}

.shake {
  animation: shake;
  animation-duration: 100ms;
  animation-iteration-count: 2;
}
@keyframes shake {
  0% {
    transform: translateX(-2%);
  }
  25% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(2%);
  }
  75% {
    transform: translateX(0);
  }
}
</style>
