<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'

interface AccountDataItem {
  id: number
  text: string
}
const accountData: AccountDataItem[] = []

const viewData: AccountDataItem[] = reactive([])
const itemHeight = ref(50) // высота каждого элемента
const visibleItemsStartIndex = ref(0) // индекс начала видимых элементов
const visibleItemsEndIndex = ref(0) // индекс конца видимых элементов
const visibleEndIndex = ref(0)
const refList = ref()
const scrollBar = ref(0)
const index = ref(0)
const offset = 6
const getData = () => {
  for (let i = 0; i < 10000; i++) {
    accountData.push({
      id: i,
      text: `Item ${i}`
    })
  }
}
const initList = () => {
  const getSlice = accountData.slice(0, 18)
  viewData.splice(0, getSlice.length)
  viewData.push(...getSlice)
  index.value = viewData.length
  visibleItemsStartIndex.value = 0
  visibleItemsEndIndex.value = viewData.length - 1
  scrollBar.value = 0
}

const loadNext = () => {
  const getSlice = accountData.slice(index.value, index.value + offset)
  viewData.push(...getSlice)

  viewData.splice(0, offset)
  visibleItemsStartIndex.value += offset
  index.value = index.value + offset
}
const loadPrev = () => {
  const list = refList.value as HTMLDivElement
  const splice = viewData.splice(viewData.length - 6)

  const countIndex = visibleItemsStartIndex.value - 6 > 0 ? visibleItemsStartIndex.value - 6 : 0
  const getSlice = accountData.slice(countIndex, visibleItemsStartIndex.value)
  viewData.unshift(...getSlice)
  visibleItemsStartIndex.value = countIndex
  list.scrollTo({ top: 398 })
}

watch(scrollBar, (curr, prev) => {
  if (curr < prev && curr <= 80) {
    visibleItemsStartIndex.value > 0 && loadPrev()
  }
})

const createVirtualList = () => {
  const list = refList.value as HTMLDivElement
  scrollBar.value = list.scrollTop
  console.log(scrollBar.value)

  // Сколько прошло элементов за Top
  visibleEndIndex.value = Math.floor(list.scrollTop / itemHeight.value)
  //Конечный видимый элменнт
  const end = visibleEndIndex.value + Math.ceil(list.clientHeight / itemHeight.value)

  console.log(visibleEndIndex.value)

  console.log(list.getBoundingClientRect().bottom)
  list.scrollTop > 500 && (loadNext(), list.scrollTo({ top: 200 }))
}

onMounted(async () => {
  if (refList.value) {
    await getData()
    initList()
  }
})
</script>

<template>
  <div class="list__items" ref="refList" @scroll="createVirtualList">
    <div v-for="(item, i) in viewData" :key="i" class="item">
      {{ item.text }}
    </div>
  </div>
</template>
<style scoped lang="scss">
.list__items {
  border: 1px solid black;
  justify-self: center;
  align-self: center;
  width: min(100%, 500px);
  height: 300px; /* Высота виртуального списка */
  overflow-y: auto; /* Добавление вертикальной прокрутки */
}

.item {
  height: 50px; /* Высота каждого элемента списка */
  line-height: 50px;
  border-bottom: 1px solid #ccc; /* Добавление разделителя между элементами */
}
</style>
