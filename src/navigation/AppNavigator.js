import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: '#0A0A0A' }, // Ultra deep dark mode
        headerTintColor: '#E0E0E0', // Sleek off-white for text
        headerTitleStyle: { fontWeight: '600', fontSize: 18, letterSpacing: 1 },
        contentStyle: { backgroundColor: '#000000' }, // Pure black professional background
        headerShadowVisible: false,
        animation: 'fade' // Elegant fade transition for a serious tone
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'PORTFOLIO OVERVIEW' }} 
      />
      <Stack.Screen 
        name="Details" 
        component={DetailsScreen} 
        options={({ route }) => ({ 
            title: route.params?.metal?.symbol || 'ASSET DETAILS',
        })} 
      />
    </Stack.Navigator>
  );
}
