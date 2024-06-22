<script setup lang="ts">
import { NumberBlock } from '@/components'
import { computed, ref } from 'vue'

//Описываем  дефолтное состояние пропсов  и деструктурируем объект свойства для использования
const { totalData, colSize, visibleRows, colsLimit } = withDefaults(
  defineProps<{
    totalData: number[][]
    maxHeigth?: string
    padding?: string
    colSize?: string
    visibleRows?: number
    colsLimit?: number
  }>(),
  {
    maxHeigth: '378px',
    padding: '25px 15px',
    colSize: '50px',
    visibleRows: 3,
    colsLimit: 20
  }
)

//Получаем цифровое значение высоты строки отрезая регексом  буквы из троки и преобразовывая в число
const itemHeight = +colSize.replace(/\D/g, '')

//Ссылка на  Dom-элемент списка
const refList = ref()

//Стартовый видимый элемент
//Нумерация вычисляется scrollHandler при скролле
const startVisibleInterval = ref(0)

//Вычисляемое свойство формирует выбает видимый массив
//  начало (startVisibleInterval)  до количества видимых объектов включительно
const visibleDataComputed = computed(() =>
  totalData.slice(startVisibleInterval.value, startVisibleInterval.value + visibleRows + 1)
)

//Временный блок-буффур для включения скролла вверх
//Вычисляет  наличие  предыдущие элементов
//Если следующих элементов нет то размер блока будет 0px
const topEmptyComputed = computed(() => itemHeight * startVisibleInterval.value + 'px')
//Временный  блок-буффур  для включения скролла вниз
//Вычисляет наличие следующих элементов
//Если следующих элементов нет то размер блока будет 0px
const bottomEmptyComputed = computed(
  () => itemHeight * (totalData.length - (startVisibleInterval.value + visibleRows)) + 'px'
)
//Вычисляемое свойство для ширины экрана списка
//Записывается в стиль
const countWidthSize = computed(() => itemHeight * colsLimit + itemHeight + colsLimit * 5 + 'px')

//Обработчик скролла записывает в стартовый интервал (startVisibleInterval) количесство прокрученных строк
const scrollHandler = () => {
  const getElement = refList.value as HTMLDivElement
  startVisibleInterval.value = getElement.scrollTop / itemHeight
}
</script>

<template>
  <div class="list__items" ref="refList" @scroll.native="scrollHandler">
    <div class="list__items__top__empty"></div>
    <ul v-for="(items, i) in visibleDataComputed" :key="startVisibleInterval + i">
      <li
        v-for="(item, k) in items"
        :key="startVisibleInterval + '' + k + item"
        class="list__items__item"
      >
        <NumberBlock :number="item" />
      </li>
    </ul>
    <div class="list__items__bottom__empty"></div>
  </div>
</template>
<style scoped lang="scss">
.list__items {
  display: grid;
  row-gap: 15px;
  border: 1px solid black;
  justify-self: center;
  align-self: center;
  padding: 15px;

  width: min(100%, v-bind(countWidthSize));
  height: calc(v-bind(colSize) * v-bind(visibleRows) + 15px * v-bind(visibleRows) + 15px * 2);
  overflow-y: auto; /* Добавление вертикальной прокрутки */
  scrollbar-gutter: stable;
  &__top__empty {
    height: v-bind(topEmptyComputed);
  }
  &__bottom__empty {
    height: v-bind(bottomEmptyComputed);
  }
  &__item {
    display: grid;
    place-content: center;
    width: v-bind(colSize);
    height: v-bind(colSize);
    line-height: 50px;
  }
  & ul {
    display: flex;
    height: v-bind(colSize);
    column-gap: 5px;
  }
}
</style>
