import React from 'react';
import { Alert } from 'react-native';
import { Camera } from 'react-native-vision-camera';

import { Screen } from '../components/Screen';
import { Stack } from '../components/Stack';
import { CodeScreen } from './CodeScreen';
import { CameraScreen } from './CameraScreen';
import { SettingsScreen } from './SettingsScreen';

const HomeScreen = ({navigation}) => {

  const checkCameraPermission = async () => {

    const permission = await Camera.requestCameraPermission();
    if (permission !== 'granted') {
  
      Alert.alert('Camera access has been disabled.', 'Please enable camera access in the settings to use the camera.', [
        {text: 'Settings', onPress: () => Linking.openSettings()},
        {text: 'Return', onPress: () => {}, style: 'cancel',}
      ]);
  
      return false;
    }

    return true;
  };

  return (
    <Stack>

      <Screen id='code' zIndex={1} left='camera' leftCheck={checkCameraPermission} right='settings'>
        <CodeScreen navigation={navigation}/>
      </Screen>

      <Screen id='camera' zIndex={0} right='code'>
        <CameraScreen navigation={navigation}/>
      </Screen>

      <Screen id='settings' zIndex={0} left='code'>
        <SettingsScreen navigation={navigation}/>
      </Screen>
      
    </Stack>
  );

}

export {HomeScreen};