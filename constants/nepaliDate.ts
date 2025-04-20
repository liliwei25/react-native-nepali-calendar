import { DateConfig, dateConfigMap } from 'nepali-date-converter'

export const SUPPORTED_YEARS = Object.keys(dateConfigMap)

export const NEPALI_MONTHS = Object.keys(dateConfigMap['2000']) as (keyof DateConfig[number])[]
