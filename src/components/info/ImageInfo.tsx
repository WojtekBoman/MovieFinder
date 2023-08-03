import {
  Dimensions,
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { Text } from 'react-native-paper';
import { spacing } from '../../theme/spacing';

interface Props {
  source: ImageSourcePropType;
  title: string;
  style?: StyleProp<ViewStyle>;
}

const { width } = Dimensions.get('screen');

const ImageInfo = ({ source, title, style }: Props) => {
  return (
    <View style={[styles.container, style]}>
      <Image source={source} style={styles.image} />
      <Text style={styles.text} variant="titleMedium">
        {title}
      </Text>
    </View>
  );
};

export default ImageInfo;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: width / 3,
    marginBottom: spacing[3],
    width: width / 3,
  },
  text: {
    textAlign: 'center',
  },
});
