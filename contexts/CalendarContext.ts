import { createContext, useContext } from 'react'
import NepaliDate from 'nepali-date-converter'

export interface ICalendarContext {
  locale: typeof NepaliDate.language
}

export const CalendarContext = createContext<ICalendarContext>({
  locale: 'en'
})

export const useCalendarContext = () => useContext(CalendarContext)
