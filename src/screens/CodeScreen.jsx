import React from 'react';
import { View, Text } from 'react-native';

import { NumberField } from '../components/NumberField';
import { BrickBackground } from '../components/BrickBackground';
import { compute } from './../modules/compute';
import { getStyles } from './../styles/styles';

const CodeScreen = (props) => {

  const solve = (code) => {
    const answer = compute(code, 10);
    props.navigation.navigate('Answer', {answer: answer});
  }
  
  return (
    <View style={[styles.container, styles.background]}>
      <BrickBackground style={{position: 'absolute'}}/>
      <Text style={[styles.sign, {paddingHorizontal: 25, position: 'absolute', transform: [{ translateY: -100 }]}]}>Circular Quay</Text>
      <View style={{position: 'absolute', transform: [{ translateY: 0 }]}}><NumberField callback={solve}/></View>
    </View>
  );

}

const styles = getStyles('light');

export {CodeScreen};