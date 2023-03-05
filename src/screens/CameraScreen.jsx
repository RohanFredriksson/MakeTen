import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

import TextRecognition from 'react-native-text-recognition';
import { compute } from '../modules/compute'

const CameraScreen = (props) => {

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.back;
  const camera = useRef(null);

  const [lock, setLock] = useState(false);
  const [message, setMessage] = useState('Initialising camera.');
  const [permission, setPermission] = useState('not-determined');

  const getPermission = async () => {
    const p = await Camera.requestCameraPermission();
    setPermission(p);
  }

  const scan = async () => {

    const p = await Camera.getCameraPermissionStatus();
    if (lock) {return;}
    if (!props.active) {return;}
    if (p !== 'authorized') {return;}
    //if (device == null) {return;} // For some reason device is null even when working.

    setLock(true);
    setMessage('Scanning for a code.');
    const photo = await camera.current.takePhoto();
    const text = "" + (await TextRecognition.recognize(photo.path));
    const code = getCode(text);

    setLock(false);
    if (code == null) {return;}
    const answer = compute(code, 10);
    props.navigation.navigate('Answer', {answer: answer});

  }

  useEffect(() => {
    getPermission();
    const interval = setInterval(scan, 1000);
    return (() => clearInterval(interval));
  }, []);

  const getCode = (text) => {

    // Check if there is a code with prefix letters first.
    var code = text.match(/[DNT][0-9][0-9][0-9][0-9]/g);
    if (code != null) {return code[0].replace(/[^0-9]/g, '');}

    return null;
  };

  const renderCamera = () => {

    // Show a loading screen, whilst we prompt the user for camera permission.
    if (!props.active || permission !== 'authorized' || device == null) {
      return (
        <Text style={styles.text}>{message}</Text>
      );
    }

    return (
      <Camera style={[styles.camera, {width: width, height: height}]} device={device} ref={camera} isActive={true} photo={true} enableZoomGesture={true}>
        <Text style={styles.text}>{message}</Text>
      </Camera>
    );

  };

  return (
    <View style={styles.container}>
      {renderCamera()}
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    margin: 64,
  },
});

export {CameraScreen};