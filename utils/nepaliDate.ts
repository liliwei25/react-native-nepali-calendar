import NepaliDate, { dateConfigMap } from 'nepali-date-converter'
import { NEPALI_MONTHS } from '../constants/nepaliDate'
import { add, startOfMonth } from 'date-fns'
import { daysInWeek } from 'date-fns/constants'

export const getMonthDays = (month: NepaliDate): Array<NepaliDate | null> => {
  const firstDay = month.getDay()
  const array = []

  for (let i = 0; i < firstDay; i++) {
    array.push(null)
  }

  const daysInMonth = dateConfigMap[month.getYear()][NEPALI_MONTHS[month.getMonth()]]

  let startDay = startOfMonth(month.toJsDate())

  for (let i = firstDay; i < daysInMonth + firstDay; i++) {
    array.push(NepaliDate.fromAD(startDay))
    startDay = add(startDay, { days: 1 })
  }

  while (array.length % daysInWeek) {
    array.push(null)
  }

  return array
}
