import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

import TextRecognition from 'react-native-text-recognition';
import { compute } from '../modules/compute'

const CameraScreen = (props) => {

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.back;
  const camera = useRef(null);

  const [permission, setPermission] = useState("not-determined");
  const getStatus = async() => {

    // Get the camera permission status.
    const p = await Camera.requestCameraPermission();
    setPermission(p);

  }

  useEffect(() => {
    getStatus();
  }, []);

  const getCode = (text) => {

    // Check if there is a code with prefix letters first.
    var code = text.match(/[DNT][0-9][0-9][0-9][0-9]/g);
    if (code != null) {return code[0].replace(/[^0-9]/g, '');}

    // Check if there is 4 digits in the text.
    code = text.match(/[0-9][0-9][0-9][0-9]/g);
    if (code != null) {return code[0];}

    return null;
  };

  const takePhoto = async () => {
    
    // Take a photo and perform OCR on it.
    const photo = await camera.current.takePhoto();
    const text = "" + (await TextRecognition.recognize(photo.path));

    // Determine if there is a 4 digit code in the photo.
    const code = getCode(text);
    if (code == null) {return;}

    // Find the answer if it exists.
    const answer = compute(code, 10);
    props.navigation.navigate('Answer', {answer: answer});

  };

  const renderCamera = () => {

    // Show a loading screen, whilst we prompt the user for camera permission.
    if (!props.active || permission !== "authorized" || device == null) {
      return (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.text}>Take Photo</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <Camera style={[styles.camera, {width: width, height: height}]} device={device} ref={camera} isActive={true} photo={true} enableZoomGesture={true}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Text style={styles.text}>Take Photo</Text>
          </TouchableOpacity>
        </View>
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

export {CameraScreen};