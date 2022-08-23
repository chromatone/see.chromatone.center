import { useElementBounding, useStorage } from "@vueuse/core";
import { useDrag } from "@vueuse/gesture";
import { useClamp } from "@vueuse/math";
import { ref } from 'vue'

export const scene = ref()

export const activeScene = useStorage('active-scene', 'Rose')

export const td = useClamp(useStorage('td', 0), 0, 1)

export const lr = useClamp(useStorage('lr', 0), 0, 1)

export const showNotes = useStorage('show-notes', true)

export function useScene() {
  const { width, height } = useElementBounding(scene)

  useDrag(e => {
    const { delta: [x, y] } = e
    lr.value += x / width.value
    td.value -= y / height.value
  }, {
    domTarget: scene
  })


  return { scene, width, height, activeScene, td, lr, showNotes }
}

