import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { AnswerScreen } from './src/screens/AnswerScreen'
import { HomeScreen } from './src/screens/HomeScreen';

const Stack = createStackNavigator();

const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#000' },
      cardStyleInterpolator: forFade,
    }}>
      <Stack.Screen name="Test" component={HomeScreen}/>
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