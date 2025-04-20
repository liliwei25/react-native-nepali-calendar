import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles as dateCellStyles } from './DateCell'

export const PlaceholderCell = () => {
  return <TouchableOpacity disabled style={[dateCellStyles.container, styles.placeholderCell]} />
}

const styles = StyleSheet.create({
  placeholderCell: {
    backgroundColor: '#fff'
  }
})
