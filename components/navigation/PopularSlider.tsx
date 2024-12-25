import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Animated, Dimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import { populars } from '../../assets/data/popular';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { Ionicons } from '@expo/vector-icons';
import { PlaceDetailsSheet } from './PlaceDetailsSheet';

const { height, width } = Dimensions.get('window');

type PopularSliderProps = {
  navBarAnim?: Animated.Value;
  onPlaceSelect?: (place: typeof populars[0]) => void;
};

const PopularSlider: React.FC<PopularSliderProps> = ({ navBarAnim }) => {
  const [selectedPlace, setSelectedPlace] = useState<typeof populars[0] | null>(null);
  const slideAnim = useRef(new Animated.Value(height)).current;
  const defaultNavBarAnim = useRef(new Animated.Value(0)).current;
  const activeNavBarAnim = navBarAnim || defaultNavBarAnim;

  const handlePlacePress = (place: typeof populars[0]) => {
    setSelectedPlace(place);
    
    Animated.parallel([
      Animated.spring(activeNavBarAnim, {
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
      Animated.spring(activeNavBarAnim, {
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
    <>
      <View>
        {/* Section header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        {/* Horizontal scroll section */}
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.restaurantsContainer}
        >
          {populars.map((popularInfo) => (
            <TouchableOpacity 
              key={popularInfo.id} 
              style={styles.restaurantCard}
              onPress={() => handlePlacePress(popularInfo)}
            >
              <Image 
                source={popularInfo.image}
                style={styles.restaurantImage}
                resizeMode="cover"
              />
              <Text style={styles.restaurantName}>{popularInfo.name}</Text>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.rating}>{popularInfo.rating}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Place Details Sheet */}
      <View style={styles.sheetContainer}>
        <PlaceDetailsSheet 
          selectedPlace={selectedPlace}
          slideAnim={slideAnim}
          onClose={handleClose}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  sheetContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: width,
    height: height,
    pointerEvents: 'box-none',
    zIndex: 999999,  // Ajoute cette ligne
    elevation: 999999,  // Pour Android
},
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 12,
  },
  sectionTitle: {
  },
  seeAll: {
    color: colors.primary,
    ...typography.body,
  },
  restaurantsContainer: {
    paddingRight: 16,
  },
  restaurantCard: {
    width: 200,
    marginRight: 12,
    borderRadius: 12,
    backgroundColor: colors.white,
    overflow: 'hidden',
  },
  restaurantImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
  },
  restaurantName: {
    ...typography.body,
    marginTop: 8,
    marginHorizontal: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    marginTop: 4,
    marginBottom: 8,
  },
  rating: {
    color: colors.gray,
    marginLeft: 4,
  },
});

export default PopularSlider;