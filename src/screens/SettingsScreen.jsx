import React from 'react';
import { View, Text, Settings } from 'react-native';
import { getStyles } from './../styles/styles';

const styles = getStyles();

const SettingsScreen = (props) => {

  console.log(Settings.get('spoiler'));

  return (
    <View style={[styles.container, {backgroundColor: 'blue'}]}>
      <Text style={styles.text}>{(props.active ? "ACTIVE" : "INACTIVE")}</Text>
    </View>
  )
  
}

export { SettingsScreen };