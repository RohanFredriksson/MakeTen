import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Screen } from '../components/Screen';
import { Stack } from '../components/Stack';

import { NumberField } from '../components/NumberField';

const TestScreen = ({navigation}) => {

  return (
    <Stack>
      
      <Screen id='b' zIndex={1} left='a' right='c'>
        <View style={[styles.container, {backgroundColor: 'red'}]}>
          <NumberField callback={(answer) => {console.log(answer);}}/>
        </View>
      </Screen>

      <Screen id='a' zIndex={0} right='b'>
        <View style={[styles.container, {backgroundColor: 'blue'}]}>
        <Text style={styles.text}>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</Text>
        </View>
      </Screen>

      <Screen id='c' zIndex={0} left='b'>
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