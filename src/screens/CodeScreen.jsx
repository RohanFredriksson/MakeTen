import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ScreenCornerRadius } from "react-native-screen-corner-radius"
import { NumberField } from '../components/NumberField';

const CodeScreen = (props) => {
  return (
    <View style={[styles.container, {backgroundColor: '#F5F5F7', borderRadius: ScreenCornerRadius}]}>
      <Text style={styles.title}>Enter the code:</Text>
      <NumberField callback={(answer) => {props.navigation.navigate('Answer', {answer: answer});}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center', 
    fontSize: 30
  }
});

export {CodeScreen};