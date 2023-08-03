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

interface Props {
  image: ImageSourcePropType;
  title: string;
  style?: StyleProp<ViewStyle>;
}

const { width } = Dimensions.get('screen');

const ImageInfo = ({ image, title, style }: Props) => {
  return (
    <View style={[styles.container, style]}>
      <Image source={image} style={styles.image} />
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
    marginBottom: 16,
    width: width / 3,
  },
  text: {
    textAlign: 'center',
  },
});
