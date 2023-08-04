import { ColorValue, StyleSheet, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../theme/colors';
import { Text } from 'react-native-paper';
import { VariantProp } from 'react-native-paper/lib/typescript/src/components/Typography/types';
import { spacing } from '../../theme/spacing';

interface Props {
  testID?: string;
  iconName: string;
  text: string;
  color?: ColorValue;
  iconSize?: number;
  textVariant?: VariantProp<never>;
}

const TextWithIcon = ({
  testID,
  iconName,
  text,
  color = Colors.secondaryText,
  iconSize = 24,
  textVariant = 'titleMedium',
}: Props) => {
  return (
    <View style={styles.container}>
      <Icon name={iconName} size={iconSize} color={color} />
      <Text testID={testID} style={[styles.text, { color }]} variant={textVariant}>
        {text}
      </Text>
    </View>
  );
};

export default TextWithIcon;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    marginLeft: spacing[2],
  },
});
