import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, Switch, Settings, TouchableWithoutFeedback } from 'react-native';
import { getStyles } from './../styles/styles';
import { getTheme } from './../styles/themes';

const styles = getStyles();
const theme = getTheme('dark');

import CameraIcon from './../assets/icons/camera.svg';
import HomeIcon from './../assets/icons/house-chimney.svg';
import SettingsIcon from './../assets/icons/settings.svg';

const SettingsScreen = (props) => {

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const [enabled, setEnabled] = useState(false);
  
  const toggle = () => {
    next = !enabled;
    Settings.set({spoiler: next});
    setEnabled(next);
  }

  useEffect(() => {
    if (Settings.get('spoiler') == true) {setEnabled(true);}
  }, []);

  return (
    <View style={[styles.container, {backgroundColor: '#3A3B4A'}]}>
      <View style={{transform: [{translateY: -0.02369668246 * height}]}}>

        <View style={[styles.shadow, {alignItems: 'flex-start', padding: 0.03554502369 * height, backgroundColor: theme.background, borderRadius: 0.02369668246 * height, marginBottom: 0.03554502369 * height}]}>
          <Text style={[styles.title, {color: theme.title, width: 0.3317535545 * height, marginBottom: 0.01777251184 * height}]}>Settings</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.header, {color: theme.paragraph, paddingRight: 0.08293838862 * height}]}>Spoiler Guard</Text>
            <Switch
              value={enabled}
              onValueChange={toggle}
            />
          </View>  
        </View>

        <View style={[styles.shadow, {alignItems: 'flex-start', padding: 0.03554502369 * height, backgroundColor: theme.background, borderRadius: 0.02369668246 * height, transform: [{translateY: -0 * height}]}]}>
          <Text style={[styles.title, {color: theme.title}]}>About</Text>
          <Text style={[styles.paragraph, {color: theme.paragraph, width: 0.3317535545 * height}]}>{'\n'}The Sydney Trains Make Ten Challenge has become a beloved pastime for commuters seeking a way to make their time on the train more enjoyable.{'\n\n'}Each carriage is assigned a unique four-digit number. Using all of the digits from this number, players aim to find equations that sum up to 10 using basic arithmetic operations.</Text>          
        </View>

        <View style={[styles.shadow, {backgroundColor: theme.background, paddingVertical: 0.017772511845 * height, paddingHorizontal: 0.03554502369 * height, borderRadius: 0.02369668246 * height, position: 'absolute', transform: [{translateY: 7.5 * 0.09478672985 * height}]}]}>
          <View style={[styles.container, {flexDirection: 'row', width: 0.3317535545 * height}]}>
            <TouchableWithoutFeedback onPress={() => {props.left("camera");}}><CameraIcon width={0.04739336492 * height} height={0.04739336492 * height} style={{paddingHorizontal: 0.02369668246 * height, fill: theme.paragraph}}/></TouchableWithoutFeedback>
            <View style={{marginHorizontal: 0.02369668246 * height, backgroundColor: theme.paragraph, width: 2, height: 0.04739336492 * height}}/>
            <TouchableWithoutFeedback onPress={() => {props.left();}}><HomeIcon width={0.04739336492 * height} height={0.04739336492 * height} style={{paddingHorizontal: 0.02369668246 * height, fill: theme.paragraph}}/></TouchableWithoutFeedback>
            <View style={{marginHorizontal: 0.02369668246 * height, backgroundColor: theme.paragraph, width: 2, height: 0.04739336492 * height}}/>
            <SettingsIcon width={0.04739336492 * height} height={0.04739336492 * height} style={{paddingHorizontal: 0.02369668246 * height, fill: theme.title}}/>
          </View>
        </View>

      </View>
    </View>
  )
  
}

export { SettingsScreen };
