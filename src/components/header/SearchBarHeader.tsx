import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import React from 'react';
import { VariantProp } from 'react-native-paper/lib/typescript/src/components/Typography/types';
import { Searchbar, Text } from 'react-native-paper';
import { spacing } from '../../theme/spacing';
import { SEARCH_BAR_TEXT_MAX_LENGTH } from '../../constants/constants';
import { Colors } from '../../theme/colors';

interface Props {
  titleTestID?: string;
  searchBarTestID?: string;
  headerTitle: string;
  searchBarValue: string;
  onChangeSearchBarValue: (value: string) => void;
  onClearIconPress?: () => void;
  headerTitleTextVariant?: VariantProp<Text>;
  searchBarPlaceholder?: string;
  style?: StyleProp<ViewStyle>;
  searchBarStyle?: StyleProp<TextStyle>;
  maxLength?: number;
}

const SearchBarHeader = ({
  titleTestID,
  searchBarTestID,
  headerTitle,
  searchBarValue,
  onChangeSearchBarValue,
  onClearIconPress,
  headerTitleTextVariant = 'displayMedium',
  searchBarPlaceholder,
  style,
  searchBarStyle,
  maxLength = SEARCH_BAR_TEXT_MAX_LENGTH,
}: Props) => {
  return (
    <View style={style}>
      <Text testID={titleTestID} style={styles.headerTitle} variant={headerTitleTextVariant}>
        {headerTitle}
      </Text>
      <Searchbar
        testID={searchBarTestID}
        onClearIconPress={onClearIconPress}
        style={[styles.searchbar, searchBarStyle]}
        placeholder={searchBarPlaceholder}
        value={searchBarValue}
        onChangeText={onChangeSearchBarValue}
        maxLength={maxLength}
        iconColor={Colors.primaryText}
      />
    </View>
  );
};

export default SearchBarHeader;

const styles = StyleSheet.create({
  headerTitle: {
    marginBottom: spacing[2],
  },
  searchbar: {
    backgroundColor: Colors.primary,
    color: Colors.primaryText,
  },
});
