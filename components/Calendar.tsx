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
import { YearMonthPicker } from './YearMonthPicker'

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
  const [selectedDate, setSelectedDate] = useState(defaultDate ?? NepaliDate.fromAD(new Date()))
  const [selectedMonth, setSelectedMonth] = useState(selectedDate)
  const [dates, setDates] = useState<(NepaliDate | null)[]>([])
  const [showYearPicker, setShowYearPicker] = useState(false)

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
        <DateCell date={item} onLongPress={onDayLongPress} onPress={onDateChange} isSelected={selectedDate === item} />
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

  const onMonthPress = useCallback(() => {
    setShowYearPicker(true)
  }, [])

  const closeYearPicker = useCallback(() => {
    setShowYearPicker(false)
  }, [])

  return (
    <CalendarContext value={{ locale }}>
      <View style={styles.container}>
        <Header
          selectedMonth={selectedMonth}
          setSelectedDate={onDateChange}
          onMonthChange={onMonthChange}
          onMonthPress={onMonthPress}
        />
        <DaysRow />
        <FlatList
          columnWrapperStyle={styles.listColumnWrapper}
          data={dates}
          renderItem={renderItem}
          numColumns={daysInWeek}
        />
        <YearMonthPicker
          visible={showYearPicker}
          onClose={closeYearPicker}
          selectedDate={selectedDate}
          onMonthChange={onMonthChange}
        />
      </View>
    </CalendarContext>
  )
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff' },
  listColumnWrapper: { justifyContent: 'space-between' },
})
