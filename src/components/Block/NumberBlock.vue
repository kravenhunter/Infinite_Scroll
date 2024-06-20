<script setup lang="ts">
withDefaults(
  defineProps<{
    borderRadios?: string
    number?: number
  }>(),
  {
    borderRadios: '0px',
    number: 1
  }
)
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
  border-radius: v-bind(borderRadios);
  transition:
    width 500ms,
    height 500ms;
  &:hover {
    width: calc(50px * 0.8);
    height: calc(50px * 0.8);
  }
}
</style>
