import { Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { RootStackParamList } from '../navigation';
import {
  moviesAdapter,
  moviesSelector,
  useGetMovieQuery,
  useGetMoviesQuery,
} from '../store/apis/moviesApi';
import { getMoviePoster } from '../utils/imageUtils';
import { Button, Divider, Text } from 'react-native-paper';
import { Colors } from '../theme/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import InfoChip from '../components/info/InfoChip';
import { getJoinedDataNames } from '../utils/movieDetailsUtils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { spacing } from '../theme/spacing';
import LinearGradient from 'react-native-linear-gradient';
import InfoWithImage from '../components/info/InfoWithImage';
import { Images } from '../img';

type MovieDetailsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MovieDetails'>;
type MovieDetailsRouteProp = RouteProp<RootStackParamList, 'MovieDetails'>;

interface EmptyStateComponentProps {
  onPressBack: () => void;
}

const EmptyStateComponent = ({ onPressBack }: EmptyStateComponentProps) => (
  <View style={styles.emptyStateContainer}>
    <InfoWithImage
      titleTestID="movie-details-empty-state-title"
      imageTestID="movie-details-empty-state-image"
      source={Images.sadFace}
      title="An error occurred while loading movie data"
    />
    <Button
      testID="movie-details-empty-state-button"
      style={styles.emptyStateButton}
      buttonColor={Colors.primary}
      mode="contained"
      onPress={onPressBack}
    >
      <Text variant="titleMedium">Back to main screen</Text>
    </Button>
  </View>
);

const { width } = Dimensions.get('screen');

const POSTER_WIDTH = width * 0.6;
const POSTER_HEIGHT = POSTER_WIDTH * 1.5;

const MovieDetails = () => {
  const route = useRoute<MovieDetailsRouteProp>();
  const navigation = useNavigation<MovieDetailsNavigationProp>();
  const { movieId, queryText, page } = route.params;

  const { movie } = useGetMoviesQuery(
    { queryText, page },
    {
      selectFromResult: ({ data }) => ({
        movie: moviesSelector.selectById(data ?? moviesAdapter.getInitialState(), movieId),
      }),
    }
  );

  const { data: movieDetails } = useGetMovieQuery(movieId);

  const insets = useSafeAreaInsets();

  if (!movie) return <EmptyStateComponent onPressBack={navigation.goBack} />;

  const moviePosterImage = getMoviePoster(movie.poster_path);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.primary, Colors.background]}
        style={[
          styles.imageView,
          {
            paddingTop: spacing[3] + insets.top,
          },
        ]}
      >
        <Image
          testID="movie-details-image"
          style={[styles.image, { width: POSTER_WIDTH, height: POSTER_HEIGHT }]}
          resizeMode={moviePosterImage.resizeMode}
          source={moviePosterImage.source}
        />
      </LinearGradient>
      <View>
        <View style={styles.titleHeader}>
          <TouchableOpacity testID="movie-details-back-button" onPress={navigation.goBack}>
            <Icon name="arrow-left" size={24} />
          </TouchableOpacity>
          <Text testID="movie-details-title" style={styles.title} variant="titleLarge">
            {movie.title}
          </Text>
        </View>
        <Divider />
      </View>
      <View style={styles.infoChipsContainer}>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          <InfoChip
            testID="info-chip-vote-count"
            icon="star"
            style={[styles.firstInfoChip, styles.infoChip]}
            label="Votes"
            value={movie.vote_count.toString()}
          />
          <InfoChip
            testID="info-chip-popularity"
            icon="chart-bar"
            style={styles.infoChip}
            label="Popularity"
            value={movie.popularity.toString()}
          />
          {movieDetails ? (
            <>
              <InfoChip
                testID="info-chip-runtime"
                style={styles.infoChip}
                label="Runtime"
                value={`${movieDetails.runtime} min`}
              />
              <InfoChip
                testID="info-chip-genres"
                style={styles.infoChip}
                label="Genres"
                value={getJoinedDataNames(movieDetails.genres)}
              />
              <InfoChip
                testID="info-chip-made-in"
                style={styles.lastInfoChip}
                label="Made in"
                value={getJoinedDataNames(movieDetails.production_countries)}
              />
            </>
          ) : null}
        </ScrollView>
      </View>

      <ScrollView alwaysBounceVertical={false} contentContainerStyle={[styles.overviewContainer]}>
        <View>
          <Text
            testID="movie-details-overview"
            style={{ marginBottom: spacing[4] + insets.bottom }}
          >
            {movie.overview}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.background, flex: 1 },
  emptyStateButton: {
    marginTop: spacing[3],
  },
  emptyStateContainer: {
    alignItems: 'center',
    backgroundColor: Colors.background,
    flex: 1,
    justifyContent: 'center',
  },
  firstInfoChip: {
    marginLeft: spacing[3],
  },
  image: {
    backgroundColor: Colors.background,
    borderRadius: 16,
  },
  imageView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoChip: {
    marginRight: spacing[2],
  },
  infoChipsContainer: {
    marginTop: spacing[3],
  },

  lastInfoChip: {
    marginRight: spacing[3],
  },
  overviewContainer: {
    marginTop: spacing[3],
    paddingHorizontal: spacing[3],
  },
  title: { flexShrink: 1, marginLeft: spacing[2] },
  titleHeader: { alignItems: 'center', flexDirection: 'row', padding: spacing[3] },
});
