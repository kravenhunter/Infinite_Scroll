<script setup lang="ts">
import { NuberBlockList } from '@/components'
import { onMounted, reactive, ref, watch } from 'vue'

// const { totalData } = defineProps<{
//   totalData: number[][]
// }>()

const { totalData } = withDefaults(
  defineProps<{
    totalData: number[][]
    maxHeigth?: string
    padding?: string
  }>(),
  {
    maxHeigth: '378px',
    padding: '25px 15px'
  }
)

const viewData: number[][] = reactive([])

const scrollReactive = reactive({ scrolTop: 0, scrollBottom: 0 })
const refList = ref()

const itemHeight = ref(50) // высота каждого элемента
const visibleItemsStartIndex = ref(0) // индекс начала видимых элементов
const visibleItemsEndIndex = ref(0) // индекс конца видимых элементов
const visibleEndIndex = ref(0)
const scrollBar = ref(0)
const index = ref(0)
const offset = 6

const initList = () => {
  const getSlice = totalData.slice(0, 18)
  viewData.splice(0, getSlice.length)
  viewData.push(...getSlice)
  index.value = viewData.length
  visibleItemsStartIndex.value = 0
  visibleItemsEndIndex.value = viewData.length - 1
  scrollBar.value = 0
}

const loadNext = () => {
  const getSlice = totalData.slice(index.value, index.value + offset)
  viewData.push(...getSlice)

  viewData.splice(0, offset)
  visibleItemsStartIndex.value += offset
  index.value = index.value + offset
}
const loadPrev = () => {
  const list = refList.value as HTMLDivElement
  const splice = viewData.splice(viewData.length - 6)

  const countIndex = visibleItemsStartIndex.value - 6 > 0 ? visibleItemsStartIndex.value - 6 : 0
  const getSlice = totalData.slice(countIndex, visibleItemsStartIndex.value)
  viewData.unshift(...getSlice)
  visibleItemsStartIndex.value = countIndex
  list.scrollTo({ top: (list.clientHeight * 2 + 200) / 2 })
}

watch(scrollBar, (curr, prev) => {
  if (curr < prev && curr <= 80) {
    visibleItemsStartIndex.value > 0 && loadPrev()
  }
})
const baskHeigth = ref(0)
const createVirtualList = () => {
  const list = refList.value as HTMLDivElement
  scrollBar.value = list.scrollTop
  console.log(list.scrollTop)

  // Сколько прошло элементов за Top
  visibleEndIndex.value = Math.floor(list.scrollTop / itemHeight.value)
  //Конечный видимый элменнт
  const end = visibleEndIndex.value + Math.ceil(list.clientHeight / itemHeight.value)
  console.log(scrollBar.value)
  // console.log(baskHeigth.value)

  list.scrollTop > list.clientHeight * 2 &&
    (loadNext(), list.scrollTo({ top: Math.floor((list.clientHeight * 2) / 2) }))
}

onMounted(() => {
  if (refList.value) {
    const getElement = refList.value as HTMLDivElement
    const getPosition = getElement.getBoundingClientRect()
    scrollReactive.scrolTop = getPosition.top
    scrollReactive.scrollBottom = getPosition.bottom

    console.log(getPosition)

    initList()
  }
})
</script>

<template>
  <div class="infinite__scroll" @scroll.native="createVirtualList" ref="refList">
    <ul class="infinite__scroll__transition" tag="ul">
      <li v-for="(itemArray, i) in viewData" :key="i">
        <NuberBlockList
          :index-key="i"
          :number-array="itemArray"
          :scrollBlockPosition="scrollReactive"
          :scrollMove="scrollBar"
        />
      </li>
    </ul>
  </div>
</template>
<style scoped lang="scss">
.infinite__scroll {
  justify-self: center;
  align-self: center;
  display: grid;
  gap: 20px;
  width: min(100%, 1153px);
  height: v-bind(maxHeigth);
  padding: v-bind(padding);
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

#scroll__trigger {
  height: 50px;
  width: 100%;
}
</style>
