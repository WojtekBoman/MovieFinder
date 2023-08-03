import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import React from 'react';
import { Movie } from '../../types/Movie';
import { Card, Text } from 'react-native-paper';
import { Colors } from '../../theme/colors';
import { getMoviePoster } from '../../utils/imageUtils';
import TextWithIcon from '../text/TextWithIcon';
import { spacing } from '../../theme/spacing';

interface Props {
  item: Movie;
  onPress: (item: Movie) => void;
  style?: StyleProp<ViewStyle>;
}

const MoviesListItem = ({ item, onPress, style }: Props) => {
  const handleOnPress = () => onPress(item);

  const moviePosterImage = getMoviePoster(item.poster_path);

  return (
    <Card
      mode="outlined"
      theme={{ colors: { outline: Colors.primary } }}
      onPress={handleOnPress}
      style={[styles.container, style]}
    >
      <View style={styles.innerContainer}>
        <Card.Cover
          style={styles.cover}
          resizeMode={moviePosterImage.resizeMode}
          source={moviePosterImage.source}
        />
        <Card.Content style={styles.infoContainer}>
          <Text variant="titleLarge">{item.title}</Text>
          <View style={styles.ratesContainer}>
            <TextWithIcon iconName="star" text={item.vote_count.toString()} />
            <TextWithIcon iconName="chart-bar" text={item.popularity.toString()} />
          </View>
        </Card.Content>
      </View>
    </Card>
  );
};

export default MoviesListItem;

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.background },
  cover: {
    backgroundColor: Colors.background,
    flex: 0.4,
  },
  infoContainer: {
    flex: 0.6,
    justifyContent: 'space-between',
    padding: spacing[3],
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ratesContainer: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
});
