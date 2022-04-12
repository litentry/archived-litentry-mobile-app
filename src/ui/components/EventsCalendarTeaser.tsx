import {LoadingBox} from '@ui/components/LoadingBox';
import {SectionTeaserContainer} from '@ui/components/SectionTeaserContainer';
import {useCalendarEvents} from 'src/api/hooks/useCalendarEvents';
import {View, StyleSheet} from 'react-native';
import React from 'react';
import {Text, useTheme, Divider} from '@ui/library';
import {standardPadding} from '@ui/styles';
import {formatDate} from 'src/utils/date';
import {EmptyStateTeaser} from './EmptyStateTeaser';

type Props = {
  onPress: () => void;
};

export function EventsCalendarTeaser(props: Props) {
  const {colors} = useTheme();
  const {data: events, loading} = useCalendarEvents();
  const topThreeEvents = events?.slice(0, 3) ?? [];
  return (
    <SectionTeaserContainer onPress={props.onPress} title="Upcoming events">
      {loading && !events ? (
        <LoadingBox />
      ) : topThreeEvents?.length > 0 ? (
        topThreeEvents.map((event, id) => (
          <React.Fragment key={id}>
            <View style={styles.container} testID={'event_detail_items'}>
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
        <EmptyStateTeaser subheading="No Upcoming Events" caption="Check back soon" />
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
