import { Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { RootStackParamList } from '../navigation';
import {
  moviesAdapter,
  moviesSelector,
  useGetMovieQuery,
  useGetMoviesQuery,
} from '../store/apis/moviesApi';
import { getMoviePoster } from '../utils/imageUtils';
import { ActivityIndicator, Divider, Text } from 'react-native-paper';
import { Colors } from '../theme/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import InfoChip from '../components/chip/InfoChip';
import { getJoinedDataNames } from '../utils/movieDetailsUtils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useToast } from 'react-native-toast-notifications';

type MovieDetailsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MovieDetails'>;
type MovieDetailsRouteProp = RouteProp<RootStackParamList, 'MovieDetails'>;

const { width, height } = Dimensions.get('screen');

const MovieDetails = () => {
  const route = useRoute<MovieDetailsRouteProp>();
  const navigation = useNavigation<MovieDetailsNavigationProp>();
  const toast = useToast();
  const { movieId, queryText, page } = route.params;

  const { movie } = useGetMoviesQuery(
    { queryText, page },
    {
      selectFromResult: ({ data }) => ({
        movie: moviesSelector.selectById(data ?? moviesAdapter.getInitialState(), movieId),
      }),
    }
  );

  const { data: movieDetails, isFetching, isError } = useGetMovieQuery(movieId);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (isError) {
      toast.show("Problem with downloading the movie's details");
    }
  }, [isError]);

  if (!movie)
    return <View style={styles.emptyStateContainer}>{isFetching && <ActivityIndicator />}</View>;

  const moviePosterImage = getMoviePoster(movie.poster_path);

  return (
    <View style={styles.container}>
      <Image
        style={{ width, height: height * 0.6 }}
        resizeMode={moviePosterImage.resizeMode}
        source={moviePosterImage.source}
      />
      <View>
        <View style={styles.titleHeader}>
          <TouchableOpacity onPress={navigation.goBack}>
            <Icon name="arrow-left" size={24} />
          </TouchableOpacity>
          <Text style={styles.title} variant="titleLarge">
            {movie.title}
          </Text>
        </View>
        <Divider />
      </View>
      <View style={styles.infoChipsContainer}>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          <InfoChip
            icon="star"
            style={[styles.firstInfoChip, styles.infoChip]}
            label="Votes"
            value={movie.vote_count.toString()}
          />
          <InfoChip
            icon="chart-bar"
            style={styles.infoChip}
            label="Popularity"
            value={movie.popularity.toString()}
          />
          {movieDetails && (
            <>
              <InfoChip
                style={styles.infoChip}
                label="Runtime"
                value={`${movieDetails.runtime} min`}
              />
              <InfoChip
                style={styles.infoChip}
                label="Genres"
                value={getJoinedDataNames(movieDetails.genres)}
              />
              <InfoChip
                style={styles.lastInfoChip}
                label="Made in"
                value={getJoinedDataNames(movieDetails.production_countries)}
              />
            </>
          )}
        </ScrollView>
      </View>

      <ScrollView alwaysBounceVertical={false} contentContainerStyle={[styles.overviewContainer]}>
        <View>
          <Text style={{ marginBottom: 32 + insets.bottom }}>{movie.overview}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.background, flex: 1 },
  emptyStateContainer: {},
  firstInfoChip: {
    marginLeft: 16,
  },
  infoChip: {
    marginRight: 8,
  },
  infoChipsContainer: {
    marginTop: 16,
  },

  lastInfoChip: {
    marginRight: 16,
  },
  overviewContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  title: { flexShrink: 1, marginLeft: 8 },
  titleHeader: { alignItems: 'center', flexDirection: 'row', padding: 16 },
});
