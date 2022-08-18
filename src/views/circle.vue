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
</script>

<template lang="pug">
g(ref="stage")
	defs 
		filter#blur(x="-1" y="-1" width="3" height="3")
			feGaussianBlur(in="SourceGraphic" :stdDeviation="blur")
		filter#blur-more(x="-1" y="-1" width="3" height="3")
			feGaussianBlur(in="SourceGraphic" :stdDeviation="blur * 2")
	circle.note(
		style="transition: all 300ms ease-in-out;transform-box: fill-box; transform-origin: center center;"
		:cx="50",
		:cy="50",
		:r="10",
		:style="{ transform: `scale(${0.5 + 20 * tuner.rms})` }"
		:fill="tuner.note.silent ? '#888' : tuner?.note.color",
		filter="url(#blur-more)"
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
		:transform="`translate(${getCircleCoord(i).x},${getCircleCoord(i).y})`"
		)
		//- circle.note(
			style="transition: all 300ms ease-in-out;transform-box: fill-box; transform-origin: center center;"
			:r="radius",
			:style="{ transform: `scale(${0.5 + 10 * amount})` }"
			:fill="pitchColor(i, 3, amount)",
			)
		circle.note(
			style="transition: all 300ms ease-in-out;transform-box: fill-box; transform-origin: center center;"
			:r="radius",
			:style="{ transform: `scale(${0.5 + 10 * amount})` }"
			:fill="pitchColor(i, 3, amount)",
			filter="url(#blur)"
			)
		text(
			style="user-select:none;transition:all 300ms ease"
			:fill="notes[i].length == 2 ? 'hsla(0,0%,0%,0.8)' : 'hsla(0,0%,100%,0.9)'"
			font-family="Commissioner, sans-serif"
			font-size="3px"
			text-anchor="middle",
			dominant-baseline="middle"
			:opacity="amount"
			) {{ notes[i] }}
</template>

<style lang="postcss" scoped>
</style>