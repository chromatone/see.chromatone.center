<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useTuner } from 'chromatone.center'
import { useFps } from '@vueuse/core'
const fps = useFps()

const { init, tuner, chain } = useTuner();

</script>

<template lang="pug">
header.flex.items-center.w-full.gap-4.absolute
  a.p-2(href="https://chromatone.center")
    img.w-8(alt="Vue logo" src="./assets/logo.svg" width="125" height="125")
  .flex-auto
  nav.flex.gap-2.p-2.text-xs
    RouterLink(to="/") CIRCLE
    RouterLink(to="/square") SQUARE
.fullscreen-container.rounded-4xl.flex.items-center.justify-center

  button.p-4.bg-dark-200.absolute(v-if="!tuner.initiated" @click="init()") Start

  .absolute.bottom-2.right-2.tabular-nums {{ fps }}

  svg.max-h-100vh.w-full.h-full.min-h-100vh#stage(
    version="1.1",
    baseProfile="full",
    viewBox="0 0 100 100",
    xmlns="http://www.w3.org/2000/svg",
    ref="stage"
    )
    RouterView(:tuner="tuner")
</template>

<style scoped lang="postcss">
.router-link-active {
  @apply font-bold;
}
</style>
