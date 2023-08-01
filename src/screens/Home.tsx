import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import MoviesList from '../components/movies/MoviesList';
import { useGetMoviesQuery } from '../store/apis/moviesApi';
import { Colors } from '../theme/colors';

const Home = () => {
  const [queryText, setQueryText] = useState('');

  const { data } = useGetMoviesQuery(queryText);

  console.log('data', data);

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        style={styles.searchbar}
        placeholder="Find your movie"
        value={queryText}
        onChangeText={setQueryText}
      />
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
  listItem: {
    marginBottom: 16,
    marginHorizontal: 16,
  },
  searchbar: {
    backgroundColor: Colors.primary,
    margin: 16,
  },
});
