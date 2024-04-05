<script setup lang="ts">
import WordleBoard from './components/WordleBoard.vue'
import { fiveLetterPalindrome } from './settings.ts'
let wordOfTheDay = fiveLetterPalindrome[Math.floor(Math.random() * fiveLetterPalindrome.length)]
</script>

<template>
  <wordle-board :word-of-the-day="wordOfTheDay" />
</template>
