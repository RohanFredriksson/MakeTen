import React from 'react';
import { View, StyleSheet, Button, Keyboard, TouchableWithoutFeedback, Alert, Linking } from 'react-native';
import { Camera } from 'react-native-vision-camera';
import { NumberField } from './../components/NumberField';

const HomeScene = ({navigation}) => {

  const openCamera = async () => {
    
    const permission = await Camera.requestCameraPermission();
    if (permission !== "authorized") {

      // Prompt the user for camera access.
      Alert.alert('Error', 'Access to the camera has been disabled. Please enable access in Settings.', [
        {
          text: 'Settings',
          onPress: () => Linking.openSettings()
        },
        {
          text: 'Return', 
          onPress: () => {},
          style: 'cancel',
        },
      ]);

    }

    // If authorized, open the camera.
    else {
      navigation.navigate('Camera')
    }

  }

  const successCallback = (answer) => {
    navigation.navigate('Answer', {answer: answer});
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <NumberField callback={successCallback}/>
        <Button title="Camera" onPress={openCamera}/>
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