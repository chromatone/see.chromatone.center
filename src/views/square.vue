<script setup>
import { pitchColor, rotateArray, getCircleCoord, notes, useTuner } from 'use-chromatone'
import { useScene, activeScene } from '#/use/scene';

import { ref, computed } from 'vue'
import { useClamp } from '@vueuse/math'
import { useDrag } from '@vueuse/gesture'
import { tuner, init } from '#/use/tuner'


const { scene, width, height, td, lr, showNotes } = useScene()




const stage = ref()


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

function getAmmount(ammount) {
  return ammount > tuner.chromaAvg ? tuner.note.silent ? 0 : ammount : 0
}

</script>

<template lang="pug">
g(ref="stage")
  rect(
    style="user-select:none;transition:all 300ms ease"
    :x="width / 4" :y="height / 4" :width="width / 2" :height="height / 2"
    :fill="tuner.note.silent ? '#333' : tuner?.note.color"
    :opacity="tuner.rms * 10"
    filter="url(#blur-more)"
    )
  text(
    v-if="showNotes"
    style="user-select:none;transition:all 300ms ease"
    fill="white"
    font-family="Commissioner, sans-serif"
    :font-size="height / 20"
    text-anchor="middle",
    dominant-baseline="middle"
    :opacity="tuner.rms * 10"
    :x="width / 2",
    :y="height / 2",
    ) {{ tuner.note.name }} 
  g.around(
    style="cursor:pointer"
    v-for="(ammount, i) in rotateArray(tuner.chroma, -3)", 
    :key="i",
    :transform="getRect(i, width, height)"
    )
    rect(
      style="user-select:none;transition:all 300ms ease"
      x="0" y="0" :width="width / 4" :height="height / 4"
      :fill="pitchColor(i, 3, getAmmount(ammount), getAmmount(ammount))"
      :stroke-width="td * 10" 
      stroke="black"
      filter="url(#blur)"
      )
    text(
      v-if="showNotes"
      style="user-select:none;transition:all 300ms ease"
      :fill="notes[i].length == 2 ? 'hsla(0,0%,0%,0.8)' : 'hsla(0,0%,100%,0.9)'"
      font-family="Commissioner, sans-serif"
      :font-size="height / 30"
      text-anchor="middle",
      dominant-baseline="middle"
      :opacity="getAmmount(ammount)"
      :x="width / 8"
      :y="height / 8"
      ) {{ notes[i] }}
</template>

<style lang="postcss" scoped>
</style>