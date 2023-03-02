import React, { useRef } from 'react';
import { View, StyleSheet, Button, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Alert, Linking, Dimensions, Text, Animated } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import { NumberField } from '../components/NumberField';

const HomeScreen = ({navigation}) => {

  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.back;

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const translateX = useRef(new Animated.Value(0)).current;

  const onGestureEvent = (event) => {
    const { translationX } = event.nativeEvent;
    translateX.setValue(translationX);
  };
  
  const onHandlerStateChange = async (event) => {

    // If the user pressed down, dismiss the keyboard.
    if (event.nativeEvent.state === State.BEGAN) {
      Keyboard.dismiss();
    }

    // If the user ends the gesture, determine if we can move.
    if (event.nativeEvent.state === State.END) {
      
      // If the user moved far enough to the left.
      var success = event.nativeEvent.translationX > width / 3;
      if (success) {

        // Get the camera permission
        const permission = await Camera.requestCameraPermission();
        if (permission !== 'authorized') {

          // Prompt the user for camera access.
          Alert.alert('Camera access has been disabled.', 'Please enable camera access in the settings to use the camera.', [
            {text: 'Settings', onPress: () => Linking.openSettings()},
            {text: 'Return', onPress: () => {}, style: 'cancel',}
          ]);

          // Even if the user allows access, return to home.
          success = false;
        }

        else {
          
          // Check if there is a device that can be used.
          if (device == null) {

            // Prompt the user for camera access.
            Alert.alert('No available camera devices.', 'There are no cameras on the device that can be used.', [
              {text: 'Return', onPress: () => {}, style: 'cancel',}
            ]);

            // Raise the flag to return home.
            success = false;
          }

          else {
            // If we have sufficient permission, go to the camera.
            navigation.navigate('Camera');
            setTimeout(() => {translateX.setValue(0);}, 500);
          }
          
        }
        
      } 
      
      // Spring the screen back to its default location.
      if (!success) {
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: false
        }).start();
      }

    }

  };

  return (
    <PanGestureHandler
      onGestureEvent={(event) => {onGestureEvent(event);}}
      onHandlerStateChange={(event) => {onHandlerStateChange(event);}}
    >
      <Animated.View style={{ transform: [{ translateX }], width: width, height: height }}>
        <View style={styles.container}>
          <NumberField callback={(answer) => {navigation.navigate('Answer', {answer: answer});}}/>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );

}

export {HomeScreen};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F7'
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold'
  },
});