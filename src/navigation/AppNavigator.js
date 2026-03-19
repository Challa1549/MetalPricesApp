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
        headerStyle: { backgroundColor: '#FFFFFF' },
        headerTintColor: '#1E1E1E',
        headerTitleStyle: { fontWeight: '700', fontSize: 20 },
        contentStyle: { backgroundColor: '#F5F7FA' }, 
        headerShadowVisible: false,
        animation: 'slide_from_right'
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Market Watch' }} 
      />
      <Stack.Screen 
        name="Details" 
        component={DetailsScreen} 
        options={({ route }) => ({ 
            title: route.params?.metal?.name || 'Overview',
        })} 
      />
    </Stack.Navigator>
  );
}
