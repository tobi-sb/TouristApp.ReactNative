// App.tsx
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Animated  } from 'react-native';
import { HomeScreen } from './components/screen/HomeScreen';
import { NavBar } from './components/navigation/NavBar';
import { ProfileScreen } from './components/screen/ProfileScreen';
import React, { useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors } from './theme/colors';
import { MapScreen } from './components/screen/MapScreen';

const FavoritesScreen = () => <View style={{ flex: 1, backgroundColor: 'white' }} />;
const Tab = createBottomTabNavigator();

export default function App() {
  const navBarAnim: Animated.Value = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <NavBar title={''} translateY={navBarAnim} />
        <StatusBar style="auto" />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: keyof typeof Ionicons.glyphMap;

              switch (route.name) {
                case 'Home':
                  iconName = 'home';
                  break;
                case 'Map':
                  iconName = 'navigate-circle-outline';
                  break;
                case 'Favorites':
                  iconName = 'heart';
                  break;
                case 'Profile':
                  iconName = 'person';
                  break;
                default:
                  iconName = 'home';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.gray,
            tabBarStyle: {
              height: 70,
              paddingBottom: 18,
              borderTopWidth: 1,
              borderTopColor: '#EEEEEE',
              position: 'absolute',
              zIndex: 0,
              elevation: 0,
            },
            tabBarShowLabel: false,
          })}
        >
          <Tab.Screen 
            name="Home"
            children={() => <HomeScreen navBarAnim={navBarAnim} />}
          />
          <Tab.Screen 
            name="Map"
            children={() => <MapScreen navBarAnim={navBarAnim} />}
          />
          <Tab.Screen name="Favorites" component={FavoritesScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});