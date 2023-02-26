import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Alert, Linking } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

const CameraScene = ({navigation}) => {

  const [cameraPermission, setCameraPermission] = useState("not-determined");
  const [error, setError] = useState("")

  const requestPermission = async () => {

    const permission = await Camera.requestCameraPermission();
    if (permission !== "authorized") {
      setError("Not allowed to access camera");
    }

    setCameraPermission(permission);
  }

  const requestPermissionInSettings = async () => {

    await Linking.openSettings();
    const permission = await Camera.getCameraPermissionStatus();
    if (permission !== 'authorized') {
      navigation.pop();
    }

    setCameraPermission(permission);
  }

  useEffect(() => {
    requestPermission();
  });

  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.back;

  const renderCamera = () => {

    // If the user denies access to the camera, request the user to change the option in the settings.
    if (error) {

      Alert.alert('Error', 'Access to the camera has been denied. To continue, please enable access in the Settings.', [
        {
          text: 'Settings',
          onPress: () => requestPermissionInSettings()
        },
        {
          text: 'Return', 
          onPress: () => navigation.pop(),
          style: 'cancel',
        },
      ]);
      
      return (<Text>Error: {error}</Text>);
    }

    // Show a loading screen, whilst we prompt the user for camera permission.
    if (cameraPermission === "not-determined") {
      return (<Text>Not Determined</Text>);
    }    

    // If the device has no usable camera, then we should alert the user and return to the home screen.
    if (device == null) {
      return (<Text>No camera device could be found on your device.</Text>)
    }

    return (
      <Camera
        style={styles.camera}
        device={device}
        isActive={true}
      />
    )
  }

  return (
    <View style={styles.container}>
      {renderCamera()}
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export {CameraScene};