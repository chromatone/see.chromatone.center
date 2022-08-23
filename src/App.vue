<script setup>
import { RouterLink, RouterView } from 'vue-router'

import { useFps, useFullscreen, useStorage } from '@vueuse/core'
import { reactive } from 'vue';
import { useClamp } from '@vueuse/math';
import { useDrag } from '@vueuse/gesture';
const fps = useFps()

import { tuner, init } from '#/use/tuner'

import { useScene, activeScene } from '#/use/scene';

const { scene, width, height, td, lr, showNotes } = useScene()

const scenes = {
  '/': 'CIRCLE',
  '/square': "SQUARE"
}


const { isFullscreen, enter, exit, toggle, isSupported } = useFullscreen()

</script>

<template lang="pug">
header.flex.items-center.w-full.gap-4.absolute
  a.p-2.opacity-40.hover_opacity-80.transition(href="https://chromatone.center")
    img.w-8(alt="Vue logo" src="./assets/logo.svg" width="125" height="125")
  .flex-auto
  nav.flex.gap-2.p-2.text-xs.text-white
    RouterLink.opacity-50.hover_opacity-90.transition(
      v-for="(sc, path) in scenes" :key="sc"
      :to="path"
      ) {{ sc }}
.absolute.bottom-6.left-5.text-white.text-xl.select-none.cursor-pointer(
  @click="showNotes = !showNotes"
  :style="{ textDecoration: !showNotes ? 'line-through' : '', opacity: showNotes ? 1 : 0.5 }"
  ) A
.absolute.bottom-6.right-4.text-white.opacity-30.hover_opacity-80.transition(v-if="isSupported" @click="toggle")
  svg(width="24", height="24", viewBox="0 0 32 32")
    path(d="M4 4v9h2V6h7V4H4zm15 0v2h7v7h2V4h-9zM4 19v9h9v-2H6v-7H4zm22 0v7h-7v2h9v-9h-2z", fill="currentColor")
.absolute.bottom-7.right-12.tabular-nums.select-none.text-white.opacity-50.text-xs {{ fps }}
.flex.items-center.justify-center.bg-black
  button.p-6.bg-dark-50.text-white.text-opacity-70.rounded-2xl.text-2xl.absolute(v-if="!tuner.initiated" @click="init()") Start

  svg.max-h-100vh.w-full.h-full.min-h-100vh#scene.cursor-crosshair(
    version="1.1",
    baseProfile="full",
    xmlns="http://www.w3.org/2000/svg",
    :viewBox="`0 0  ${width} ${height}`",
    ref="scene"
    )
    defs 
      filter#blur(x="-10" y="-10" width="30" height="30")
        feGaussianBlur(in="SourceGraphic" :stdDeviation="lr * 16")
      filter#blur-more(x="-10" y="-10" width="30" height="30")
        feGaussianBlur(in="SourceGraphic" :stdDeviation="lr * 64")
    RouterView(:tuner="tuner" :width="width" :height="height" :td="td" :lr="lr")
    rect(
      :x="0" :y="height * (1 - td)" :height="height * (td)", :width="width / 200" fill="white" opacity="0.4"
      )
    rect(
      :x="0" :y="height - height / 100" :height="height / 200", :width="width * lr" fill="white" opacity="0.4"
      )
</template>

<style scoped lang="postcss">
.router-link-active {
  @apply font-bold;
}
</style>
