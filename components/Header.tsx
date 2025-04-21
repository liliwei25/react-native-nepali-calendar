import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import NepaliDate from 'nepali-date-converter'
import Icon from 'react-native-vector-icons/AntDesign'
import { useCallback, useMemo } from 'react'
import { add, startOfToday } from 'date-fns'
import { useCalendarContext } from '../contexts/CalendarContext'
import { TRANSLATIONS } from '../constants/translations'
import { Dropdown } from 'react-native-element-dropdown'
import { NEPALI_MONTHS, SUPPORTED_YEARS } from '../constants/nepaliDate'

const MONTH_OPTIONS = NEPALI_MONTHS.map((month, i) => ({ value: i, label: month }))

const YEAR_OPTIONS = SUPPORTED_YEARS.map((year) => ({ value: year, label: year }))

export type HeaderProps = {
  selectedMonth: NepaliDate
  setSelectedDate: (activeBSDate: NepaliDate) => void
  onMonthChange: (activeMonth: NepaliDate) => void
}

export const Header = ({ onMonthChange, selectedMonth, setSelectedDate }: HeaderProps) => {
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
    onMonthChange(currentDate)
  }, [setSelectedDate])

  const todayTranslation = useMemo(() => TRANSLATIONS[locale].today, [locale])

  return (
    <View style={styles.header}>
      <View style={styles.monthContainer}>
        <Dropdown
          data={MONTH_OPTIONS}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          value={selectedMonth.getMonth()}
          onChange={(item) =>
            onMonthChange(new NepaliDate(selectedMonth.getYear(), item.value, selectedMonth.getDate()))
          }
        />
        <Text> - </Text>
        <Dropdown
          data={YEAR_OPTIONS}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          value={selectedMonth.getYear().toString()}
          onChange={(item) =>
            onMonthChange(new NepaliDate(item.value, selectedMonth.getMonth(), selectedMonth.getDate()))
          }
        />
      </View>
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
    flexDirection: 'row',
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
