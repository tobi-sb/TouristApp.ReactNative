// NavBar.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { colors } from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import SearchBar from '../basic/SearchBar';

type NavBarProps = {
 title: string;
 leftComponent?: React.ReactNode;
 rightComponent?: React.ReactNode;
 onBackPress?: () => void;
 translateY: Animated.Value;
};

export const NavBar = ({ 
 title, 
 leftComponent,
 rightComponent,
 onBackPress,
 translateY 
}: NavBarProps) => {
 return (
   <Animated.View style={[
     styles.safeArea,
     {
       transform: [{ translateY }]
     }
   ]}>
     <View style={styles.main}>
       <View style={styles.leftContainer}>
         <Text style={styles.text}>Explore</Text>
         <Text style={styles.title}>Hérault</Text>
       </View>

       <View style={styles.rightContainer}>
         <TouchableOpacity style={styles.right}>
           <Ionicons name="location-outline" size={22} color={colors.primary} />
           <Text style={styles.lightText}>Béziers, FR</Text>
           <Ionicons name="chevron-down-outline" size={20} color={colors.primary} />
         </TouchableOpacity>
       </View>
     </View>
     <View style={styles.searchContainer}>
       <SearchBar />
     </View>
   </Animated.View>
 );
};

const styles = StyleSheet.create({
 safeArea: {
   backgroundColor: "white",
   position: 'absolute',
   top: 0,
   width: '100%',
   zIndex: 1,
   paddingTop: 35,
   padding: 0,
   borderRadius: 16,
 },
 searchContainer: {
   marginBottom: 16,
 },
 main: {
   flexDirection: 'row',
   justifyContent: 'space-between',
   alignItems: 'center',
   paddingTop: 16,
   paddingHorizontal: 16,
   paddingBottom: 8,
 },
 leftContainer: {
   justifyContent: 'center',
 },
 rightContainer: {
   alignItems: 'flex-end',
   justifyContent: 'center',
 },
 right: {
   flexDirection: 'row',
   alignItems: 'center',
 },
 text: {
   fontSize: 14,
   fontWeight: '400',
   color: colors.text,
 },
 title: {
   fontSize: 28,
   fontWeight: '500',
   color: colors.text,
 },
 lightText: {
   fontSize: 16,
   fontWeight: '300',
   color: colors.text,
   marginHorizontal: 8,
 },
});