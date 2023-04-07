import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getStyles } from './../styles/styles';

const SettingsScreen = (props) => {

  return (
    <View style={[styles.container, {backgroundColor: 'blue'}]}>
      <Text style={styles.text}>{(props.active ? "ACTIVE" : "INACTIVE")}</Text>
    </View>
  )
  
}

const styles = getStyles('light');

export { SettingsScreen };