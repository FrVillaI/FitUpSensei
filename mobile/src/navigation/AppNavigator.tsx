import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import useAuthStore from '../store/authStore';
import ProfileScreen from '../screens/client/ProfileScreen';

const Tab = createBottomTabNavigator();

function PlaceholderScreen({ label }: { label: string }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111827' }}>
      <Text style={{ color: '#9CA3AF', fontSize: 18 }}>{label}</Text>
    </View>
  );
}

const tabBarStyle = {
  backgroundColor: '#1F2937',
  borderTopColor: '#374151',
};

const screenOptions = {
  headerShown: false,
  tabBarStyle,
  tabBarActiveTintColor: '#3B82F6',
  tabBarInactiveTintColor: '#6B7280',
};

export default function AppNavigator() {
  const role = useAuthStore((s) => s.role);

  if (role === 'coach') {
    return (
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          name="Clientes"
          children={() => <PlaceholderScreen label="Dashboard Coach" />}
          options={{ tabBarIcon: ({ color }) => <Ionicons name="people-outline" size={22} color={color} /> }}
        />
        <Tab.Screen
          name="Rutinas"
          children={() => <PlaceholderScreen label="Rutinas" />}
          options={{ tabBarIcon: ({ color }) => <Ionicons name="barbell-outline" size={22} color={color} /> }}
        />
        <Tab.Screen
          name="Biblioteca"
          children={() => <PlaceholderScreen label="Biblioteca" />}
          options={{ tabBarIcon: ({ color }) => <Ionicons name="book-outline" size={22} color={color} /> }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Inicio"
        children={() => <PlaceholderScreen label="Rutina del día" />}
        options={{ tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={22} color={color} /> }}
      />
      <Tab.Screen
        name="Progreso"
        children={() => <PlaceholderScreen label="Progreso" />}
        options={{ tabBarIcon: ({ color }) => <Ionicons name="stats-chart-outline" size={22} color={color} /> }}
      />
      <Tab.Screen
        name="Ejercicios"
        children={() => <PlaceholderScreen label="Biblioteca" />}
        options={{ tabBarIcon: ({ color }) => <Ionicons name="search-outline" size={22} color={color} /> }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{ tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={22} color={color} /> }}
      />
    </Tab.Navigator>
  );
}
