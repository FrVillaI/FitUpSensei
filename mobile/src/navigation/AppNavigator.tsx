import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import useAuthStore from '../store/authStore';

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

export default function AppNavigator() {
  const role = useAuthStore((s) => s.role);

  if (role === 'coach') {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle,
          tabBarActiveTintColor: '#3B82F6',
          tabBarInactiveTintColor: '#6B7280',
        }}
      >
        <Tab.Screen name="Clientes" children={() => <PlaceholderScreen label="Dashboard Coach" />} />
        <Tab.Screen name="Rutinas" children={() => <PlaceholderScreen label="Rutinas" />} />
        <Tab.Screen name="Biblioteca" children={() => <PlaceholderScreen label="Biblioteca" />} />
      </Tab.Navigator>
    );
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle,
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: '#6B7280',
      }}
    >
      <Tab.Screen name="Inicio" children={() => <PlaceholderScreen label="Rutina del día" />} />
      <Tab.Screen name="Progreso" children={() => <PlaceholderScreen label="Progreso" />} />
      <Tab.Screen name="Ejercicios" children={() => <PlaceholderScreen label="Biblioteca" />} />
      <Tab.Screen name="Perfil" children={() => <PlaceholderScreen label="Perfil" />} />
    </Tab.Navigator>
  );
}
