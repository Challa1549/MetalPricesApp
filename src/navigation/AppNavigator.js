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
        headerStyle: { backgroundColor: '#1877F2' }, // Facebook Blue
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: '700', fontSize: 20 },
        contentStyle: { backgroundColor: '#F0F2F5' }, // Facebook Background Gray
        headerShadowVisible: false,
        animation: 'slide_from_right'
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Precious Metals on Earth' }} 
      />
      <Stack.Screen 
        name="Details" 
        component={DetailsScreen} 
        options={({ route }) => ({ 
            title: route.params?.metal?.name || 'Metal Details',
        })} 
      />
    </Stack.Navigator>
  );
}
