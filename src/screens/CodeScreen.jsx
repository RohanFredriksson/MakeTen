import React from 'react';
import { View, Text } from 'react-native';

import { NumberField } from '../components/NumberField';
import { compute } from './../modules/compute';
import { getStyles } from './../styles/styles';

const CodeScreen = (props) => {

  const solve = (code) => {
    const answer = compute(code, 10);
    props.navigation.navigate('Answer', {answer: answer});
  }
  
  return (
    <View style={[styles.container, styles.background]}>
      <Text style={[styles.text, {paddingHorizontal: 25, position: 'absolute', transform: [{ translateY: -100 }]}]}>Make Ten</Text>
      <View style={[{position: 'absolute', transform: [{ translateY: 0 }]}]}><NumberField callback={solve}/></View>
    </View>
  );

}

const styles = getStyles('dark');

export {CodeScreen};