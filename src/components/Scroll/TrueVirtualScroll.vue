<script setup lang="ts">
import { NumberBlock } from '@/components'
import { computed, ref, watch } from 'vue'
import type { IBlock } from '../../type'
//Описываем  дефолтное состояние пропсов  и деструктурируем объект свойства для использования
const { totalData, colSize, visibleRows, colsLimit } = withDefaults(
  defineProps<{
    totalData: IBlock[][]
    colSize?: string
    visibleRows?: number
    colsLimit?: number
  }>(),
  {
    colSize: '50px',
    visibleRows: 3,
    colsLimit: 20
  }
)

//Получаем цифровое значение высоты строки отрезая регексом  буквы из троки и преобразовывая в число
const itemHeight = +colSize.replace(/\D/g, '')

//Ссылка на  Dom-элемент списка
const refList = ref()
const scrollBar = ref(0)
const vidibleData = ref<IBlock[][]>(totalData.slice(0, visibleRows + 1))

//Стартовый видимый элемент
//Нумерация вычисляется scrollHandler при скролле
const startVisibleIndex = ref(0)
const endVisibleIndex = ref(0)

//Временный блок-буффур для включения скролла вверх
//Вычисляет  наличие  предыдущие элементов
//Если следующих элементов нет то размер блока будет 0px
const topEmptyComputed = computed(() => itemHeight * startVisibleIndex.value + 'px')
//Временный  блок-буффур  для включения скролла вниз
//Вычисляет наличие следующих элементов
//Если следующих элементов нет то размер блока будет 0px
const bottomEmptyComputed = computed(
  () => itemHeight * (totalData.length - (startVisibleIndex.value + visibleRows)) + 'px'
)
//Вычисляемое свойство для ширины экрана списка
//Записывается в стиль
const countWidthSize = computed(() => itemHeight * colsLimit + itemHeight + colsLimit * 5 + 'px')

const refreshData = (currentIndex: number) => {
  startVisibleIndex.value = currentIndex
  endVisibleIndex.value = startVisibleIndex.value + visibleRows + 1
  vidibleData.value = totalData.slice(startVisibleIndex.value, endVisibleIndex.value)
}

watch(scrollBar, (curr, prev) => {
  //Проверяем если предыдуший скрол меньше текущего значения то скроллим вверх , до момента когда
  //предыдущее значение не станет 0 при отбросе дробных значений
  // дабы избежать лишних пустых скроллов вверх

  if (prev > curr && Math.trunc(prev) !== 0) {
    refreshData(curr)
  } else {
    //Иначе скроллим вверхи до момента когда кочный dblbvsq не станет равен длинне главного массива,
    // дабы избежать лишних пустых скроллов вниз
    if (Math.trunc(endVisibleIndex.value) <= totalData.length) {
      refreshData(curr)
    }
  }
})
//Обработчик скролла записывает в стартовый интервал (startVisibleIndex) количесство прокрученных строк
const scrollHandler = () => {
  const getElement = refList.value as HTMLDivElement
  scrollBar.value = getElement.scrollTop / itemHeight
}
</script>

<template>
  <div class="list__items" ref="refList" @scroll.native="scrollHandler">
    <!-- <div class="list__items__top__empty"></div> -->
    <ul v-for="(items, i) in vidibleData" :key="startVisibleIndex + i">
      <li v-for="(item, k) in items" :key="item.id" class="list__items__item">
        <NumberBlock :id="item.id" :border-radios="item.borderSize" />
      </li>
    </ul>
    <!-- <div class="list__items__bottom__empty"></div> -->
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
  &::before {
    content: '';
    height: v-bind(topEmptyComputed);
  }
  &::after {
    content: '';
    height: v-bind(bottomEmptyComputed);
  }
  // &__top__empty {
  //   height: v-bind(topEmptyComputed);
  // }
  // &__bottom__empty {
  //   height: v-bind(bottomEmptyComputed);
  // }
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
