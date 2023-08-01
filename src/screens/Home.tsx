import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Searchbar, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import MoviesList from '../components/movies/MoviesList';
import { SEARCHBAR_TEXT_MAX_LENGTH } from '../constants/constants';
import { useDebounce } from '../hooks/useDebounce';
import { useGetMoviesQuery } from '../store/apis/moviesApi';
import { Colors } from '../theme/colors';

const Home = () => {
  const [queryText, setQueryText] = useState('');
  const debouncedQueryText = useDebounce<string>(queryText);

  const { data } = useGetMoviesQuery(debouncedQueryText);

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle} variant="displayMedium">
          Movie finder
        </Text>
        <Searchbar
          style={styles.searchbar}
          placeholder="Find your movie"
          value={queryText}
          onChangeText={setQueryText}
          maxLength={SEARCHBAR_TEXT_MAX_LENGTH}
        />
      </View>
      {data?.results ? (
        <MoviesList
          listItemStyle={styles.listItem}
          data={data?.results}
          onPressListItem={(item) => console.log('item', item)}
        />
      ) : null}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  header: {
    padding: 16,
  },
  headerTitle: {
    marginBottom: 8,
  },
  listItem: {
    marginBottom: 16,
    marginHorizontal: 16,
  },
  searchbar: {
    backgroundColor: Colors.primary,
  },
});
