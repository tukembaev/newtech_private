export function todayDate() {
  let newDate = new Date()
  let date = newDate.getDate()
  let month = newDate.getMonth() + 1
  let year = newDate.getFullYear()
  let hours = ('0' + newDate.getHours()).slice(-2)
  let minute = ('0' + newDate.getMinutes()).slice(-2)

  return `${date}.${
    month < 10 ? `0${month}` : `${month}`
  }.${year} ${hours}:${minute}`
}

export default todayDate
