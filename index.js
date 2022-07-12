import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import CalanderData from './CalendarData';
import {
  convertADtoBS,
  convertBStoAD,
  getBsMonthDays,
  toDevanagariDigits,
} from './calendarFunction';
const activeDate = new Date();
const CalendarView = ({
  onMonthChange,
  onDateChange,
  onDayLongPress,
  devanagariDigits=false,
  markedDates = [],
}) => {
  const [activeBSDate, setActiveBSDate] = useState(
    convertADtoBS(
      activeDate.getFullYear(),
      activeDate.getMonth() + 1,
      activeDate.getDate(),
    ),
  );
  const [date, setDate] = useState([]);
  const [visible, setVisiable] = useState(false);
  const [selectedDate, setSelectedData] = useState(1);

  useEffect(() => {
    calendarData();
  }, [activeBSDate]);

  useEffect(() => {
    setSelectedData(activeBSDate.bsDate);
  }, []);
  //make calendar view
  const calendarData = () => {
    const fistDay = new Date(
      convertBStoAD(activeBSDate.bsYear, activeBSDate.bsMonth, 1),
    ).getDay();
    dayArrayList(
      getBsMonthDays(activeBSDate.bsYear, activeBSDate.bsMonth),
      fistDay,
    );
  };
  const dayArrayList = (maxdays, fistDay) => {
    var array = [];
    for (let index = 0; index < fistDay; index++) {
      array.push('');
    }
    for (let index = 0; index < maxdays; index++) {
      array.push(index + 1);
    }
    const rem = 42 - array.length;
    for (let index = 0; index < rem; index++) {
      array.push('');
    }
    setDate(array);
  };

  //increase month
  const increaseMonth = () => {
    var changeMonth = {};
    if (activeBSDate.bsMonth === 12) {
      setActiveBSDate();
      changeMonth = {
        bsYear: activeBSDate.bsYear + 1,
        bsMonth: 1,
        bsDate: activeBSDate.bsDate,
      };
    } else {
      changeMonth = {
        bsYear: activeBSDate.bsYear,
        bsMonth: activeBSDate.bsMonth + 1,
        bsDate: activeBSDate.bsDate,
      };
    }
    setActiveBSDate(changeMonth);
    var data = {
      nepaliDate: changeMonth,
      fistDay: convertBStoAD(changeMonth.bsYear, changeMonth.bsMonth, 1),
      lastDay: convertBStoAD(
        changeMonth.bsYear,
        changeMonth.bsMonth,
        getBsMonthDays(changeMonth.bsYear, changeMonth.bsMonth),
      ),
    };
    onMonthChange(data);
  };

  //decrease month
  const decreaseMonth = () => {
    var changeMonth = {};
    if (activeBSDate.bsMonth === 1) {
      setActiveBSDate();
      changeMonth = {
        bsYear: activeBSDate.bsYear - 1,
        bsMonth: 12,
        bsDate: activeBSDate.bsDate,
      };
    } else {
      changeMonth = {
        bsYear: activeBSDate.bsYear,
        bsMonth: activeBSDate.bsMonth - 1,
        bsDate: activeBSDate.bsDate,
      };
    }
    setActiveBSDate(changeMonth);
    var data = {
      nepaliDate: changeMonth,
      fistDay: convertBStoAD(changeMonth.bsYear, changeMonth.bsMonth, 1),
      lastDay: convertBStoAD(
        changeMonth.bsYear,
        changeMonth.bsMonth,
        getBsMonthDays(changeMonth.bsYear, changeMonth.bsMonth),
      ),
    };
    onMonthChange(data);
  };

  const todayDate = () => {
    var currentDate = convertADtoBS(
      activeDate.getFullYear(),
      activeDate.getMonth() + 1,
      activeDate.getDate(),
    );
    var data = {
      nepaliDate: {
        bsYear: activeBSDate.bsYear,
        bsMonth: activeBSDate.bsMonth,
        bsDate: currentDate.bsDate,
      },
      englishDate: activeDate,
    };
    onDateChange(data);
    setSelectedData(currentDate.bsDate);
    setActiveBSDate(currentDate);
    var monthData = {
      nepaliDate: currentDate,
      fistDay: convertBStoAD(currentDate.bsYear, currentDate.bsMonth, 1),
      lastDay: convertBStoAD(
        currentDate.bsYear,
        currentDate.bsMonth,
        getBsMonthDays(currentDate.bsYear, currentDate.bsMonth),
      ),
    };
    onMonthChange(monthData);
  };

  const onLongPress = item => {
    const selected = convertBStoAD(
      activeBSDate.bsYear,
      activeBSDate.bsMonth,
      item,
    );
    var data = {
      nepaliDate: {
        bsYear: activeBSDate.bsYear,
        bsMonth: activeBSDate.bsMonth,
        bsDate: item,
      },
      englishDate: selected,
    };
    onDayLongPress(data);
  };

  const yearAndMonthPicker = () => (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{width: '100%', flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => setVisiable(false)}>
              <Text>x</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          disabled
          // onPress={() => setVisiable(true)}
          style={styles.monthContainer}>
          <Text style={styles.monthStyle}>
            {CalanderData.bsMonths[activeBSDate.bsMonth - 1]} -{' '}
            {devanagariDigits?toDevanagariDigits(activeBSDate.bsYear):activeBSDate.bsYear}
            {/* <Icon name="caretdown" /> */}
          </Text>
        </TouchableOpacity>
        <View style={styles.headerButtonContainer}>
          <TouchableOpacity onPress={todayDate} style={styles.headerButton}>
            <Text>TODAY</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              decreaseMonth();
            }}
            style={styles.headerButton}>
            <Icon name="left" size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              increaseMonth();
            }}
            style={styles.headerButton}>
            <Icon name="right" size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {CalanderData.bsDays.map(item => (
          <View style={{width: 35, alignItems: 'center'}} key={item}>
            <Text style={{fontSize: 15, fontWeight: '900'}}>{item}</Text>
          </View>
        ))}
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {CalanderData.adDays.map(item => (
          <View style={{width: 35, alignItems: 'center'}} key={item}>
            <Text style={{fontSize: 15, fontWeight: '900'}}>{item}</Text>
          </View>
        ))}
      </View>

      <FlatList
        columnWrapperStyle={{justifyContent: 'space-between'}}
        data={date}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <>
            <TouchableOpacity
              disabled={item ? false : true}
              onLongPress={() => {
                onLongPress(item);
              }}
              onPress={() => {
                const selected = convertBStoAD(
                  activeBSDate.bsYear,
                  activeBSDate.bsMonth,
                  item,
                );
                var data = {
                  nepaliDate: {
                    bsYear: activeBSDate.bsYear,
                    bsMonth: activeBSDate.bsMonth,
                    bsDate: item,
                  },
                  englishDate: selected,
                };
                onDateChange(data);
                setSelectedData(item);
              }}
              key={item}
              style={{
                height: 30,
                width: 30,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: selectedDate === item ? '#3498db' : '#fff',
                borderRadius: 20,
                margin: 2,
              }}>
              <Text
                style={{
                  color: selectedDate == item ? '#fff' : '#000',
                  fontSize: 15,
                }}>
                {devanagariDigits?toDevanagariDigits(item):item}
              </Text>
              {selectedDate != item &&
                markedDates[
                  moment(
                    convertBStoAD(
                      activeBSDate.bsYear,
                      activeBSDate.bsMonth,
                      item,
                    ),
                  ).format('YYYY-MM-DD')
                ]?.marked && (
                  <Text
                    style={{
                      fontSize: 8,
                      padding: 0,
                      position: 'absolute',
                      top: 20,
                    }}>
                    {'\u2B24'}
                  </Text>
                )}
            </TouchableOpacity>
          </>
        )}
        numColumns={7}
      />
      {/* {yearAndMonthPicker()} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default CalendarView;
