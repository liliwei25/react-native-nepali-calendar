# Introduction 

React native library for nepali calendar. Also it helps to convert AD date to BS date.

# Instrallation

```npm install react-native-nepali-calendar```
# pacakge Required

It require react-native-vector-icon and moment

```npm install react-native-vector-icon moment```

# Usage

For Nepali Calendar

```js
import NepaliCalendar from 'react-native-nepali-calendar'
 <CalendarView
        onMonthChange={month => {
          console.log(month)
        }}
        onDateChange={date => {
         console.log(date)
        }}
        onDayLongPress={day => {
         console.log(day)
        }}
      />
```
For AD to BS and BS to AD
```js
import {convertADtoBS,convertBStoAD} from 'react-native-nepali-calendar/calendarFunction'

console.log(convertADtoBS(2021,10,30))
console.log(convertBStoAD(2078,11,13))

```

