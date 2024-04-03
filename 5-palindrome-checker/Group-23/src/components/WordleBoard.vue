<script setup lang="ts">
import { VICTORY_MSG, DEFEAT_MSG, MAX_GUESSES_COUNT } from '@/settings'
import englishWords from '@/englishWordsWith5Letters.json'
import GuessInput from './GuessInput.vue'
import { ref, computed } from 'vue'
import GuessView from '@/components/GuessView.vue'
import PalindromeAnimation from '@/components/PalindromeAnimation.vue'
import { fiveLetterPalindrome } from '../settings.ts'

const props = defineProps({
  wordOfTheDay: {
    type: String,
    validator: (value: string) =>
      englishWords.includes(value) || fiveLetterPalindrome.includes(value),
    required: true
  }
})

const guessSubmitted = ref<string[]>([])
const modalShow = ref(true)

const isGameOver = computed(
  () =>
    guessSubmitted.value.length == MAX_GUESSES_COUNT ||
    guessSubmitted.value.includes(props.wordOfTheDay)
)

const countOfEmptyGuesses = computed(() => {
  const guessesRemaining = MAX_GUESSES_COUNT - guessSubmitted.value.length
  return isGameOver.value ? guessesRemaining : guessesRemaining - 1
})
</script>

<template>
  <main>
    <div v-if="!modalShow">
      <div>
        <h1 class="text-center text-xl font-extrabold">Wordle Palindrome Game</h1>
        <br />
        <button class="text-green-500 border-none" @click="modalShow = true">
          Palindrome Checker
        </button>
        <br /><br />
      </div>
      <ul>
        <li v-for="(guess, index) in guessSubmitted" :key="`${index}-${guess}`">
          <guess-view :guess="guess" :answer="wordOfTheDay" />
        </li>

        <li>
          <guess-input
            :disabled="isGameOver"
            @guess-submitted="
              (guess) => {
                console.log(wordOfTheDay, ': wordOfTheDay')
                guessSubmitted.push(guess)
              }
            "
          />
        </li>

        <li v-for="i in countOfEmptyGuesses" :key="`remaining-guess-${i}`">
          <guess-view guess="" />
        </li>
      </ul>
      <p
        class="end-of-game-message"
        v-if="isGameOver"
        v-text="
          guessSubmitted.includes(wordOfTheDay)
            ? VICTORY_MSG
            : DEFEAT_MSG + 'expected: ' + wordOfTheDay
        "
      ></p>
    </div>

    <div v-if="modalShow" class="modal z-10 absolute">
      <div class="innerWrapper absolute self-center backdrop-blur-sm z-50 w-4/5">
        <button class="text-red-500 font-semibold self-center" @click="modalShow = false">
          Play Game
        </button>
        <palindrome-animation
          :word="guessSubmitted[guessSubmitted.length - 1]"
          :reversedWord="guessSubmitted[guessSubmitted.length - 1]?.split('').reverse().join('')"
        />
      </div>
    </div>
  </main>
</template>

<style scoped>
.innerWrapper {
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.modal {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
}
ul {
  margin: 0;
  padding: 0;
}
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
}
.end-of-game-message {
  font-size: 3rem;
  animation: end-of-game-message-animation 700ms forwards;
  white-space: nowrap;
  text-align: center;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
li {
  margin-bottom: 0.25rem;
}

@keyframes end-of-game-message-animation {
  0% {
    opacity: 0;
    transform: rotateZ(0);
  }
  100% {
    opacity: 1;
    transform: translateY(2rem);
  }
}
</style>
