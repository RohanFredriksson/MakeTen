import React, { useRef } from 'react';
import { View, Text, TouchableHighlight, TouchableWithoutFeedback, Dimensions, Animated, Easing, Settings } from 'react-native';

import { getStyles } from './../styles/styles';
import { getTheme } from './../styles/themes';

const styles = getStyles();
const theme = getTheme('dark');

const AnswerScreen = ({navigation, route}) => {

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

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
        <View style={{alignItems: 'flex-start', padding: 0.03554502369 * height, backgroundColor: theme.background, borderRadius: 0.02369668246 * height, transform: [{translateY: -0.02962085308 * height}]}}>

          <View style={{flexDirection: 'row', paddingBottom: 0.02369668246 * height}}>
            <Text style={[styles.title, {color: theme.title}]}>Solution</Text>
            {(Settings.get('spoiler') == true) && <Animated.View style={{opacity: spoilerOpacity}}><Text style={[styles.title, {color: theme.title}]}> Exists</Text></Animated.View>}
          </View>
          
          <Text style={[styles.paragraph, {color: theme.white, paddingBottom: 0.03554502369 * height}]}>{message}</Text>          
          <Text style={[styles.title, {color: theme.white, width: 0.3317535545 * height, textAlign: 'center'}]}>{answer}</Text>

          {(Settings.get('spoiler') == true) && <TouchableWithoutFeedback onPress={() => reveal()}>
            <Animated.View style={{position: 'absolute', width: 0.3317535545 * height, height: 0.14218009478 * height, backgroundColor: '#333333', borderRadius: 0.01184834123 * height, transform: [{translateX: 0.03554502369 * height}, {translateY: 0.10663507109 * height}], opacity: spoilerOpacity}}>
              <View style={styles.container}>
                <Text style={[styles.paragraph, {color: theme.white}]}>Hold to reveal</Text>
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>}

          <TouchableHighlight
            style={[{width: 0.3317535545 * height, height: 0.07109004739 * height, backgroundColor: theme.primary, borderRadius: 0.01184834123 * height, marginTop: 0.03554502369 * height}]}
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
        <View style={{alignItems: 'flex-start', padding: 0.03554502369 * height, backgroundColor: theme.background, borderRadius: 0.02369668246 * height, transform: [{translateY: 0.01303317535 * height}]}}>

          <Text style={[styles.title, {color: theme.title, paddingBottom: 0.02369668246 * height}]}>No Solution</Text>
          <Text style={[styles.paragraph, {color: theme.white, paddingBottom: 0.03554502369 * height}]}>Sometimes the universe just{'\n'}doesn't want to play nice :(</Text>

          <TouchableHighlight
            style={[{width: 0.3317535545 * height, height: 0.07109004739 * height, backgroundColor: theme.primary, borderRadius: 0.01184834123 * height}]}
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