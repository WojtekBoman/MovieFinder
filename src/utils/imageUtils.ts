import { ImageResizeMode, ImageSourcePropType } from 'react-native/types';
import { Images } from '../img';

export const getMoviePoster = (
  posterPath: string
): { source: ImageSourcePropType; resizeMode: ImageResizeMode } => {
  if (!posterPath)
    return {
      source: Images.imagePlaceholder,
      resizeMode: 'center',
    };

  return {
    source: { uri: `https://image.tmdb.org/t/p/original/${posterPath}` },
    resizeMode: 'stretch',
  };
};
