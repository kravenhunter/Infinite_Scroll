import { generateRandomNumber } from './generateRandomNumber'

//Функция создает одномерный  массив с объектом id  и сгенерированным размером бордера
const getBlockArray = (rowLimit: number, numberLimit: number) => {
  const getRandomRow = generateRandomNumber(rowLimit)
  const getArr = Array.from({ length: getRandomRow === 0 ? 1 : getRandomRow }, (val, i) => ({
    id: generateRandomNumber(numberLimit),
    borderSize: generateRandomNumber(numberLimit) + 'px'
  }))

  return getArr
}

// Функция создает  2-мертный заполненный массив
export const generateDimensionArray = (
  sizeArray: number,
  rowLimit: number,
  numberLimit: number
) => {
  return Array.from({ length: sizeArray }, (val, i) => getBlockArray(rowLimit, numberLimit))
}
