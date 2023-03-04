import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ScreenCornerRadius } from "react-native-screen-corner-radius"

import { NumberField } from '../components/NumberField';
import { compute } from './../modules/compute'

const CodeScreen = (props) => {

  const solve = (code) => {
    const answer = compute(code, 10);
    props.navigation.navigate('Answer', {answer: answer});
  }

  return (
    <View style={[styles.container, {backgroundColor: '#F5F5F7', borderRadius: ScreenCornerRadius}]}>
      <Text style={styles.title}>Enter the code:</Text>
      <NumberField callback={solve}/>
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