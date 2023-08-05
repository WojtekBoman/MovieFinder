import { ColorValue, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import React from 'react';
import { Chip, Text } from 'react-native-paper';
import { Colors } from '../../theme/colors';
import { IconSource } from 'react-native-paper/lib/typescript/src/components/Icon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  testID: string;
  label: string;
  value: string;
  style?: StyleProp<ViewStyle>;
  icon?: IconSource;
  iconColor?: ColorValue;
  iconSize?: number;
}

const InfoChip = ({
  testID,
  label,
  value,
  style,
  icon,
  iconSize = 18,
  iconColor = Colors.primary,
}: Props) => {
  const chipText = `${label}: ${value || 'Unknown'}`;

  return (
    <Chip
      icon={() => <Icon name={icon} size={iconSize} color={iconColor} />}
      mode="outlined"
      style={[styles.chip, style]}
    >
      <Text testID={testID}>{chipText}</Text>
    </Chip>
  );
};

export default InfoChip;

const styles = StyleSheet.create({
  chip: {
    backgroundColor: Colors.background,
    borderColor: Colors.primary,
  },
});
