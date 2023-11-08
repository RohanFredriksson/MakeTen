import React from 'react';
import { View, Text, Dimensions } from 'react-native';

import { NumberField } from '../components/NumberField';
import { compute } from './../modules/compute';
import { getStyles } from './../styles/styles';
import { getTheme } from './../styles/themes';

const styles = getStyles();
const theme = getTheme('dark');

const CodeScreen = (props) => {

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const solve = (code) => {
    const answer = compute(code, 10);
    props.navigation.navigate('Answer', {answer: answer});
  }

  return (
    <View style={[styles.container, {backgroundColor: '#3A3B4A'}]}>
      <View style={[styles.shadow, {backgroundColor: theme.background, padding: 0.03554502369 * height, borderRadius: 0.02369668246 * height, position: 'absolute', transform: [{translateY: -0.09478672985 * height}]}]}>
        <Text style={[styles.title, {color: theme.title, paddingBottom: 0.02369668246 * height}]}>Make Ten</Text>
        <Text style={[styles.paragraph, {color: theme.paragraph, paddingBottom: 0.03554502369 * height}]}>Enter a 4 digit train code or{'\n'}swipe to explore</Text>
        <View style={[]}><NumberField callback={solve}/></View>
      </View>
    </View>
  );

}

export {CodeScreen};