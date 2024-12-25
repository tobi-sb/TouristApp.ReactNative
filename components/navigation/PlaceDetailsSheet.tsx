import React from 'react';
import { 
  StyleSheet, 
  View, 
  Dimensions, 
  Text, 
  Animated, 
  Image,
  TouchableOpacity,
  PanResponder,
  Platform,
  ScrollView,
  Linking
} from 'react-native';
import { populars } from "../../assets/data/popular";

const { height, width } = Dimensions.get('window');
const TAB_BAR_HEIGHT = 70;
const DRAG_THRESHOLD = 50;

type Place = typeof populars[0] & {
  estimate_price_per_personne?: string;
};

type PlaceDetailsSheetProps = {
  selectedPlace: Place | null;
  slideAnim: Animated.Value;
  onClose: () => void;
  isMapScreen?: boolean;
};

export const PlaceDetailsSheet: React.FC<PlaceDetailsSheetProps> = ({
  selectedPlace,
  slideAnim,
  onClose,
  isMapScreen
}) => {
  const sheetHeight = isMapScreen ? height * 0.95 : height * 1.06;

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          slideAnim.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > DRAG_THRESHOLD) {
          onClose();
        } else {
          Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: true,
            friction: 8,
            tension: 40,
          }).start();
        }
      },
    })
  ).current;

  const handleOpenMaps = () => {
    if (selectedPlace) {
      const url = Platform.select({
        ios: `maps:0,0?q=${selectedPlace.latitude},${selectedPlace.longitude}`,
        android: `geo:0,0?q=${selectedPlace.latitude},${selectedPlace.longitude}`,
      });
      if (url) Linking.openURL(url);
    }
  };

  if (!selectedPlace) return null;

  return (
    <View style={styles.overlay}>
      <Animated.View 
        style={[
          styles.panel,
          {
            height: sheetHeight,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <View {...panResponder.panHandlers} style={styles.dragHandleContainer}>
          <View style={styles.dragIndicator} />
        </View>

        <ScrollView style={styles.scrollView} bounces={false}>
          <View style={styles.panelContent}>
            <View style={styles.panelHeader}>
              <View style={styles.headerTextContainer}>
                <Text style={styles.panelTitle}>{selectedPlace.name}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.rating}>{selectedPlace.rating}</Text>
                  <Text style={styles.ratingStar}>⭐</Text>
                </View>
              </View>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            {selectedPlace.image && (
              <Image 
                source={selectedPlace.image}
                style={styles.placeImage}
                resizeMode="cover"
              />
            )}
            
            <View style={styles.infoContainer}>
              <View style={styles.infoRow}>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Distance</Text>
                  <Text style={styles.infoValue}>{selectedPlace.distance}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Catégorie</Text>
                  <Text style={styles.infoValue}>{selectedPlace.categories || 'Non spécifié'}</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Avis</Text>
                  <Text style={styles.infoValue}>{`${selectedPlace.rating}/5 (486 avis)`}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Prix moyen</Text>
                  <Text style={styles.infoValue}>{selectedPlace.estimate_price_per_personne || 'Non spécifié'}</Text>
                </View>
              </View>

              {selectedPlace.cuisine && (
                <View style={styles.infoRow}>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Cuisine</Text>
                    <Text style={styles.infoValue}>{selectedPlace.cuisine}</Text>
                  </View>
                  {selectedPlace.deliveryTime && (
                    <View style={styles.infoItem}>
                      <Text style={styles.infoLabel}>Temps de livraison</Text>
                      <Text style={styles.infoValue}>{selectedPlace.deliveryTime}</Text>
                    </View>
                  )}
                </View>
              )}
            </View>

            <TouchableOpacity 
              style={styles.directionsButton}
              onPress={handleOpenMaps}
            >
              <Text style={styles.directionsButtonText}>Obtenir l'itinéraire</Text>
            </TouchableOpacity>

            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>À propos</Text>
              <Text style={styles.descriptionText}>
                 Découvrez {selectedPlace.name}, un endroit unique situé à {selectedPlace.distance} de votre position.
              </Text>
            </View>
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    ...Platform.select({
      ios: {
        zIndex: 999999,
      },
      android: {
        elevation: 999999,
      }
    }),
    pointerEvents: 'box-none',
  },
  panel: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    ...Platform.select({
      ios: {
        zIndex: 999999,
      },
      android: {
        elevation: 999999,
      }
    }),
  },
  dragHandleContainer: {
    height: 40,
    justifyContent: 'center',
  },
  dragIndicator: {
    alignSelf: 'center',
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 3,
  },
  scrollView: {
    flex: 1,
  },
  panelContent: {
    padding: 20,
  },
  panelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  headerTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  panelTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'left',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 18,
    fontWeight: '600',
    marginRight: 4,
  },
  ratingStar: {
    fontSize: 16,
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#666',
  },
  placeImage: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    marginBottom: 20,
  },
  infoContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    textAlign: 'left',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'left',
  },
  directionsButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  directionsButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  descriptionContainer: {
    marginBottom: 30,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'left',
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    textAlign: 'left',
  }
});