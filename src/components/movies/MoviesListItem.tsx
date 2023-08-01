import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import React from 'react';
import { Movie } from '../../types/Movie';
import { Card, Text } from 'react-native-paper';
import { Colors } from '../../theme/colors';
import { getMoviePoster } from '../../utils/imageUtils';

interface Props {
  item: Movie;
  onPress: (item: Movie) => void;
  style?: StyleProp<ViewStyle>;
}

const MoviesListItem = ({ item, onPress, style }: Props) => {
  const handleOnPress = () => onPress(item);

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
          resizeMode="stretch"
          source={{ uri: getMoviePoster(item.poster_path) }}
        />
        <Card.Content style={styles.infoContainer}>
          <Text variant="titleLarge">{item.title}</Text>
        </Card.Content>
      </View>
    </Card>
  );
};

export default MoviesListItem;

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.background },
  cover: {
    flex: 0.4,
  },
  infoContainer: {
    flex: 0.6,
    padding: 8,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
