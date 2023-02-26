import React from 'react';
import { View, StyleSheet, Button, Keyboard, TouchableWithoutFeedback} from 'react-native';
import { NumberField } from './../components/NumberField';

const HomeScene = ({navigation}) => {

  const successCallback = (answer) => {
    navigation.navigate('Answer', {answer: answer});
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <NumberField callback={successCallback}/>
        <Button title="Camera" onPress={() => navigation.navigate('Camera')}/>
      </View>
    </TouchableWithoutFeedback>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hidden: {
    position: 'absolute',
    height: 0,
    width: 0,
    opacity: 0,
  },
});

export {HomeScene};