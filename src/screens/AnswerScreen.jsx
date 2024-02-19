import React from 'react';
import { View, Text, TouchableHighlight, Dimensions } from 'react-native';
import { getSpoilerStatus } from '../modules/settings';

import { getStyles } from './../styles/styles';
import { getTheme } from './../styles/themes';

const styles = getStyles();
const theme = getTheme('dark');

const AnswerScreen = ({navigation, route}) => {

  //const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const answer = route.params.answer;
  const success = answer != null;

  if (success) {

    if (getSpoilerStatus()) {
      return (
        <View style={[styles.container, {backgroundColor: '#4CDA64'}]}>
        <View style={[styles.shadow, {alignItems: 'flex-start', padding: 0.03554502369 * height, backgroundColor: theme.background, borderRadius: 0.02369668246 * height, transform: [{translateY: 0.01303317535 * height}]}]}>

          <Text style={[styles.title, {color: theme.title, paddingBottom: 0.02369668246 * height}]}>Solution Exists</Text>
          <Text style={[styles.paragraph, {color: theme.white, paddingBottom: 0.03554502369 * height}]}>Turn off the spoiler guard in{'\n'}the settings to see the solution</Text>

          <TouchableHighlight
            style={[{width: 0.3317535545 * height, height: 0.07109004739 * height, backgroundColor: theme.primary, borderRadius: 0.01184834123 * height}]}
            underlayColor={theme.primary}
            onPress={() => navigation.pop()}
          >
            <View style={styles.container}><Text style={[styles.paragraph, {color: theme.black}]}>Return</Text></View>
          </TouchableHighlight>

        </View>
      </View>
      );
    }

    var difficulty = 0;
    var operators = 0;
    if (answer.includes('+')) {operators++;}
    if (answer.includes('-')) {operators++;}
    if (answer.includes('*')) {operators++;}
    if (answer.includes('/')) {operators++;}

    if (operators > 2) {difficulty++;}
    if (answer.includes('(')) {difficulty++;}

    var message = 'That one was pretty easy.\nJust checking your answer?';
    if (difficulty == 1) {message = 'Not the easiest one I\'ve seen,\nbut there are also harder ones.';}
    if (difficulty == 2) {message = 'That one was quite tricky.\nCongrats if you got it yourself!';}

    return (
      <View style={[styles.container, {backgroundColor: '#4CDA64'}]}>
        <View style={[styles.shadow, {alignItems: 'flex-start', padding: 0.03554502369 * height, backgroundColor: theme.background, borderRadius: 0.02369668246 * height, transform: [{translateY: -0.02962085308 * height}]}]}>

          <Text style={[styles.title, {color: theme.title, paddingBottom: 0.02369668246 * height}]}>Solution</Text>
          <Text style={[styles.paragraph, {color: theme.white, paddingBottom: 0.03554502369 * height}]}>{message}</Text>          
          <Text style={[styles.title, {color: theme.white, width: 0.3317535545 * height, textAlign: 'center'}]}>{answer}</Text>

          <TouchableHighlight
            style={[{width: 0.3317535545 * height, height: 0.07109004739 * height, backgroundColor: theme.primary, borderRadius: 0.01184834123 * height, marginTop: 0.03554502369 * height}]}
            underlayColor={theme.primary}
            onPress={() => navigation.pop()}
          >
            <View style={styles.container}><Text style={[styles.paragraph, {color: theme.black}]}>Return</Text></View>
          </TouchableHighlight>

        </View>
      </View>
    );
  }

  else {
    return (
      <View style={[styles.container, {backgroundColor: '#FE0000'}]}>
        <View style={[styles.shadow, {alignItems: 'flex-start', padding: 0.03554502369 * height, backgroundColor: theme.background, borderRadius: 0.02369668246 * height, transform: [{translateY: 0.01303317535 * height}]}]}>

          <Text style={[styles.title, {color: theme.title, paddingBottom: 0.02369668246 * height}]}>No Solution</Text>
          <Text style={[styles.paragraph, {color: theme.white, paddingBottom: 0.03554502369 * height}]}>Sometimes the universe just{'\n'}doesn't want to play nice :(</Text>

          <TouchableHighlight
            style={[{width: 0.3317535545 * height, height: 0.07109004739 * height, backgroundColor: theme.primary, borderRadius: 0.01184834123 * height}]}
            underlayColor={theme.primary}
            onPress={() => navigation.pop()}
          >
            <View style={styles.container}><Text style={[styles.paragraph, {color: theme.black}]}>Return</Text></View>
          </TouchableHighlight>

        </View>
      </View>
    );
  }

}

export {AnswerScreen};