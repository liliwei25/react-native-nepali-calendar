import React, { useCallback, useState } from 'react'
import NepaliDate from 'nepali-date-converter'
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native'
import { DateCell } from './DateCell'
import { PlaceholderCell } from './PlaceholderCell'
import { getMonthDays } from '../utils/nepaliDate'
import { CalendarContext } from '../contexts/CalendarContext'
import { Header } from './Header'
import { DaysRow } from './DaysRow'
import { daysInWeek } from 'date-fns/constants'
import { startOfDay } from 'date-fns'

export type CalendarProps = {
  defaultDate?: NepaliDate
  onDayLongPress?: (date: NepaliDate) => void
  locale?: typeof NepaliDate.language
  onMonthChange?: (date: NepaliDate) => void
  onDateChange?: (date: NepaliDate) => void
}

export const Calendar = ({
  defaultDate,
  locale = 'en',
  onMonthChange: onMonthChangeProp,
  onDateChange: onDateChangeProp,
  onDayLongPress,
}: CalendarProps) => {
  const [selectedDate, setSelectedDate] = useState(defaultDate ?? NepaliDate.fromAD(startOfDay(new Date())))
  const [selectedMonth, setSelectedMonth] = useState(selectedDate)
  const [dates, setDates] = useState<(NepaliDate | null)[]>(getMonthDays(selectedDate))

  const onDateChange = useCallback(
    (date: NepaliDate) => {
      onDateChangeProp?.(date)
      setSelectedDate(date)
      setSelectedMonth(date)
    },
    [onDateChangeProp],
  )

  const renderItem = useCallback<ListRenderItem<NepaliDate | null>>(
    ({ item }) =>
      item ? (
        <DateCell
          date={item}
          onLongPress={onDayLongPress}
          onPress={onDateChange}
          isSelected={selectedDate.valueOf() === item.valueOf()}
        />
      ) : (
        <PlaceholderCell />
      ),
    [onDayLongPress, onDateChange, selectedDate],
  )

  const onMonthChange = useCallback(
    (date: NepaliDate) => {
      onMonthChangeProp?.(date)
      setSelectedMonth(date)
      setDates(getMonthDays(date))
    },
    [onMonthChangeProp],
  )

  return (
    <CalendarContext.Provider value={{ locale }}>
      <View style={styles.container}>
        <Header selectedMonth={selectedMonth} setSelectedDate={onDateChange} onMonthChange={onMonthChange} />
        <DaysRow />
        <FlatList
          columnWrapperStyle={styles.listColumnWrapper}
          data={dates}
          renderItem={renderItem}
          numColumns={daysInWeek}
        />
      </View>
    </CalendarContext.Provider>
  )
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff' },
  listColumnWrapper: { justifyContent: 'space-between' },
})
