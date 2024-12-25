import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { Ionicons } from '@expo/vector-icons';


const SearchBar = () => {
  return (
    <View style={styles.searchBar}>
        <Ionicons name="search" size={22} color={colors.primary} />
        <TextInput placeholder="Search" style={styles.searchText} />
    </View>
  )
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.lightBackground,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 16,
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.lightText,
  },
  searchText: {
    ...typography.body,
    color: colors.gray,
    marginLeft: 10,
    flex: 1,
  },
});

export default SearchBar