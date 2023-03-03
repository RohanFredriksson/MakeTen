import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from './src/screens/HomeScreen'
import { AnswerScreen } from './src/screens/AnswerScreen'
import { CameraScreen } from './src/screens/CameraScreen'

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#000' }
    }}>
      <Stack.Screen name="Home" component={HomeScreen}/>
      <Stack.Screen name="Camera" component={CameraScreen} options={{ gestureDirection: 'horizontal-inverted' }}/>
      <Stack.Screen name="Answer" component={AnswerScreen}/>
    </Stack.Navigator>
  );
}

export default function App() {

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );

}