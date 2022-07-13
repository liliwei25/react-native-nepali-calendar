# Introduction 

React native library for nepali calendar. Also it helps to convert AD date to BS date.

# Installation

```npm install react-native-nepali-calendar```
# Package Required

It require react-native-vector-icons and moment

```npm install react-native-vector-icons moment```

# Usage

For Nepali Calendar

```js
import NepaliCalendar from 'react-native-nepali-calendar'
 <NepaliCalendar
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

