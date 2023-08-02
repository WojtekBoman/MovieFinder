import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Searchbar, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import MoviesList from '../components/movies/MoviesList';
import { SEARCHBAR_TEXT_MAX_LENGTH } from '../constants/constants';
import { useDebounce } from '../hooks/useDebounce';
import { RootStackParamList } from '../navigation';
import { moviesAdapter, moviesSelector, useGetMoviesQuery } from '../store/apis/moviesApi';
import { Colors } from '../theme/colors';
import { Movie } from '../types/Movie';

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigation = useNavigation<HomeNavigationProp>();
  const [queryText, setQueryText] = useState('');

  const debounceCallback = () => setCurrentPage(1);
  const debouncedQueryText = useDebounce<string>(queryText, debounceCallback);

  const { data } = useGetMoviesQuery(
    {
      queryText: debouncedQueryText,
      page: currentPage,
    },
    {
      skip: !queryText,
      selectFromResult: ({ data, ...otherParams }) => ({
        data: moviesSelector.selectAll(data ?? moviesAdapter.getInitialState()),
        ...otherParams,
      }),
    }
  );

  const handleOnPressListItem = (item: Movie) =>
    navigation.navigate('MovieDetails', { movieId: item.id });

  const handleOnEndReached = () => {
    setCurrentPage(currentPage + 1);
  };

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

      <MoviesList
        listItemStyle={styles.listItem}
        data={queryText ? data : []}
        onPressListItem={handleOnPressListItem}
        onEndReached={handleOnEndReached}
      />
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
