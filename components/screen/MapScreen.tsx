// MapScreen.tsx
import React, { useRef, useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Dimensions, 
  Animated,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import MapView, { Marker, Polygon as MapPolygon } from 'react-native-maps';
import { alls } from "../../assets/data/all";
import { PlaceDetailsSheet } from '../../components/navigation/PlaceDetailsSheet';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const { height } = Dimensions.get('window');

// Coordonnées approximatives de la frontière de l'Hérault
const heraultBoundary = [
  { latitude: 43.977, longitude: 3.116 },
  { latitude: 43.977, longitude: 3.590 },
  { latitude: 43.858, longitude: 3.911 },
  { latitude: 43.721, longitude: 4.047 },
  { latitude: 43.452, longitude: 4.140 },
  { latitude: 43.278, longitude: 3.838 },
  { latitude: 43.183, longitude: 3.238 },
  { latitude: 43.288, longitude: 2.991 },
  { latitude: 43.422, longitude: 2.860 },
  { latitude: 43.600, longitude: 2.860 },
  { latitude: 43.788, longitude: 2.991 },
  { latitude: 43.977, longitude: 3.116 },
];

// Un grand rectangle qui couvre toute la zone visible
const worldBoundary = [
  { latitude: 41.0, longitude: 1.0 },  // Sud-Ouest
  { latitude: 41.0, longitude: 5.0 },  // Sud-Est
  { latitude: 45.0, longitude: 5.0 },  // Nord-Est
  { latitude: 45.0, longitude: 1.0 },  // Nord-Ouest
  { latitude: 41.0, longitude: 1.0 },  // Fermeture du polygone
];

// Interface correspondant à la structure exacte de vos données
interface Place {
  id: string;
  name: string;
  rating: number;
  image: any;
  distance: string;
  latitude: number;
  longitude: number;
  categories?: string;
  estimate_price_per_personne: string;
  title?: string;
}

type MapScreenProps = {
  navBarAnim?: Animated.Value;
};

export const MapScreen: React.FC<MapScreenProps> = ({ navBarAnim }) => {
  const mapRef = useRef<MapView | null>(null);
  const slideAnim = useRef(new Animated.Value(height)).current;
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const defaultNavBarAnim = useRef(new Animated.Value(0)).current;
  const activeNavBarAnim = navBarAnim || defaultNavBarAnim;
  const [mapReady, setMapReady] = useState(false);

  // Définition des images de marqueurs
  const markerImages = {
    restaurant: require('../../assets/images/markers/restaurant.png'),
    asiatique: require('../../assets/images/markers/asiatique.png'),
    fastfood: require('../../assets/images/markers/fast-food.png'),
    pizza: require('../../assets/images/markers/pizza.png'),

    diving: require('../../assets/images/markers/diving.png'),
    parachute: require('../../assets/images/markers/parachute.png'),
    jetski: require('../../assets/images/markers/jetski.png'),

    shoppingW: require('../../assets/images/markers/shopping-women.png'),
    shoppingM: require('../../assets/images/markers/shopping-men.png'),
    shopping: require('../../assets/images/markers/shopping.png'),
    view: require('../../assets/images/markers/view.png'),
    beach: require('../../assets/images/markers/default.png'),
    museum: require('../../assets/images/markers/museum.png'),
    default: require('../../assets/images/markers/default.png'),

  };

  const getMarkerImage = (categories?: string) => {
    switch (categories) {
      case 'restaurant':
        return markerImages.restaurant;
      case 'asiatique':
        return markerImages.asiatique;
      case 'fastfood':
        return markerImages.fastfood;
      case 'pizza':
        return markerImages.pizza;
      case 'diving':
        return markerImages.diving;
      case 'parachute':
        return markerImages.parachute;
      case 'jetski':
        return markerImages.jetski;
      case 'shoppingW':
        return markerImages.shoppingW;
      case 'shoppingM':
        return markerImages.shoppingM;
      case 'shopping':
        return markerImages.shopping;
      case 'view':
        return markerImages.view;
      case 'beach':
        return markerImages.beach;
      case 'museum':
        return markerImages.museum;
      default:
        return markerImages.default;
    }
  };

  const handleMarkerPress = (place: Place) => {
    setSelectedPlace(place);

    if (place.latitude && place.longitude) {
      mapRef.current?.animateToRegion({
        latitude: place.latitude,
        longitude: place.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 1000);
    }

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

  const closePanel = () => {
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
    <View style={styles.container}>
      <MapView 
        ref={mapRef}
        style={styles.map}
        onMapReady={() => setMapReady(true)}
        initialRegion={{
          latitude: 43.3000,
          longitude: 3.2500,
          latitudeDelta: 0.2000,
          longitudeDelta: 0.3000,
        }}
      >
        {/* Overlay avec "trou" pour l'Hérault */}
        <MapPolygon
          coordinates={worldBoundary}
          holes={[heraultBoundary]}
          fillColor="rgba(200, 200, 200, 0.5)"
          strokeColor="transparent"
        />
        
        {/* Bordure de l'Hérault */}
        <MapPolygon
          coordinates={heraultBoundary}
          strokeColor="#2E86DE"
          strokeWidth={3}
          fillColor="transparent"
        />
        
        {/* Les marqueurs existants */}
        {mapReady && alls.map((place, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: place.latitude,
              longitude: place.longitude
            }}
            onPress={() => handleMarkerPress(place)}
            tracksViewChanges={false}
          >
            <View style={styles.markerContainer}>
              <Image 
                source={getMarkerImage(place.categories)}
                style={styles.markerImage}
                resizeMode="contain"
              />
              <View style={styles.markerLabel}>
                <Text style={styles.markerText}>{place.name}</Text>
              </View>
            </View>
          </Marker>
        ))}
      </MapView>
      <View style={styles.buttonDiv}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={{color:'white', fontSize:16,}}>Filter</Text>
        </TouchableOpacity>
      </View>

      <PlaceDetailsSheet 
          selectedPlace={selectedPlace}
          slideAnim={slideAnim}
          onClose={closePanel}
          isMapScreen={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    alignItems: 'center',
  },
  markerImage: {
    width: 40,
    height: 40,
  },
  markerLabel: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  markerText: {
    fontSize: 12,
    color: 'black',
  },
  filterButton:{
    backgroundColor: Colors.primary,
    width:"80%",
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 5,
  },
  buttonDiv:{
    width: '100%',
    bottom: 80, 
    alignItems: 'center',
  }
});