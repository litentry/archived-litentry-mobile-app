import moment from 'moment';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {Text, Card, Headline, useTheme, Caption} from '@ui/library';
import {standardPadding} from '@ui/styles';
import {Padder} from '@ui/components/Padder';

type Event = {
  title: string;
  date: string;
  via: string;
};

// Different events with different titles and dates
const eventsMock: Event[] = [
  {title: 'Treasury election', date: '2021-12-01T12:00:00', via: 'Treasury'},
  {title: 'Treasury election 2', date: '2021-12-01T14:00:00', via: 'Treasury'},
  {title: 'Budget', date: '2021-12-05T12:00:00', via: 'Budget'},
  {title: 'Citizen', date: '2021-12-10T12:00:00', via: 'Citizen'},
  {title: 'Budget', date: '2021-12-16T12:00:00', via: 'Budget'},
  {title: 'Citizen', date: '2021-12-22T12:00:00', via: 'Citizen'},
  {title: 'Treasury election', date: '2021-12-27T12:00:00', via: 'Treasury'},
  {title: 'Budget', date: '2021-12-31T12:00:00', via: 'Budget'},
  {title: 'Citizen', date: '2022-01-03T12:00:00', via: 'Citizen'},
  {title: 'Treasury election', date: '2022-01-08T12:00:00', via: 'Treasury'},
  {title: 'Budget', date: '2022-01-14T12:00:00', via: 'Budget'},
  {title: 'Citizen', date: '2022-01-20T12:00:00', via: 'Citizen'},
];

const CALENDAR_FORMAT = 'YYYY-MM-DD';

function useEvents() {
  const {firstEventDate, lastEventDate} = eventsMock.reduce<{lastEventDate?: string; firstEventDate?: string}>(
    (acc, event) => {
      return {
        firstEventDate: moment(event.date).isBefore(acc.firstEventDate) ? event.date : acc.firstEventDate,
        lastEventDate: moment(event.date).isAfter(acc.lastEventDate) ? event.date : acc.lastEventDate,
      };
    },
    {lastEventDate: undefined, firstEventDate: undefined},
  );

  return {events: eventsMock, lastEventDate, firstEventDate};
}

export function CalendarScreen() {
  const [date, setDate] = React.useState(() => new Date());

  const {lastEventDate, firstEventDate, events} = useEvents();
  const daysEvents = events.filter((event) => moment(event.date).isSame(date, 'day'));

  const markedDates = {
    [moment(date).format('yyyy-MM-DD')]: {selected: true},
    ...events.reduce((acc, event) => {
      const dateString = moment(event.date).format(CALENDAR_FORMAT);
      acc[dateString] = {marked: true, selected: dateString === moment(date).format(CALENDAR_FORMAT)};
      return acc;
    }, {} as {[key: string]: {marked: boolean; selected?: boolean}}),
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Calendar
          maxDate={lastEventDate ? new Date(lastEventDate) : undefined}
          minDate={firstEventDate ? new Date(firstEventDate) : undefined}
          markedDates={markedDates}
          onDayPress={(d) => setDate(new Date(d.dateString))}
        />
      </Card>
      <Padder scale={2} />
      <EventsDisplay headline={moment(date).format('DD MMMM yyyy')} events={daysEvents} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: standardPadding * 2,
  },
  container: {
    padding: standardPadding * 2,
  },
  eventRow: {
    flexDirection: 'row',
    marginTop: standardPadding,
  },
  noEventsText: {
    color: '#999',
    textAlign: 'center',
    marginVertical: standardPadding * 3,
  },
});

function EventsDisplay({events, headline}: {events: Event[]; headline: string}) {
  const {colors} = useTheme();
  return (
    <Card style={styles.card}>
      <Headline>{headline}</Headline>
      <View>
        {events.length === 0 && <Caption style={styles.noEventsText}>No events scheduled for this day</Caption>}
        {events.map((event, index) => (
          <View key={index} style={styles.eventRow}>
            <Text style={{color: colors.accent}}>{moment(event.date).format('HH:mm')}</Text>
            <Padder scale={2} />
            <View>
              <Text>{event.title}</Text>
              <Caption>via {event.via}</Caption>
            </View>
          </View>
        ))}
      </View>
    </Card>
  );
}
