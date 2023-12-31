import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBarHeader from '../components/header/SearchBarHeader';
import InfoWithImage from '../components/info/InfoWithImage';
import MoviesList from '../components/movies/MoviesList';
import { useDebounce } from '../hooks/useDebounce';
import { Images } from '../img';
import { RootStackParamList } from '../navigation';
import { moviesAdapter, moviesSelector, useGetMoviesQuery } from '../store/apis/moviesApi';
import { Colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { Movie } from '../types/Movie';
import { animate } from '../utils/animationUtils';

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const ListEmptyComponent = () => {
  return (
    <View style={styles.emptyStateContainer}>
      <InfoWithImage
        imageTestID="movies-list-empty-state-image"
        titleTestID="movies-list-empty-state-title"
        source={Images.imagePlaceholder}
        title="To find a video, enter any phrase in the field above. If no matches are found, enter another phrase."
      />
    </View>
  );
};

const Home = () => {
  const moviesListRef = useRef<FlatList>(null);
  const [results, setResults] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const navigation = useNavigation<HomeNavigationProp>();
  const [queryText, setQueryText] = useState('');

  const clearResultsWithAnimation = () => {
    animate();
    setResults([]);
  };

  const debounceCallback = () => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  };
  const debouncedQueryText = useDebounce<string>(queryText, debounceCallback);

  const scrollToTop = () => {
    moviesListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const { data, refetch, isFetching, isSuccess } = useGetMoviesQuery(
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
      clearResultsWithAnimation();
    }
  }, [debouncedQueryText]);

  useEffect(() => {
    if (isSuccess && !isFetching) {
      animate();
      setResults(data);
      if (currentPage === 1 && results.length) scrollToTop();
    }
  }, [data, isSuccess, isFetching]);

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
      <SearchBarHeader
        titleTestID="search-bar-header-title"
        searchBarTestID="search-bar"
        headerTitle="Movie finder"
        searchBarValue={queryText}
        onChangeSearchBarValue={setQueryText}
        onClearIconPress={clearResultsWithAnimation}
        searchBarPlaceholder="Enter the movie title"
        style={styles.header}
      />
      <MoviesList
        ref={moviesListRef}
        testID="movies-list"
        ListEmptyComponent={ListEmptyComponent}
        alwaysBounceVertical={false}
        onRefresh={handleOnRefresh.bind(this, !!debouncedQueryText)}
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
  list: {
    flexGrow: 1,
    paddingBottom: spacing[3],
  },
  listItem: {
    marginBottom: spacing[3],
    marginHorizontal: spacing[3],
  },
});
