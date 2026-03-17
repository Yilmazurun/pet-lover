import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { HomeScreen } from './src/screens/HomeScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { PetProvider } from './src/context/PetContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PetProvider>
      <NavigationContainer theme={DarkTheme}>
        <StatusBar style="light" />
        <Tab.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#1e293b' },
            headerTitleStyle: { color: '#f8fafc', fontWeight: 'bold' },
            tabBarStyle: { backgroundColor: '#1e293b', borderTopColor: '#334155', paddingBottom: 5, paddingTop: 5 },
            tabBarActiveTintColor: '#38bdf8',
            tabBarInactiveTintColor: '#64748b',
          }}
        >
          <Tab.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ 
                title: 'Evim',
                tabBarIcon: ({ color }) => <Text style={{fontSize: 22, color}}>🏠</Text>,
                headerShown: false,
            }} 
          />
          <Tab.Screen 
            name="Profile" 
            component={ProfileScreen} 
            options={{ 
                title: 'Profil',
                tabBarIcon: ({ color }) => <Text style={{fontSize: 22, color}}>🏆</Text>,
                headerTitle: 'Koleksiyon ve Profil'
            }} 
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PetProvider>
  );
}
