import React, { useRef } from 'react';
import { View, Text, TouchableHighlight, TouchableWithoutFeedback, Animated, Easing, Settings } from 'react-native';

import { getStyles } from './../styles/styles';
import { getTheme } from './../styles/themes';

const styles = getStyles();
const theme = getTheme('dark');

const AnswerScreen = ({navigation, route}) => {

  const answer = route.params.answer;
  const success = answer != null;
  const spoilerOpacity = useRef(new Animated.Value(1.0)).current;
  const textOpacity = useRef(new Animated.Value(0.0)).current;

  const reveal = () => {
    const spoilerTiming = Animated.timing(spoilerOpacity, {toValue: 0.0, duration: 200, useNativeDriver: true, easing: Easing.linear});
    const textTiming = Animated.timing(textOpacity, {toValue: 1.0, duration: 200, useNativeDriver: true, easing: Easing.linear});
    Animated.parallel([spoilerTiming, textTiming]).start();
  }

  if (success) {

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
        <View style={{alignItems: 'flex-start', padding: 30, backgroundColor: theme.background, borderRadius: 20, transform: [{translateY: -25}]}}>

          <View style={{flexDirection: 'row', paddingBottom: 20}}>
            <Text style={[styles.title, {color: theme.title}]}>Solution</Text>
            {(Settings.get('spoiler') == true) && <Animated.View style={{opacity: spoilerOpacity}}><Text style={[styles.title, {color: theme.title}]}> Exists</Text></Animated.View>}
          </View>
          
          <Text style={[styles.paragraph, {color: theme.white, paddingBottom: 30}]}>{message}</Text>          
          <Text style={[styles.title, {color: theme.white, width: 280, textAlign: 'center'}]}>{answer}</Text>

          {(Settings.get('spoiler') == true) && <TouchableWithoutFeedback onPress={() => reveal()}>
            <Animated.View style={{position: 'absolute', width: 280, height: 120, backgroundColor: '#333333', borderRadius: 10, transform: [{translateX: 30}, {translateY: 90}], opacity: spoilerOpacity}}>
              <View style={styles.container}>
                <Text style={[styles.paragraph, {color: theme.white}]}>Hold to reveal</Text>
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>}

          <TouchableHighlight
            style={[{width: 280, height: 60, backgroundColor: theme.primary, borderRadius: 10, marginTop: 30}]}
            underlayColor={theme.primary}
            onPress={() => navigation.pop()}
          >
            <View style={styles.container}><Text style={styles.paragraph}>Return</Text></View>
          </TouchableHighlight>

        </View>
      </View>
    );
  }

  else {
    return (
      <View style={[styles.container, {backgroundColor: '#FE0000'}]}>
        <View style={{alignItems: 'flex-start', padding: 30, backgroundColor: theme.background, borderRadius: 20, transform: [{translateY: 11}]}}>

          <Text style={[styles.title, {color: theme.title, paddingBottom: 20}]}>No Solution</Text>
          <Text style={[styles.paragraph, {color: theme.white, paddingBottom: 30}]}>Sometimes the universe just{'\n'}doesn't want to play nice :(</Text>

          <TouchableHighlight
            style={[{width: 280, height: 60, backgroundColor: theme.primary, borderRadius: 10}]}
            underlayColor={theme.primary}
            onPress={() => navigation.pop()}
          >
            <View style={styles.container}><Text style={styles.paragraph}>Return</Text></View>
          </TouchableHighlight>

        </View>
      </View>
    );
  }

}

export {AnswerScreen};