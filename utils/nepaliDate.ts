import NepaliDate, { dateConfigMap } from 'nepali-date-converter'
import { NEPALI_MONTHS } from '../constants/nepaliDate'
import { daysInWeek } from 'date-fns/constants'

export const getMonthDays = (date: NepaliDate): Array<NepaliDate | null> => {
  const firstDay = date.getDay()
  const year = date.getYear()
  const month = date.getMonth()

  const array = []

  for (let i = 0; i < firstDay; i++) {
    array.push(null)
  }

  const daysInMonth = dateConfigMap[year][NEPALI_MONTHS[month]]

  for (let i = firstDay; i < daysInMonth + firstDay; i++) {
    array.push(new NepaliDate(year, month, i - firstDay + 1))
  }

  while (array.length % daysInWeek) {
    array.push(null)
  }

  return array
}
