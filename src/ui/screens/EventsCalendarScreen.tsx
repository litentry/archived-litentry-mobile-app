import React from 'react';
import {StyleSheet, ScrollView, View, Platform} from 'react-native';
import dayjs from 'dayjs';
import Animated, {FadeInUp, FadeOutDown} from 'react-native-reanimated';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {Card, Text, Calendar, useTheme} from '@ui/library';
import {Padder} from '@ui/components/Padder';
import {standardPadding} from '@ui/styles';
import {useCalendarEvents, CalendarEvent} from 'src/api/hooks/useCalendarEvents';
import LoadingView from '@ui/components/LoadingView';

const CALENDAR_FORMAT = 'YYYY-MM-DD';
const SCHEDULE_DATE_FORMAT = 'dddd, MMMM D';
const EVENT_TIME_FORMAT = 'HH:mm';

export function EventsCalendarScreen() {
  const {data, loading} = useCalendarEvents();
  const [selectedDate, setSelectedDate] = React.useState(() => new Date());

  const markedDates = React.useMemo(
    () => ({
      [dayjs(selectedDate).format(CALENDAR_FORMAT)]: {selected: true},
      ...data?.reduce((acc, event) => {
        const eventDate = dayjs(event.date).format(CALENDAR_FORMAT);
        acc[eventDate] = {marked: true, selected: eventDate === dayjs(selectedDate).format(CALENDAR_FORMAT)};
        return acc;
      }, {} as {[key: string]: {marked: boolean; selected?: boolean}}),
    }),
    [data, selectedDate],
  );

  if (loading && !data) {
    return <LoadingView />;
  }

  const firstEventDate = data?.[0]?.date;
  const lastEventDate = data?.[data.length - 1]?.date;
  const daySchedule = data?.filter((event) => dayjs(event.date).isSame(selectedDate, 'day')) ?? [];

  return (
    <SafeView edges={noTopEdges}>
      <ScrollView contentContainerStyle={styles.container}>
        <Card style={styles.container}>
          <Calendar
            current={dayjs(selectedDate).format(CALENDAR_FORMAT)}
            maxDate={lastEventDate ? dayjs(lastEventDate).format(CALENDAR_FORMAT) : undefined}
            minDate={firstEventDate ? dayjs(firstEventDate).format(CALENDAR_FORMAT) : undefined}
            markedDates={markedDates}
            onDayPress={(d) => setSelectedDate(new Date(d.dateString))}
          />
        </Card>
        <Padder scale={1} />
        <Schedule date={dayjs(selectedDate).format(SCHEDULE_DATE_FORMAT)} events={daySchedule} />
      </ScrollView>
    </SafeView>
  );
}

function Schedule({date, events}: {date: string; events: CalendarEvent[]}) {
  const {colors} = useTheme();
  return (
    <Container _key={date}>
      <Card style={styles.container}>
        <Text variant="titleLarge">{date}</Text>
        <View>
          {events.length === 0 && (
            <Text variant="bodySmall" style={styles.noEventsText}>
              No events scheduled for this day
            </Text>
          )}
          <Padder scale={1} />
          {events.map((event, index) => (
            <View key={index} style={styles.eventRow}>
              <Text variant="titleMedium" style={{color: colors.accent}}>
                {dayjs(event.date).format(EVENT_TIME_FORMAT)}
              </Text>
              <Padder scale={1} />
              <View style={styles.eventDescription}>
                <Text>{event.title}</Text>
                <Text variant="bodySmall">{event.via}</Text>
              </View>
            </View>
          ))}
        </View>
      </Card>
    </Container>
  );
}

/**
 * Reanimated layout animations have issues on android,
 * TODO: remove this container when fixed.
 */
function Container({children, _key}: {children: React.ReactNode; _key: string}) {
  if (Platform.OS === 'ios') {
    return (
      <Animated.View entering={FadeInUp} exiting={FadeOutDown} key={_key}>
        {children}
      </Animated.View>
    );
  }

  return <View>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    padding: standardPadding * 2,
  },
  eventRow: {
    flexDirection: 'row',
    marginTop: standardPadding,
  },
  noEventsText: {
    textAlign: 'center',
    marginTop: standardPadding * 3,
  },
  eventDescription: {
    flexShrink: 1,
  },
});
