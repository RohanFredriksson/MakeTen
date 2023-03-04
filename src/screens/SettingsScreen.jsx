import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SettingsScreen = (props) => {

  return (
    <View style={[styles.container, {backgroundColor: 'blue'}]}>
      <Text style={styles.text}>{(props.active ? "ACTIVE" : "INACTIVE")}</Text>
    </View>
  )
  
}

export { SettingsScreen };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
});