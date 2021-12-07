import moment from 'moment';
import React from 'react';
import {ScrollView} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {View, Text, StyleSheet, Card, Padder, Headline, useTheme, Caption} from 'src/packages/base_components';
import {standardPadding} from 'src/styles';

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
];

export function CalendarScreen() {
  const [date, setDate] = React.useState(() => new Date());

  const daysEvents = eventsMock.filter((event) => moment(event.date).isSame(date, 'day'));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Calendar
          markedDates={{
            [moment(date).format('yyyy-MM-DD')]: {selected: true},
            ...eventsMock.reduce((acc, event) => {
              const dateString = moment(event.date).format('yyyy-MM-DD');
              acc[dateString] = {marked: true, selected: dateString === moment(date).format('yyyy-MM-DD')};
              return acc;
            }, {} as {[key: string]: any}),
          }}
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
});

function EventsDisplay({events, headline}: {events: Event[]; headline: string}) {
  const {colors} = useTheme();
  return (
    <Card style={styles.card}>
      <Headline>{headline}</Headline>
      <View>
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
