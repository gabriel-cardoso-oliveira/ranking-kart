import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import Edit from '../screens/Edit';
import Home from '../screens/Home';
import Upload from '../screens/Upload';
import { RootStackParamList } from '../types';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Upload"
        component={Upload}
        options={{
          headerShadowVisible: false,
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: 'Resultado da corrida',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Edit"
        component={Edit}
        options={{ presentation: 'modal' }}
      />
    </Stack.Navigator>
  );
}
