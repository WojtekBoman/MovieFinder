import { FlatList, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import React, { useCallback } from 'react';
import { Movie } from '../../types/Movie';
import MoviesListItem from './MoviesListItem';

interface Props {
  data: Movie[];
  onPressListItem: (item: Movie) => void;
  listItemStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

const keyExtractor = (item: Movie) => `${item.id}`;

const MoviesList = ({ data, onPressListItem, listItemStyle, contentContainerStyle }: Props) => {
  const renderItem = useCallback(({ item }: { item: Movie }) => {
    return <MoviesListItem style={listItemStyle} item={item} onPress={onPressListItem} />;
  }, []);

  return (
    <FlatList
      contentContainerStyle={[contentContainerStyle]}
      keyExtractor={keyExtractor}
      data={data}
      renderItem={renderItem}
      style={styles.listRadius}
    />
  );
};

export default MoviesList;

const styles = StyleSheet.create({
  listRadius: {
    borderRadius: 8,
  },
});
