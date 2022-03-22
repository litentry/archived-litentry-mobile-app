import {LoadingBox} from '@ui/components/LoadingBox';
import {SectionTeaserContainer} from '@ui/components/SectionTeaserContainer';
import {useCalendarEvents} from 'src/api/hooks/useCalendarEvents';
import {View, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Text, useTheme, Divider, Subheading, Caption} from '@ui/library';
import {standardPadding} from '@ui/styles';
import {formatDate} from 'src/utils/date';
import EmptyList from 'image/EmptyList.png';

type Props = {
  onPress: () => void;
};

export function EventsCalendarTeaser(props: Props) {
  const {colors} = useTheme();
  const {data: events, loading} = useCalendarEvents();
  const topThreeEvents = events?.slice(0, 3) ?? [];
  return (
    <SectionTeaserContainer onPress={props.onPress} title="Events Calender">
      {loading && !topThreeEvents ? (
        <LoadingBox />
      ) : topThreeEvents?.length > 0 ? (
        topThreeEvents.map((event, id) => (
          <React.Fragment key={id}>
            <View style={styles.container}>
              <View style={styles.dateContainer}>
                <Text style={{color: colors.primary}}>{formatDate(event.date, 'DD/MM')}</Text>
              </View>
              <View style={styles.titleContainer}>
                <Text>{event.title}</Text>
              </View>
            </View>
            <Divider />
          </React.Fragment>
        ))
      ) : (
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image source={EmptyList} resizeMode="contain" />
          </View>
          <View style={styles.emptyContainer}>
            <Subheading>No Upcoming Events</Subheading>
            <Caption>Check back soon</Caption>
          </View>
        </View>
      )}
    </SectionTeaserContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: standardPadding,
  },
  dateContainer: {
    width: '15%',
    justifyContent: 'center',
  },
  titleContainer: {
    maxWidth: '90%',
    paddingHorizontal: standardPadding,
  },
  imageContainer: {
    width: '30%',
    height: '20%',
    paddingHorizontal: standardPadding * 2,
  },
  emptyContainer: {
    maxWidth: '90%',
    paddingHorizontal: standardPadding,
    flexWrap: 'wrap',
  },
});
