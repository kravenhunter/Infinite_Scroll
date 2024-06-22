<script setup lang="ts">
import { generateRandomNumber } from '@/utils'
const { number } = withDefaults(
  defineProps<{
    borderRadios?: string
    transition?: string
    number?: number
  }>(),
  {
    borderRadios: '0px',
    number: 1,
    transition: '100ms'
  }
)
const generateBorder = generateRandomNumber(number) + 'px'
</script>
<template>
  <div class="number__block">{{ number }}</div>
</template>

<style scoped lang="scss">
.number__block {
  cursor: pointer;
  display: grid;
  place-content: center;
  width: 50px;
  height: 50px;
  border: 1px solid var(--color-dark);
  border-radius: v-bind(generateBorder);
  transition:
    width v-bind(transition),
    height v-bind(transition);
  &:hover {
    width: calc(50px * 0.8);
    height: calc(50px * 0.8);
  }
}
</style>
