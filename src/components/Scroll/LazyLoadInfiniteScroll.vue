<script setup lang="ts">
import { NuberBlockList } from '@/components'
import { ref } from 'vue'

const { totalData } = defineProps<{
  totalData: number[][]
}>()

const currentBorderLimit = ref(11)
// Initial two-dimension number array
const currentTotal = ref(totalData.slice(0, 11))
const scrollMove = ref(0)
const scrolling = (e: Event) => {
  // console.log(e)

  const scroll = e.target as HTMLDivElement
  const elemet = scroll.getBoundingClientRect().bottom
  scrollMove.value = scroll.scrollTop

  if (
    scroll.scrollTop + scroll.clientHeight + 30 >= scroll.scrollHeight &&
    currentTotal.value.length < totalData.length
  ) {
    currentTotal.value.push(
      ...totalData.slice(currentTotal.value.length, currentTotal.value.length + 11)
    )
    currentTotal.value.length > totalData.length && (currentTotal.value.length = totalData.length)

    // console.log(true)
    // console.log(scroll.scrollTop)
    // console.log(scroll.clientHeight)
    // console.log(scroll.scrollHeight)
    // console.log(elemet)
  }
  // console.log(scroll.getBoundingClientRect().bottom)
  // console.log(refElement.value && (refElement.value as HTMLDivElement).clientHeight)

  // console.log(scroll.scrollHeight)
  // console.log(scroll.clientHeight)

  // const clientHeight = (e).target.clientHeight
  // const scrollHeight = e.target.scrollHeight

  // console.log(scroll.scrollHeight)
  // console.log(scroll.clientHeight)
  // console.log(elemet < scroll.clientHeight)
  // console.log(scroll.offsetTop)
  // console.log(scroll.offsetHeight)
}

// onMounted(() => {
//   console.log(refElement.value && (refElement.value as HTMLDivElement))
// })
</script>
<template>
  <div class="infinite__scroll" @scroll.native="scrolling" ref="refElement">
    <TransitionGroup name="list" class="infinite__scroll__transition" tag="ul">
      <li v-for="(itemArray, i) in currentTotal" :key="i">
        <NuberBlockList :scroll-move="scrollMove" :index-key="i" :number-array="itemArray" />
      </li>
    </TransitionGroup>

    <div ref="refElement" id="scroll__trigger"></div>
  </div>
</template>

<style scoped lang="scss">
.infinite__scroll {
  justify-self: center;
  align-self: center;
  display: grid;
  gap: 20px;
  width: min(100%, 1153px);
  height: 450px;
  padding: 10px 15px;
  overflow: auto;
  border: 1px solid rgb(177, 177, 177);
  scrollbar-gutter: stable;
  &__transition {
    display: grid;
    gap: 20px;
  }
  /*  &__list {
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
  } */
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
#scroll__trigger {
  height: 50px;
  width: 100%;
}
</style>
