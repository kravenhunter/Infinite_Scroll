<script setup lang="ts">
import { generateRandomNumber } from '@/utils'
import { TrueVirtualScroll } from './components'

// Generate  number array according rowLimit props
const getNumbersArray = (rowLimit: number, numberLimit: number) => {
  const getRandomRow = generateRandomNumber(rowLimit)
  const getArr = Array.from({ length: getRandomRow === 0 ? 1 : getRandomRow }, (val, i) =>
    generateRandomNumber(numberLimit)
  )

  return getArr
}

// Generate  two-dimension number array according limit argument
const generateDimensionArray = (sizeArray: number, rowLimit: number, numberLimit: number) => {
  return Array.from({ length: sizeArray }, (val, i) => getNumbersArray(rowLimit, numberLimit))
}
const generateDimension = (sizeArray: number) => {
  return [] as number[][]
}
const getArrya = generateDimensionArray(100000, 20, 100)
</script>

<template>
  <TrueVirtualScroll :total-data="getArrya" :visible-rows="6" />
  <!-- <LazyLoadInfiniteScroll :total-data="getArrya" /> -->
</template>
