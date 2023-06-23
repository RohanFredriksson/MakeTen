import React from 'react';
import { View, Text } from 'react-native';

import { NumberField } from '../components/NumberField';
import { compute } from './../modules/compute';
import { getStyles } from './../styles/styles';
import { getTheme } from './../styles/themes';

const styles = getStyles();
const theme = getTheme('dark');

const CodeScreen = (props) => {

  const solve = (code) => {
    const answer = compute(code, 10);
    props.navigation.navigate('Answer', {answer: answer});
  }
  
  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={{position: 'absolute', transform: [{translateY: -80}]}}>
        <Text style={[styles.title, {color: theme.title, paddingBottom: 20}]}>Make Ten</Text>
        <Text style={[styles.paragraph, {color: theme.paragraph, paddingBottom: 30}]}>Enter a 4 digit train code or{'\n'}swipe to explore</Text>
        <View style={[]}><NumberField callback={solve}/></View>
      </View>
    </View>
  );

}

export {CodeScreen};