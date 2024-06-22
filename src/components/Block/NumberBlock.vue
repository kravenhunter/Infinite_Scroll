<script setup lang="ts">
withDefaults(
  defineProps<{
    borderRadios?: string
    transition?: string
    id: number
  }>(),
  {
    borderRadios: '0px',
    transition: '100ms'
  }
)
</script>
<template>
  <div class="number__block">{{ id }}</div>
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
    width v-bind(transition),
    height v-bind(transition);
  &:hover {
    width: calc(50px * 0.8);
    height: calc(50px * 0.8);
  }
}
</style>
