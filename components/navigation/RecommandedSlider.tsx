import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import { recommandeds } from '../../assets/data/recommanded';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { Ionicons } from '@expo/vector-icons';


const RecommandedSlider = () => {
  return (
    <View>
      {/* Section header remains the same */}
      <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommanded</Text>
          </View>

          {/* Here's the fixed horizontal scroll section */}
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.restaurantsContainer}
          >
            {recommandeds.map((recommanded) => (
              <TouchableOpacity key={recommanded.id} style={styles.restaurantCard}>
                <Image 
                  source={recommanded.image}
                  style={styles.restaurantImage}
                  resizeMode="cover"
                />
                <Text style={styles.restaurantName}>{recommanded.name}</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text style={styles.rating}>{recommanded.rating}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
    paddingRight: 16, // Adds padding at the end of scroll
  },
  restaurantCard: {
    width: 160,
    marginRight: 12,
    borderRadius: 12,
    backgroundColor: colors.white,
    overflow: 'hidden',
  },
  restaurantImage: {
    width: '100%',
    height: 120,
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

export default RecommandedSlider