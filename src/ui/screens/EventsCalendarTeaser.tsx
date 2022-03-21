import {LoadingBox} from '@ui/components/LoadingBox';
import {SectionTeaserContainer} from '@ui/components/SectionTeaserContainer';
import {useCalendarEvents} from 'src/api/hooks/useCalendarEvents';
import {View, FlatList, StyleSheet} from 'react-native';
import React from 'react';
import {Divider, Text, useTheme} from '@ui/library';
import {standardPadding} from '@ui/styles';
import dayjs from 'dayjs';

type Props = {
  onPress: () => void;
};

export function EventsCalendarTeaser(props: Props) {
  const {colors} = useTheme();
  const {data: events, loading} = useCalendarEvents();
  const topThreeEvents = events?.slice(0, 3);
  const formateDate = (date: string) => {
    const formatedDate = dayjs(date);
    const [eventDate, eventMonth] = [formatedDate.date(), formatedDate.month()];
    return eventDate.toString().concat('/').concat(eventMonth.toString());
  };
  return (
    <SectionTeaserContainer onPress={props.onPress} title="Events Calender">
      {loading && !topThreeEvents ? (
        <LoadingBox />
      ) : topThreeEvents ? (
        <FlatList
          ItemSeparatorComponent={Divider}
          data={topThreeEvents}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <View style={styles.container}>
              <View style={styles.dateContainer}>
                <Text style={{color: colors.primary}}>{formateDate(item.date)}</Text>
              </View>
              <View style={styles.titleContainer}>
                <Text>{item.title}</Text>
              </View>
            </View>
          )}
        />
      ) : null}
    </SectionTeaserContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: standardPadding,
  },
  dateContainer: {
    width: '10%',
    justifyContent: 'center',
  },
  titleContainer: {
    maxWidth: '90%',
    paddingHorizontal: standardPadding,
  },
});
