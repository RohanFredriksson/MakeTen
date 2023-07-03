import React from 'react';
import { View, Text, Dimensions, Settings } from 'react-native';
import { getStyles } from './../styles/styles';
import { getTheme } from './../styles/themes';

const styles = getStyles();
const theme = getTheme('dark');

const SettingsScreen = (props) => {

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={{position: 'absolute', width: 0.3317535545 * height, transform: [{translateY: -0.21327014218 * height}]}}>
        <View>
          <Text style={[styles.title, {color: theme.title, paddingBottom: 0.02369668246 * height}]}>Settings</Text>
          <Text style={[styles.paragraph, {color: theme.paragraph, paddingBottom: 0.03554502369 * height}]}>Enter a 4 digit train code or{'\n'}swipe to explore</Text>
        </View>
        <View>
          <Text style={[styles.title, {color: theme.title, paddingBottom: 0.02369668246 * height}]}>About</Text>
          <Text style={[styles.paragraph, {color: theme.paragraph, paddingBottom: 0.03554502369 * height}]}>Enter a 4 digit train code or{'\n'}swipe to explore</Text>
        </View>
      </View>
    </View>
  )
  
}

export { SettingsScreen };