import React from 'react';
import { View, Text, Button } from 'react-native';

import { getStyles } from './../styles/styles';
import { getTheme } from './../styles/themes';

const styles = getStyles();
const theme = getTheme('dark');

function getColor(success) {
  if (success) {return {backgroundColor: '#4cda64'}};
  return {backgroundColor: '#fe0000'};
}

const AnswerScreen = ({navigation, route}) => {

  const answer = route.params.answer;
  const success = answer != null;
  const color = getColor(success);

  if (success) {

    return (
      <View style={[styles.container, color]}>
        <Text style={[styles.title, {color: theme.white}]}>Solution: </Text>
        <Text style={[styles.header, {color: theme.white}]}>{answer}</Text>
        <Button title="Return" onPress={() => navigation.pop()}/>
      </View>
    );
  }

  else {
    return (
      <View style={[styles.container, color]}>
        <Text style={[styles.header, {color: theme.white}]}>{answer}</Text>
        <Button title="Return" onPress={() => navigation.pop()}/>
      </View>
    );
  }

}

export {AnswerScreen};