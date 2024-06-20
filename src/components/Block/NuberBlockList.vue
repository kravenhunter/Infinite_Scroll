<script setup lang="ts">
import { generateRandomNumber } from '@/utils'
import NumberBlock from './NumberBlock.vue'
defineProps<{
  numberArray: number[]
}>()
</script>
<template>
  <ul class="infinite__scroll__list">
    <li v-for="number in numberArray" :key="number">
      <NumberBlock :number="number" :border-radios="`${generateRandomNumber(50)}px`" />
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
