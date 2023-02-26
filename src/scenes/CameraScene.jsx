import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Alert, Linking } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

const CameraScene = ({navigation}) => {

  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.back;

  const [permission, setPermission] = useState("not-determined");
  const getStatus = async() => {

    // Get the camera permission status.
    const p = await Camera.requestCameraPermission();
    setPermission(p);

  }

  useEffect(() => {
    getStatus();
  }, []);

  const renderCamera = () => {

    // Show a loading screen, whilst we prompt the user for camera permission.
    if (permission !== "authorized" || device == null) {
      return (<Text>Not Authorized</Text>);
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