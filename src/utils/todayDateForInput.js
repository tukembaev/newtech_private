export function getCurrentDate() {
  const today = new Date()
  const year = today.getFullYear()
  let month = today.getMonth() + 1 // Месяцы начинаются с 0, поэтому добавляем 1
  let day = today.getDate()

  // Добавляем ведущий ноль для однозначных чисел
  if (month < 10) {
    month = `0${month}`
  }
  if (day < 10) {
    day = `0${day}`
  }

  // Форматирование даты в строку "YYYY-MM-DD"
  return `${year}-${month}-${day}`
}
