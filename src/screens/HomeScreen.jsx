import React from 'react';
import { Alert, Linking, Platform, PermissionsAndroid } from 'react-native';
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
  
      if (Platform.OS === 'ios') {

        Alert.alert('Camera access has been disabled.', 'Please enable camera access in the settings to use the camera.', [
          {text: 'Settings', onPress: () => Linking.openSettings()},
          {text: 'Return', onPress: () => {}, style: 'cancel',}
        ]);
    
        return false;

      }

      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'Please enable camera access to use the camera.',
          buttonPositive: 'OK',
        },
      );

      return granted;
      
    }

    return true;
  };

  return (
    <Stack>

      <Screen id='code' zIndex={2} left='camera' right='settings'>
        <CodeScreen navigation={navigation}/>
      </Screen>

      <Screen id='camera' zIndex={0} right='code' check={checkCameraPermission}>
        <CameraScreen navigation={navigation}/>
      </Screen>

      <Screen id='settings' zIndex={1} left='code'>
        <SettingsScreen navigation={navigation}/>
      </Screen>
      
    </Stack>
  );

}

export {HomeScreen};