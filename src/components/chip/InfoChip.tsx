import { ColorValue, StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import { Chip } from 'react-native-paper';
import { Colors } from '../../theme/colors';
import { IconSource } from 'react-native-paÓer/lib/typescript/src/components/Icon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  label: string;
  value: string;
  style?: StyleProp<ViewStyle>;
  icon?: IconSource;
  iconColor?: ColorValue;
  iconSize?: number;
}

const InfoChip = ({
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
      style={[{ borderColor: Colors.primary, backgroundColor: Colors.background }, style]}
    >
      {chipText}
    </Chip>
  );
};

export default InfoChip;
