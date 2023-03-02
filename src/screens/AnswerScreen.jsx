import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

function getContainerStyle(success) {

  if (success) {
    return {
      flex: 1,
      backgroundColor: '#4cda64',
      alignItems: 'center',
      justifyContent: 'center',
    }
  }

  return {
    flex: 1,
    backgroundColor: '#fe0000',
    alignItems: 'center',
    justifyContent: 'center',
  }

}

const AnswerScreen = ({navigation, route}) => {

  const answer = route.params.answer;
  const success = answer != null;

  return (
    <View style={getContainerStyle(success)}>
      <Text style={styles.text}>{answer}</Text>
      <Button title="Return" onPress={() => navigation.pop()}/>
    </View>
  );

}

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 36,
    textAlign: 'center',
  },
});

export {AnswerScreen};