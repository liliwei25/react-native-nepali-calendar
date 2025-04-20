import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useCalendarContext } from '../contexts/CalendarContext'
import { TRANSLATIONS } from '../constants/translations'

export const DaysRow = () => {
  const { locale } = useCalendarContext()

  return (
    <View style={styles.container}>
      {TRANSLATIONS[locale].days.map((day) => (
        <View style={styles.cell} key={day}>
          <Text style={styles.text}>{day}</Text>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-between' },
  cell: { width: 35, alignItems: 'center' },
  text: { fontSize: 15, fontWeight: '900' },
})
