import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Searchbar, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageInfo from '../components/info/ImageInfo';
import MoviesList from '../components/movies/MoviesList';
import { SEARCHBAR_TEXT_MAX_LENGTH } from '../constants/constants';
import { useDebounce } from '../hooks/useDebounce';
import { Images } from '../img';
import { RootStackParamList } from '../navigation';
import { moviesAdapter, moviesSelector, useGetMoviesQuery } from '../store/apis/moviesApi';
import { Colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { Movie } from '../types/Movie';

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const ListEmptyComponent = () => {
  return (
    <View style={styles.emptyStateContainer}>
      <ImageInfo
        source={Images.imagePlaceholder}
        title="To find a video, enter any phrase in the field above. If no matches are found, enter another phrase."
      />
    </View>
  );
};

const Home = () => {
  const [results, setResults] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const navigation = useNavigation<HomeNavigationProp>();
  const [queryText, setQueryText] = useState('');

  const debounceCallback = () => {
    if (currentPage !== 1) setCurrentPage(1);
  };
  const debouncedQueryText = useDebounce<string>(queryText, debounceCallback);

  const { data, refetch, isFetching, isSuccess, isError } = useGetMoviesQuery(
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

  useEffect(() => {
    if (!debouncedQueryText && !!results.length) {
      setResults([]);
    }
  }, [debouncedQueryText]);

  useEffect(() => {
    if (isSuccess && !isFetching) {
      setResults(data);
    }
  }, [data, isSuccess, isFetching]);

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

  const handleOnClearIconPress = () => setResults([]);

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle} variant="displayMedium">
          Movie finder
        </Text>
        <Searchbar
          onClearIconPress={handleOnClearIconPress}
          style={styles.searchbar}
          placeholder="Find your movie"
          value={queryText}
          onChangeText={setQueryText}
          maxLength={SEARCHBAR_TEXT_MAX_LENGTH}
        />
      </View>
      <MoviesList
        ListEmptyComponent={ListEmptyComponent}
        alwaysBounceVertical={false}
        onRefresh={handleOnRefresh.bind(this, !!debouncedQueryText && !!data.length)}
        refreshing={isFetching}
        contentContainerStyle={styles.list}
        listItemStyle={styles.listItem}
        data={results}
        onPressListItem={handleOnPressListItem}
        onEndReachedThreshold={0.5}
        onEndReached={handleOnEndReached.bind(this, !!queryText && !!data.length)}
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
  emptyStateContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginBottom: spacing[5],
    padding: spacing[3],
  },
  header: {
    padding: spacing[3],
  },
  headerTitle: {
    marginBottom: spacing[2],
  },
  list: {
    flexGrow: 1,
    paddingBottom: spacing[3],
  },
  listItem: {
    marginBottom: spacing[3],
    marginHorizontal: spacing[3],
  },
  searchbar: {
    backgroundColor: Colors.primary,
  },
});
