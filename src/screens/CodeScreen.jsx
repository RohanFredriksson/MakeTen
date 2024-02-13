import React from 'react';
import { View, Text, Dimensions, TouchableWithoutFeedback } from 'react-native';

import { NumberField } from '../components/NumberField';
import { compute } from './../modules/compute';
import { getStyles } from './../styles/styles';
import { getTheme } from './../styles/themes';

const styles = getStyles();
const theme = getTheme('dark');

import CameraIcon from './../assets/icons/camera.svg';
import HomeIcon from './../assets/icons/house-chimney.svg';
import SettingsIcon from './../assets/icons/settings.svg';

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

      <View style={[styles.shadow, {backgroundColor: theme.background, paddingVertical: 0.017772511845 * height, paddingHorizontal: 0.03554502369 * height, borderRadius: 0.02369668246 * height, position: 'absolute', transform: [{translateY: 4.125 * 0.09478672985 * height}]}]}>
        <View style={[styles.container, {flexDirection: 'row', width: 0.3317535545 * height}]}>
          
        </View>
      </View>

    </View>
  );

}

/*
<TouchableWithoutFeedback onPress={() => {props.left();}}><CameraIcon width={0.04739336492 * height} height={0.04739336492 * height} style={{paddingHorizontal: 0.02369668246 * height, fill: theme.paragraph}}/></TouchableWithoutFeedback>
          <View style={{marginHorizontal: 0.02369668246 * height, backgroundColor: theme.paragraph, width: 2, height: 0.04739336492 * height}}/>
          <HomeIcon width={0.04739336492 * height} height={0.04739336492 * height} style={{paddingHorizontal: 0.02369668246 * height, fill: theme.title}}/>
          <View style={{marginHorizontal: 0.02369668246 * height, backgroundColor: theme.paragraph, width: 2, height: 0.04739336492 * height}}/>
          <TouchableWithoutFeedback onPress={() => {props.right();}}><SettingsIcon width={0.04739336492 * height} height={0.04739336492 * height} style={{paddingHorizontal: 0.02369668246 * height, fill: theme.paragraph}}/></TouchableWithoutFeedback>
*/

export {CodeScreen};