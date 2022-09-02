<script setup>
import { pitchColor, rotateArray, getCircleCoord, notes, useTuner } from 'use-chromatone'

import { ref, computed } from 'vue'
import { useClamp } from '@vueuse/math'

import { tuner, init } from '#/use/tuner'
import { useScene } from '../use/scene';


const { scene, width, height, td, lr, showNotes } = useScene()


function getAmmount(ammount) {
	return ammount > tuner.chromaAvg ? tuner.note.silent ? 0 : ammount : 0
}

</script>

<template lang="pug">
g(ref="stage")
	g.around(
		v-for="(ammount, i) in rotateArray(tuner.chroma, -3)", 
		:key="i",
		:transform="`translate(${getCircleCoord(i, 12, width / 3, width).x},${getCircleCoord(i, 12, height / 3, height).y})`"
		)
		circle.note(
			style="transition: all 300ms ease-in-out;transform-box: fill-box; transform-origin: center center;"
			:r="width / 20 + td * width / 10",
			:style="{ transform: `scale(${0.5 + 2 * getAmmount(ammount)})` }"
			:fill="pitchColor(i, 3, getAmmount(ammount), getAmmount(ammount))",
			filter="url(#blur)"
			)
		text(
			v-if="showNotes"
			style="user-select:none; transition:all 300ms ease"
			:fill="notes[i].length == 2 ? 'hsla(0,0%,0%,0.8)' : 'hsla(0,0%,100%,0.9)'"
			font-family="Commissioner, sans-serif"
			:font-size="height / 40"
			text-anchor="middle",
			dominant-baseline="middle"
			:opacity="getAmmount(ammount) * 10"
			) {{  notes[i]   }} 

	g.center
		circle.note(
			style="transition: all 300ms ease-in-out;transform-box: fill-box; transform-origin: center center;"
			:cx="width / 2",
			:cy="height / 2",
			:r="width / 10 + td * width / 4",
			:style="{ transform: `scale(${0.5 + 5 * tuner.rms})` }"
			:fill="tuner.note.silent ? '#888' : tuner?.note.color",
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
			:opacity="tuner.rms * 10"
			dominant-baseline="middle"
			:x="width / 2",
			:y="height / 2",
			) {{     tuner.note.name     }}
</template>

<style lang="postcss" scoped>
</style>