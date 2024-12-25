import React, { useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { NavBar } from '../navigation/NavBar';
import { HomeScreen } from './HomeScreen';
import { colors } from '../../theme/colors';

export const HomeWrapper = () => {
  const navBarAnim = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <HomeScreen navBarAnim={navBarAnim} />
      
      {/* NavBar en overlay */}
      <NavBar
        title="Explore"
        translateY={navBarAnim}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightBackground,
  },
});