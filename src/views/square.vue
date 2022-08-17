<script setup>
import { pitchColor, rotateArray, getCircleCoord, notes, useTuner } from 'chromatone.center'

import { ref, computed } from 'vue'
import { useClamp } from '@vueuse/math'
import { useDrag } from '@vueuse/gesture'


const props = defineProps({
  tuner: Object
})

const stage = ref()

const blur = useClamp(0, 0, 1)
const radius = useClamp(2, 1, 3)

useDrag(e => {
  const { delta: [x, y] } = e
  blur.value += x / 100
  radius.value -= y / 100
}, {
  domTarget: stage
})

function getRect(n, w = 100, h = 100) {
  let posX, posY, x, y
  if (false) {
    posX = n % 4
    posY = Math.floor(n / 4) + 1
    if (n > 3 && n < 8) { posX = 3 - posX }
  } else {
    switch (n) {
      case 0: posX = 0; posY = 0; break;
      case 1: posX = 1; posY = 0; break;
      case 2: posX = 2; posY = 0; break;
      case 3: posX = 3; posY = 0; break;
      case 4: posX = 3; posY = 1; break;
      case 5: posX = 3; posY = 2; break;
      case 6: posX = 3; posY = 3; break;
      case 7: posX = 2; posY = 3; break;
      case 8: posX = 1; posY = 3; break;
      case 9: posX = 0; posY = 3; break;
      case 10: posX = 0; posY = 2; break;
      case 11: posX = 0; posY = 1; break;
    }
  }
  return `translate(${posX * w / 4},${posY * h / 4})`
}
</script>

<template lang="pug">
g(ref="stage")
  defs 
    filter#blur(x="-1" y="-1" width="3000" height="3000")
      feGaussianBlur(in="SourceGraphic" :stdDeviation="blur")
    filter#blur-more(x="-1" y="-1" width="30" height="30")
      feGaussianBlur(in="SourceGraphic" :stdDeviation="blur * 2")
  rect(
    style="user-select:none;transition:all 300ms ease"
    x="25" y="25" width="50" height="50"
    :fill="tuner.note.silent ? '#333' : tuner?.note.color"
    )
  text(
    style="user-select:none;transition:all 300ms ease"
    fill="white"
    font-family="Commissioner, sans-serif"
    font-size="3px"
    text-anchor="middle",
    dominant-baseline="middle"

    :x="50",
    :y="50",
    ) {{ tuner.note.name }} 
  g.around(
    style="cursor:pointer"
    v-for="(amount, i) in rotateArray(tuner.chroma, -3)", 
    :key="i",
    :transform="getRect(i)"
    )
    rect(
      style="user-select:none;transition:all 300ms ease"
      x="0" y="0" width="25" height="25"
      :fill="pitchColor(i, 3, amount)"
      )
    text(
      style="user-select:none;transition:all 300ms ease"
      :fill="notes[i].length == 2 ? 'hsla(0,0%,0%,0.8)' : 'hsla(0,0%,100%,0.9)'"
      font-family="Commissioner, sans-serif"
      font-size="3px"
      text-anchor="middle",
      dominant-baseline="middle"
      :opacity="amount"
      x="12.5"
      y="12.5"
      ) {{ notes[i] }}
</template>

<style lang="postcss" scoped>
</style>