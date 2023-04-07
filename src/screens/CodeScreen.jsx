import React from 'react';
import { View, Text } from 'react-native';
import { ScreenCornerRadius } from "react-native-screen-corner-radius";

import { NumberField } from '../components/NumberField';
import { compute } from './../modules/compute';
import { getStyles } from './../styles/styles';

const CodeScreen = (props) => {

  const solve = (code) => {
    const answer = compute(code, 10);
    props.navigation.navigate('Answer', {answer: answer});
  }

  return (
    <View style={[styles.container, {backgroundColor: '#F5F5F7', borderRadius: ScreenCornerRadius}]}>
      <Text style={styles.sign}>Circular Quay</Text>
      <NumberField callback={solve}/>
    </View>
  );

}

const styles = getStyles('light');

export {CodeScreen};