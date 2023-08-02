import { Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { RootStackParamList } from '../navigation';
import { useGetMovieQuery } from '../store/apis/moviesApi';
import { getMoviePoster } from '../utils/imageUtils';
import { ActivityIndicator, Divider, Text } from 'react-native-paper';
import { Colors } from '../theme/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import InfoChip from '../components/chip/InfoChip';
import { getJoinedDataNames } from '../utils/movieDetailsUtils';

type MovieDetailsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MovieDetails'>;
type MovieDetailsRouteProp = RouteProp<RootStackParamList, 'MovieDetails'>;

const { width, height } = Dimensions.get('screen');

const MovieDetails = () => {
  const route = useRoute<MovieDetailsRouteProp>();
  const navigation = useNavigation<MovieDetailsNavigationProp>();

  const { data, isFetching } = useGetMovieQuery(route.params.movieId);

  if (!data)
    return <View style={styles.emptyStateContainer}>{isFetching && <ActivityIndicator />}</View>;

  const moviePosterImage = getMoviePoster(data.poster_path);

  return (
    <View style={styles.container}>
      <Image
        style={{ width, height: height / 1.6 }}
        resizeMode={moviePosterImage.resizeMode}
        source={moviePosterImage.source}
      />
      <View>
        <View style={styles.titleHeader}>
          <TouchableOpacity onPress={navigation.goBack}>
            <Icon name="arrow-left" size={24} />
          </TouchableOpacity>
          <Text style={styles.title} variant="titleLarge">
            {data?.title}
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
            value={data.vote_count.toString()}
          />
          <InfoChip
            icon="chart-bar"
            style={styles.infoChip}
            label="Popularity"
            value={data.popularity.toString()}
          />
          <InfoChip style={styles.infoChip} label="Runtime" value={`${data.runtime} min`} />
          <InfoChip
            style={styles.infoChip}
            label="Genres"
            value={getJoinedDataNames(data.genres)}
          />
          <InfoChip
            style={styles.lastInfoChip}
            label="Made in"
            value={getJoinedDataNames(data.production_countries)}
          />
        </ScrollView>
      </View>
      <ScrollView alwaysBounceVertical={false} contentContainerStyle={[styles.overviewContainer]}>
        <Text>{data?.overview}</Text>
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
    marginTop: 8,
    paddingHorizontal: 16,
  },
  title: { flexShrink: 1, marginLeft: 8 },
  titleHeader: { alignItems: 'center', flexDirection: 'row', padding: 16 },
});
