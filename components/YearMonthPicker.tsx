import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { NEPALI_MONTHS, SUPPORTED_YEARS } from '../constants/nepaliDate'
import NepaliDate from 'nepali-date-converter'
import Icon from 'react-native-vector-icons/AntDesign'

export type YearMonthPickerProps = {
  visible?: boolean
  onClose?: () => void
  selectedDate: NepaliDate
  onMonthChange: (date: NepaliDate) => void
}

export const YearMonthPicker = ({ visible, onClose, selectedDate, onMonthChange }: YearMonthPickerProps) => {
  const [selectedYear, setSelectedYear] = useState(selectedDate.getYear())
  const [selectedMonth, setSelectedMonth] = useState(selectedDate.getMonth())

  useEffect(() => {
    setSelectedYear(selectedDate.getYear())
    setSelectedMonth(selectedDate.getMonth())
  }, [selectedDate])

  const onConfirm = useCallback(() => {
    onMonthChange(new NepaliDate(selectedYear, selectedMonth, 1))
    onClose?.()
  }, [onMonthChange, selectedMonth, selectedYear, onClose])

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.row}>
            <TouchableOpacity onPress={onClose}>
              <Text>x</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={SUPPORTED_YEARS}
            renderItem={({ item }) => {
              const isSelected = selectedYear.toString() === item

              return (
                <TouchableOpacity
                  style={[isSelected ? styles.selectedContainer : styles.unselectedContainer]}
                  onPress={() => setSelectedYear(Number(item))}
                >
                  <Text style={[isSelected ? styles.selectedText : styles.unselectedText]}>{item}</Text>
                </TouchableOpacity>
              )
            }}
          />
          <FlatList
            data={NEPALI_MONTHS}
            renderItem={({ item, index }) => {
              const isSelected = NEPALI_MONTHS[selectedMonth] === item

              return (
                <TouchableOpacity
                  style={[isSelected ? styles.selectedContainer : styles.unselectedContainer]}
                  onPress={() => setSelectedMonth(index)}
                >
                  <Text style={[isSelected ? styles.selectedText : styles.unselectedText]}>{item}</Text>
                </TouchableOpacity>
              )
            }}
          />
          <View style={styles.row}>
            <TouchableOpacity onPress={onConfirm}>
              <Text>
                <Icon name="check" size={20} />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 20,
    width: '100%',
    padding: 35,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  row: { width: '100%', flexDirection: 'row' },
  selectedText: { color: '#fff' },
  unselectedText: { color: '#000' },
  selectedContainer: { backgroundColor: '#3498db' },
  unselectedContainer: { backgroundColor: '#fff' },
})
