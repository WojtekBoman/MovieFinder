import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
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
  const ref = useRef<TextInput>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const navigation = useNavigation<HomeNavigationProp>();
  const [queryText, setQueryText] = useState('');

  const debounceCallback = () => {
    if (currentPage !== 1) setCurrentPage(1);
  };
  const debouncedQueryText = useDebounce<string>(queryText, debounceCallback);

  const { data, refetch, isFetching } = useGetMoviesQuery(
    {
      queryText: debouncedQueryText,
      page: currentPage,
    },
    {
      skip: !debouncedQueryText,
      selectFromResult: ({ data, ...otherParams }) => ({
        data: moviesSelector.selectAll(data ?? moviesAdapter.getInitialState()),
        ...otherParams,
      }),
    }
  );

  useEffect(() => {
    if (selectedMovie) {
      setSelectedMovie(null);
      navigation.navigate('MovieDetails', {
        movieId: selectedMovie.id,
        queryText,
        page: currentPage,
      });
    }
  }, [selectedMovie]);

  const handleOnPressListItem = (item: Movie) => {
    setSelectedMovie(item);
  };

  const handleOnEndReached = (shouldInvokeEndReached: boolean) => {
    if (shouldInvokeEndReached) setCurrentPage((prev) => prev + 1);
  };

  const handleOnRefresh = (shouldRefresh: boolean) => {
    if (!shouldRefresh) return;
    refetch();
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
        alwaysBounceVertical={false}
        onRefresh={handleOnRefresh.bind(this, !!debouncedQueryText && !!data.length)}
        refreshing={isFetching}
        contentContainerStyle={styles.list}
        listItemStyle={styles.listItem}
        data={queryText ? data : []}
        onPressListItem={handleOnPressListItem}
        onEndReached={handleOnEndReached.bind(this, !!debouncedQueryText && !!data.length)}
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
  list: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  listItem: {
    marginBottom: 16,
    marginHorizontal: 16,
  },
  searchbar: {
    backgroundColor: Colors.primary,
  },
});
