<script setup lang="ts">
import { NuberBlockList } from '@/components'
import { generateRandomNumber } from '@/utils'
import { onMounted, ref } from 'vue'

const { rowLimit, numberLimit, totalElements } = withDefaults(
  defineProps<{
    numberLimit?: number
    rowLimit?: number
    totalElements?: number
  }>(),
  {
    rowLimit: 20,
    numberLimit: 100,
    totalElements: 100
  }
)

// Generate  number array according rowLimit props
const getNumbersArray = () => {
  const getRandom = generateRandomNumber(rowLimit)
  const getArr = Array.from({ length: getRandom === 0 ? 1 : getRandom }, (val, i) =>
    generateRandomNumber(numberLimit)
  )
  if (!getArr.length) {
    debugger
  }
  return getArr
}

// Generate  two-dimension number array according limit argument
const generateDimensionArray = (limit: number) =>
  Array.from({ length: limit }, (val, i) => getNumbersArray())

// const currentTotal = ref(Array.from({ length: 13 }, (val, i) => getNumbersArray()))

// Initial two-dimension number array
const currentTotal = ref(generateDimensionArray(10))

const refElement = ref()
const scrolling = (e: Event) => {
  // console.log(e)

  const scroll = e.target as HTMLDivElement
  const elemet = scroll.getBoundingClientRect().bottom
  if (currentTotal.value.length < totalElements)
    if (
      scroll.scrollTop + scroll.clientHeight + 30 >= scroll.scrollHeight &&
      currentTotal.value.length < totalElements
    ) {
      currentTotal.value.push(...generateDimensionArray(10))
      currentTotal.value.length > totalElements && (currentTotal.value.length = totalElements)

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
const scrollTrigger = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log('Intersecting')
      }
      if (entry.intersectionRatio > 0) {
        console.log('Intersecting')
        console.log(entry.target)
      }
    })
  })
  refElement.value && observer.observe(refElement.value)
}
onMounted(() => {
  console.log(refElement.value && (refElement.value as HTMLDivElement))
})
</script>
<template>
  <div class="infinite__scroll" @scroll.native="scrolling" ref="refElement">
    <TransitionGroup name="list" class="infinite__scroll__transition" tag="ul">
      <li v-for="(itemArray, i) in currentTotal" :key="i">
        <NuberBlockList :number-array="itemArray" />
      </li>
    </TransitionGroup>
    <!-- <TransitionGroup name="list" class="infinite__scroll__transition" tag="ul">
      <li v-for="(itemArray, i) in currentTotal" :key="i">
        <ul class="infinite__scroll__list">
          <li v-for="number in itemArray" :key="number">
            <NumberBlock :number="number" :border-radios="`${getRandomNumber(50)}px`" />
          </li>
        </ul>
      </li>
    </TransitionGroup> -->
    <div ref="refElement" id="scroll__trigger"></div>
    <!--   <ul class="infinite__scroll__list" v-for="(itemArray, i) in currentTotal" :key="i">
      <li v-for="item in itemArray" :key="item">
        <NumberBlock :number="item" :border-radios="`${getRandomNumber(50)}px`" />
      </li>
    </ul>
    <div ref="refElement" id="scroll__trigger"></div> -->
  </div>
</template>

<style scoped lang="scss">
.infinite__scroll {
  justify-self: center;
  align-self: center;
  display: grid;
  gap: 20px;
  width: min(100%, 1153px);
  height: 710px;
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
