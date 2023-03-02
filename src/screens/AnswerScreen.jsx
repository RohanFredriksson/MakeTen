import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

function getColor(success) {
  if (success) {return {backgroundColor: '#4cda64'}};
  return {backgroundColor: '#fe0000'};
}

const AnswerScreen = ({navigation, route}) => {

  const answer = route.params.answer;
  const success = answer != null;

  return (
    <View style={[styles.container, getColor(success)]}>
      <Text style={styles.text}>{answer}</Text>
      <Button title="Return" onPress={() => navigation.pop()}/>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 36,
    textAlign: 'center',
  },
});

export {AnswerScreen};