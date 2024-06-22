<script setup lang="ts">
import { generateRandomNumber } from '@/utils'
import { ref, toRefs, watch } from 'vue'
import NumberBlock from './NumberBlock.vue'

const props = defineProps<{
  indexKey: number
  numberArray: number[]
  scrollMove: number

  scrollBlockPosition?: {
    scrolTop: number
    scrollBottom: number
  }
}>()

const refList = ref()
const isShow = ref(true)
const { scrollBlockPosition, scrollMove } = toRefs(props)

watch(scrollMove, () => {
  const getVerticalPositio: DOMRect = refList.value.getBoundingClientRect()

  if (getVerticalPositio.y > 239 && getVerticalPositio.y < 620) {
    isShow.value = true
  } else {
    isShow.value = false
  }
})
</script>
<template>
  <ul
    :class="`infinite__scroll__list list-enter-active ${!isShow ? 'list-leave-to' : ''} `"
    ref="refList"
  >
    <li v-for="(number, i) in numberArray" :key="i">
      <NumberBlock :id="number" :border-radios="`${generateRandomNumber(50)}px`" />
    </li>
  </ul>
</template>

<style scoped lang="scss">
.infinite__scroll__list {
  width: 100%;
  display: flex;
  gap: 5px;
  align-items: center;
  & li {
    width: 50px;
    height: 50px;
    display: grid;
    place-content: center;
  }
}
</style>
