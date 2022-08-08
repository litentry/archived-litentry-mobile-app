import React from 'react';
import {Calendar as RNCalendar, CalendarProps} from 'react-native-calendars';
import {useTheme} from '@ui/library';

export function Calendar(props: CalendarProps) {
  const {colors, dark} = useTheme();

  return (
    <RNCalendar
      key={`${dark}`}
      theme={{
        selectedDayBackgroundColor: colors.secondary,
        backgroundColor: colors.background,
        calendarBackground: colors.surface,
        dayTextColor: colors.onSurface,
        textDisabledColor: colors.secondary,
        dotColor: colors.secondary,
        arrowColor: colors.primary,
        monthTextColor: colors.primary,
        indicatorColor: colors.primary,
        todayTextColor: colors.primary,
        textMonthFontWeight: 'bold',
      }}
      {...props}
    />
  );
}
