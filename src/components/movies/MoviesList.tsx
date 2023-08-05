import { FlatList, FlatListProps, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import React, { forwardRef, useCallback } from 'react';
import { Movie } from '../../types/Movie';
import MoviesListItem from './MoviesListItem';

interface Props extends Omit<FlatListProps<Movie>, 'renderItem'> {
  data: Movie[];
  contentContainerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  onPressListItem: (item: Movie) => void;
  listItemStyle?: StyleProp<ViewStyle>;
}

const keyExtractor = (item: Movie) => `${item.id}`;

const MoviesList = forwardRef<FlatList, Props>(function MoviesList(
  { data, onPressListItem, listItemStyle, contentContainerStyle, style, ...props },
  ref
) {
  const renderItem = useCallback(({ item }: { item: Movie }) => {
    return <MoviesListItem style={listItemStyle} item={item} onPress={onPressListItem} />;
  }, []);

  return (
    <FlatList
      {...props}
      ref={ref}
      contentContainerStyle={[contentContainerStyle]}
      keyExtractor={keyExtractor}
      data={data}
      renderItem={renderItem}
      style={[styles.listRadius, style]}
    />
  );
});

export default MoviesList;

const styles = StyleSheet.create({
  listRadius: {
    borderRadius: 8,
  },
});
