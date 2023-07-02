import React from 'react';
import { View, Text, Settings } from 'react-native';
import { getStyles } from './../styles/styles';
import { getTheme } from './../styles/themes';

const styles = getStyles();
const theme = getTheme('dark');

const SettingsScreen = (props) => {

  /*
  return (
    <View style={[styles.container, {backgroundColor: 'blue'}]}>
      <Text style={styles.text}>{(props.active ? "ACTIVE" : "INACTIVE")}</Text>
    </View>
  )
  */

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={{position: 'absolute', width: 280, transform: [{translateY: -180}]}}>
        <Text style={[styles.title, {color: theme.title, paddingBottom: 20}]}>Settings</Text>
        <Text style={[styles.paragraph, {color: theme.paragraph, paddingBottom: 30}]}>Enter a 4 digit train code or{'\n'}swipe to explore</Text>
        <Text style={[styles.title, {color: theme.title, paddingBottom: 20}]}>About</Text>
        <Text style={[styles.paragraph, {color: theme.paragraph, paddingBottom: 30}]}>Enter a 4 digit train code or{'\n'}swipe to explore</Text>
      </View>
    </View>
  )
  
}

export { SettingsScreen };