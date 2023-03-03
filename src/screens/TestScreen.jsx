import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ScreenCornerRadius } from "react-native-screen-corner-radius"

import { Screen } from '../components/Screen';
import { Stack } from '../components/Stack';
import { NumberField } from '../components/NumberField';

const TestComponent = (props) => {

  return (
    <View style={[styles.container, {backgroundColor: 'blue'}]}>
      <Text style={styles.text}>{(props.active ? "ACTIVE" : "INACTIVE")}</Text>
    </View>
  )

}

const TestScreen = ({navigation}) => {

  return (
    <Stack>

      <Screen id='camera' zIndex={0} right='code'>
        <TestComponent/>
      </Screen>
      
      <Screen id='code' zIndex={1} left='camera' right='settings'>
        <View style={[styles.container, {backgroundColor: '#F5F5F7', borderRadius: ScreenCornerRadius}]}>
          <NumberField callback={(answer) => {navigation.navigate('Answer', {answer: answer});}}/>
        </View>
      </Screen>

      <Screen id='settings' zIndex={0} left='code'>
        <View style={[styles.container, {backgroundColor: 'green'}]}>
          <Text style={styles.text}>cccccccccccccccccccccccccccccccccccccccccccc</Text>
        </View>
      </Screen>

    </Stack>
  );

}

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

export {TestScreen};