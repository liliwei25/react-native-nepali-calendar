import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import NepaliDate from 'nepali-date-converter'
import { useCalendarContext } from '../contexts/CalendarContext'

export type DateCellProps = {
  date: NepaliDate
  onLongPress?: (date: NepaliDate) => void
  onPress?: (date: NepaliDate) => void
  isSelected?: boolean
}

export const DateCell = ({ date, onLongPress, onPress, isSelected }: DateCellProps) => {
  const { locale } = useCalendarContext()

  return (
    <TouchableOpacity
      onLongPress={() => onLongPress?.(date)}
      onPress={() => onPress?.(date)}
      style={[styles.container, isSelected ? styles.selectedContainer : styles.unselectedContainer]}
    >
      <Text style={[styles.text, isSelected ? styles.selectedText : styles.unselectedText]}>
        {date.format('DD', locale)}
      </Text>
    </TouchableOpacity>
  )
}

export const styles = StyleSheet.create({
  container: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    margin: 2
  },
  selectedText: { color: '#fff' },
  unselectedText: { color: '#000' },
  selectedContainer: { backgroundColor: '#3498db' },
  unselectedContainer: { backgroundColor: '#fff' },
  text: { fontSize: 15 }
})
