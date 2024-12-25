import { View, StyleSheet, ScrollView, Animated, Dimensions } from 'react-native';
import { colors } from '../../theme/colors';
import React, { useRef, useState } from 'react';
import PopularSlider from '../navigation/PopularSlider';
import SensationSlider from '../navigation/SensationSlider';
import RecommandedSlider from '../navigation/RecommandedSlider';
import RestaurantSlider from '../navigation/RestaurantSlider';
import { PlaceDetailsSheet } from '../navigation/PlaceDetailsSheet';
import { populars } from '../../assets/data/popular';

const { height } = Dimensions.get('window');

type HomeScreenProps = {
  navBarAnim: Animated.Value;
};

export const HomeScreen: React.FC<HomeScreenProps> = ({ navBarAnim }) => {
  const [selectedPlace, setSelectedPlace] = useState<typeof populars[0] | null>(null);
  const slideAnim = useRef(new Animated.Value(height)).current;

  const handlePlaceSelect = (place: typeof populars[0]) => {
    setSelectedPlace(place);
    
    Animated.parallel([
      Animated.spring(navBarAnim, {
        toValue: -200,
        useNativeDriver: true,
        friction: 8,
        tension: 40,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        friction: 8,
        tension: 40,
      })
    ]).start();
  };

  const handleClose = () => {
    Animated.parallel([
      Animated.spring(navBarAnim, {
        toValue: 0,
        useNativeDriver: true,
        friction: 8,
        tension: 40,
      }),
      Animated.spring(slideAnim, {
        toValue: height,
        useNativeDriver: true,
      })
    ]).start(() => setSelectedPlace(null));
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.content}>
          <PopularSlider 
            navBarAnim={navBarAnim} 
            onPlaceSelect={handlePlaceSelect}
          />
          <RecommandedSlider />
          <SensationSlider />
          <RestaurantSlider />
        </View>
      </ScrollView>

      <PlaceDetailsSheet 
          selectedPlace={selectedPlace}
          slideAnim={slideAnim}
          onClose={handleClose}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightBackground,
  },
  scrollContainer: {
    flex: 1,
    paddingTop: 140,
  },
  content: {
    padding: 16,
    paddingBottom: 80,
  },
});