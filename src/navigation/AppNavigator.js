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
        headerStyle: { backgroundColor: '#1A1A1A' },
        headerTintColor: '#E0E0E0',
        headerTitleStyle: { fontWeight: '600', fontSize: 20 },
        contentStyle: { backgroundColor: '#121212' }, // Dark mode base
        animation: 'slide_from_right'
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Live Metals', headerLargeTitle: true }} 
      />
      <Stack.Screen 
        name="Details" 
        component={DetailsScreen} 
        options={({ route }) => ({ 
            title: route.params?.metal?.name || 'Details',
        })} 
      />
    </Stack.Navigator>
  );
}
