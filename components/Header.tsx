import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import NepaliDate from 'nepali-date-converter'
import Icon from 'react-native-vector-icons/AntDesign'
import { useCallback, useMemo } from 'react'
import { add, startOfToday } from 'date-fns'
import { useCalendarContext } from '../contexts/CalendarContext'
import { TRANSLATIONS } from '../constants/translations'

export type HeaderProps = {
  selectedMonth: NepaliDate
  setSelectedDate: (activeBSDate: NepaliDate) => void
  onMonthChange: (activeMonth: NepaliDate) => void
  onMonthPress: () => void
}

export const Header = ({ onMonthChange, selectedMonth, setSelectedDate, onMonthPress }: HeaderProps) => {
  const { locale } = useCalendarContext()

  const changeMonth = useCallback(
    (increment: boolean) => {
      onMonthChange(NepaliDate.fromAD(add(selectedMonth.toJsDate(), { months: increment ? 1 : -1 })))
    },
    [onMonthChange, selectedMonth],
  )

  const onTodayPress = useCallback(() => {
    const currentDate = NepaliDate.fromAD(startOfToday())
    setSelectedDate(currentDate)
  }, [setSelectedDate])

  const todayTranslation = useMemo(() => TRANSLATIONS[locale].today, [locale])

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onMonthPress} style={styles.monthContainer}>
        <Text style={styles.monthStyle}>{selectedMonth.format('MMMM - YYYY', locale)}</Text>
      </TouchableOpacity>
      <View style={styles.headerButtonContainer}>
        <TouchableOpacity onPress={onTodayPress} style={styles.headerButton}>
          <Text>{todayTranslation}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeMonth(false)} style={styles.headerButton}>
          <Icon name="left" size={20} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeMonth(true)} style={styles.headerButton}>
          <Icon name="right" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
  },
  monthContainer: {
    width: '50%',
  },
  headerButtonContainer: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  headerButton: {
    marginHorizontal: 10,
  },
  monthStyle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})
