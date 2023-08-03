import { FlatList, FlatListProps, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import React, { useCallback } from 'react';
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

const MoviesList = ({
  data,
  onPressListItem,
  listItemStyle,
  contentContainerStyle,
  style,
  ...props
}: Props) => {
  const renderItem = useCallback(({ item }: { item: Movie }) => {
    return <MoviesListItem style={listItemStyle} item={item} onPress={onPressListItem} />;
  }, []);

  return (
    <FlatList
      {...props}
      contentContainerStyle={[contentContainerStyle]}
      keyExtractor={keyExtractor}
      data={data}
      renderItem={renderItem}
      style={[styles.listRadius, style]}
    />
  );
};

export default MoviesList;

const styles = StyleSheet.create({
  listRadius: {
    borderRadius: 8,
  },
});
