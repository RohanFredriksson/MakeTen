import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Dimensions } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';

import TextRecognition from 'react-native-text-recognition';
import { compute } from '../modules/compute'
import { getStyles } from './../styles/styles';
import { getTheme } from './../styles/themes';

const styles = getStyles();
const theme = getTheme('dark');

const CameraScreen = (props) => {

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const device = useCameraDevice('back')
  const camera = useRef(null);
  const interval = useRef(null);

  const [lock, setLock] = useState(false);
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('Starting camera');
  const [permission, setPermission] = useState('not-determined');

  const getPermission = async () => {
    const p = await Camera.requestCameraPermission();
    setPermission(p);
  }

  const scan = async () => {

    const p = await Camera.getCameraPermissionStatus();
    if (lock) {return;}
    if (!props.active) {return;}
    if (p !== 'granted') {return;}
    if (device == null) {return;}

    setLock(true);
    setMessage('Scanning for a code');
    const photo = await camera.current.takePhoto({enableShutterSound: false});
    const text = "" + (await TextRecognition.recognize(photo.path));
    const code = getCode(text);

    setLock(false);
    if (code == null) {return;}
    const answer = compute(code, 10);
    props.navigation.navigate('Answer', {answer: answer});

  }

  const loop = () => {
    setCount(count => (count + 1) % 3);
    scan();
  }

  useEffect(() => {
    getPermission();
    interval.current = setInterval(loop, 1000);
    return (() => clearInterval(interval.current));
  }, []);

  const getCode = (text) => {

    // Check if there is a code with prefix letters first.
    var code = text.match(/[DNT][0-9][0-9][0-9][0-9]/g);
    if (code != null) {return code[0].replace(/[^0-9]/g, '');}

    return null;
  };

  const renderCamera = () => {

    // Show a loading screen, whilst we prompt the user for camera permission.
    if (!props.active || permission !== 'granted' || device == null) {
      return (
        <Text style={[styles.header, {color: theme.white, position: 'absolute', bottom: 32, left: 32}]}>{message + '.'.repeat(count+1)}</Text>
      );
    }

    return (
      <Camera style={{width: width, height: height, flex: 1}} device={device} ref={camera} isActive={true} photo={true} enableZoomGesture={true}>
        <Text style={[styles.header, {color: theme.white, position: 'absolute', bottom: 32, left: 32}]}>{message + '.'.repeat(count+1)}</Text>
      </Camera>
    );

  };

  return (
    <View style={styles.container}>
      {renderCamera()}
    </View>
  );

}

export {CameraScreen};