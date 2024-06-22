<script setup lang="ts">
import { generateDimensionArray, generateRandomNumber } from '@/utils'
import { TrueVirtualScroll } from './components'
import type { IBlock } from './type'
// Generate  number array according rowLimit props

const getNumbersArray = (rowLimit: number, numberLimit: number) => {
  const getRandomRow = generateRandomNumber(rowLimit)
  const getArr = Array.from({ length: getRandomRow === 0 ? 1 : getRandomRow }, (val, i) =>
    generateRandomNumber(numberLimit)
  )

  return getArr
}

const getNumbersArray2 = (rowLimit: number, numberLimit: number) => {
  const getRandomRow = generateRandomNumber(rowLimit)
  const getArr: IBlock[] = Array.from(
    { length: getRandomRow === 0 ? 1 : getRandomRow },
    (val, i) => ({
      id: generateRandomNumber(numberLimit),
      borderSize: generateRandomNumber(numberLimit) + 'px'
    })
  )

  return getArr
}

// // Generate  two-dimension number array according limit argument
// const generateDimensionArray = (sizeArray: number, rowLimit: number, numberLimit: number) => {
//   return Array.from({ length: sizeArray }, (val, i) => getNumbersArray2(rowLimit, numberLimit))
// }
const generateDimension = (sizeArray: number) => {
  return [] as number[][]
}
const getArrya: IBlock[][] = generateDimensionArray(100, 20, 100)
</script>

<template>
  <!-- InfiniteScroll получает на вход просcы 
  totalData - 2-мерный массив  чисел, обязательный пропс  
  colSize - размер блока ячейки, по дефолту '50px'
  visibleRows - количество видимых строк ячеек. В зависимости  от количество будет расчитана высота элемента листаб , по дефолту 3
  colsLimit  - количество ячекек в строке, по дефолту 20
  -->
  <TrueVirtualScroll :total-data="getArrya" :visible-rows="6" />
  <!-- <LazyLoadInfiniteScroll :total-data="getArrya" /> -->
</template>
