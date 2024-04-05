<script setup lang="js">
import { ref } from 'vue'

import anime from 'animejs/lib/anime.es.js'

const word = ref('')

const start = ref(true)
let timeline = anime.timeline({
  easing: 'easeOutExpo',
  duration: 50,
  delay: anime.stagger(1000)
})

const toggleStart = () => {
  start.value = !start.value
  if (start.value) {
    timeline.play()
  } else {
    timeline.pause()
  }
}

function animate(str) {
  console.log('this is: ', str)
  //animate words
  let strArr = Array.from(document.querySelectorAll('.box'))
  strArr.forEach((el, i) => {
    timeline.add({
      targets: el,
      translateX: [0, 100],
      opacity: [1, 0],
      delay: i * 100
    })

    timeline
      .add({
        targets: el,
        translateX: 100 * (str.length - i),
        translateY: 0,
        opacity: [0, 0.5]
      })
      .add({
        targets: el,
        translateX: 100 * (str.length - i),
        translateY: -100,
        opacity: 0.75
      })
      .add({
        targets: el,
        translateX: 100 * (str.length - i) - (i + 1) * 20 + -150,
        translateY: -100,
        opacity: 1
      })
  })

  check(str, strArr, timeline)
}

function check(str, strArr, timeline) {
  let lastIndex = str.length - 1
  for (let i = 0; i < Math.floor(str.length / 2); i++) {
    if (strArr[i].innerHTML == strArr[str.length - 1 - i].innerHTML) {
      timeline
        .add({
          targets: strArr[i],
          backgroundColor: '#00ff00',
          duration: 1000,
          delay: i * 100
        })
        .add({
          targets: strArr[lastIndex - i],
          backgroundColor: '#00ff00',
          duration: 1000,
          delay: i * 100
        })
    } else {
      timeline
        .add({
          targets: strArr[i],
          backgroundColor: '#ff0000',
          duration: 1000,
          delay: i * 100
        })
        .add({
          targets: strArr[lastIndex - i],
          backgroundColor: '#ff0000',
          duration: 1000,
          delay: i * 100
        })
      break
    }
  }
  setTimeout(() => displayText(timeline), 100)
}

function displayText(timeline) {
  timeline
    .add({
      duration: 1000,
      delay: (el, i) => 70 * i,
      endDelay: 500
    })
    .add({
      targets: 'div .letter',
      scale: [4, 1],
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 1000,
      delay: (el, i) => 70 * i,
      endDelay: 2000
    })
}

function reset() {
  window.location.reload()
}

const checkPalindrome = () =>
  word.value.replace(/\s+/g, '').toLowerCase() ===
  word.value.replace(/\s+/g, '').split('').reverse().join('').toLowerCase()
function longestPalindrome(str) {
  var s = str.toLowerCase()
  var arr = 'abcdefghijklmnopqrstuvwxyz0123456789'
  var count = 0
  for (var i = 0; i < arr.length; ++i) {
    var c = 0
    for (var j = 0; j < s.length; ++j) if (s[j] == arr[i]) c++
    count += Math.floor(c / 2) * 2
  }
  return count == s.length ? count : ++count
}

// onMounted(() => {
//   checkPalindrome()
// })
</script>

<template>
  <div class="container mx-auto">
    <div class="flex justify-center items-center">
      <div>
        <h1 class="text-xl font-bold text-center">Palindrome Checker</h1>
        <div>
          <form @submit.prevent="checkPalindrome">
            <div class="flex flex-col space-y-4">
              <label for="word" class="text-sm">Enter a word: </label>
              <input
                v-model="word"
                type="text"
                name="word"
                id="word"
                class="border border-gray-300 rounded-md p-2"
              />
              <div class="flex gap-4">
                <button
                  type="submit"
                  class="bg-blue-500 text-white rounded-md px-3 py-2"
                  @click="animate(word)"
                >
                  Check
                </button>
                <button
                  type="submit"
                  class="bg-red-500 text-white rounded-md px-3 py-2"
                  @click="reset"
                >
                  Reset
                </button>
              </div>
            </div>
          </form>
        </div>
        <br /><br />

        <div v-if="word.length > 0">
          <!-- display spinner -->
          <p class="font-semi text-xl">
            Checking if
            <span class="font-bold text-xl text-blue-500">{{ word }}</span>
            is a palindrome...
          </p>
          <br />

          <p
            v-text="
              checkPalindrome() ? `${word} is Palindrome: true` : `${word} is Palindrome: false`
            "
            class="font-bold text-xl text-blue-500"
          ></p>
          <p class="font-bold text-xl text-blue-500">
            Longest palindrome word you can form: <span v-text="longestPalindrome(word)"></span>
          </p>

          <br /><br /><br />
          <div class="flex gap-4 my-5">
            <button
              @click="toggleStart"
              class="px-4 py-2 rounded border border-green-500 text-semibold capitalize hover:text-white hover:bg-green-500"
              v-if="!start"
            >
              continue
            </button>
            <button
              @click="toggleStart"
              class="px-4 py-2 rounded border border-red-500 text-semibold capitalize hover:text-white hover:bg-red-500"
              v-else
            >
              pause
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center items-center gap-4">
      <template v-for="letter in word" :key="letter">
        <div
          class="box flex justify-center items-center text-white font-semibold rounded bg-black"
          style="height: 50px; width: 50px"
        >
          {{ letter }}
        </div>
      </template>
    </div>

    <div class="flex justify-center items-center gap-4">
      <template v-for="letter in word" :key="letter">
        <div
          class="box2 flex justify-center items-center text-white font-semibold rounded bg-black opacity-0"
          style="height: 50px; width: 50px"
        >
          {{ letter }}
        </div>
      </template>
    </div>

    <div class="flex flex-row justify-center items-center gap-4">
      <template
        v-for="letter in `${word} is ${checkPalindrome ? 'a' : 'NOT a'} palindrome!`"
        :key="letter"
      >
        <span
          class="letter text-lg font-bold"
          :class="word.length > 0 ? 'inline-block' : 'hidden'"
          >{{ letter }}</span
        >
      </template>
    </div>
  </div>
</template>
