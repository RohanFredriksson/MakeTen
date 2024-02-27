import React, { useState, useEffect, useRef } from 'react';
import { Image, View, Animated, Easing, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import TextRecognition from '@react-native-ml-kit/text-recognition';

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
  const [permission, setPermission] = useState('not-determined');
  const [animation, setAnimation] = useState(new Animated.Value(0));

  const borderStyle = {
    backgroundColor: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [theme.white, theme.primary],
    }),
  };

  const getPermission = async () => {
    const p = await Camera.requestCameraPermission();
    setPermission(p);
  }

  const uri = (path) => {
    if (!path.startsWith('file://')) {return `file://${path}`;}
    return path;
  }

  const scan = async () => {

    const p = await Camera.getCameraPermissionStatus();
    if (lock === true) {return;}
    if (props.active !== true) {return;}
    if (p !== 'granted') {return;}
    if (device === null) {return;}

    setLock(true);
    let photo = null; 
    
    try {photo = await camera.current.takePhoto({enableShutterSound: false});}
    catch {setLock(false); return;}

    const text = await TextRecognition.recognize(uri(photo.path));
    const code = getCode(text.text);

    if (code === null) {
      setLock(false);
      return;
    }

    Animated.timing(animation, {
      toValue: 1.0,
      duration: 500,
      useNativeDriver: false, 
      easing: Easing.linear
    }).start();
    await new Promise(resolve => setTimeout(resolve, 750));

    setLock(false);
    if (props.active !== true) {return;}

    const answer = compute(code);
    animation.setValue(0);
    props.navigation.navigate('Answer', {answer: answer});
    //setTimeout(props.right, 300);

  }

  const CameraNavigation = () => {
  
    return (
      <View style={{position: 'absolute', width: width, height: height, alignItems: 'center'}}>
        <View style={[styles.shadow, {backgroundColor: theme.background, paddingVertical: 0.017772511845 * height, paddingHorizontal: 0.03554502369 * height, borderRadius: 0.02369668246 * height, position: 'absolute', transform: [{translateY: 8.95 * 0.09478672985 * height}]}]}>
          <View style={[styles.container, {flexDirection: 'row', width: 0.3317535545 * height}]}>
            <Image source={require('./../assets/icons/camera.png')} width={0.04739336492 * height} height={0.04739336492 * height} style={{width: 0.04739336492 * height, height: 0.04739336492 * height, paddingHorizontal: 0.02369668246 * height, tintColor: theme.title}}/>
            <View style={{marginHorizontal: 0.02369668246 * height, backgroundColor: theme.paragraph, width: 2, height: 0.04739336492 * height}}/>
            <TouchableWithoutFeedback onPress={() => {props.right();}}><Image source={require('./../assets/icons/house-chimney.png')} width={0.04739336492 * height} height={0.04739336492 * height} style={{width: 0.04739336492 * height, height: 0.04739336492 * height, paddingHorizontal: 0.02369668246 * height, tintColor: theme.paragraph}}/></TouchableWithoutFeedback>
            <View style={{marginHorizontal: 0.02369668246 * height, backgroundColor: theme.paragraph, width: 2, height: 0.04739336492 * height}}/>
            <TouchableWithoutFeedback onPress={() => {props.right("settings");}}><Image source={require('./../assets/icons/settings.png')} width={0.04739336492 * height} height={0.04739336492 * height} style={{width: 0.04739336492 * height, height: 0.04739336492 * height, paddingHorizontal: 0.02369668246 * height, tintColor: theme.paragraph}}/></TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    )
  
  }

  const CameraBorder = () => {

    const length = Math.min(0.75 * width, 0.65 * height);
    const arm = Math.min(0.2 * width, 0.09 * height);
  
    return (
      <View style={{width: width, height: height, flex: 1}}>
        <View style={{position: 'absolute', top: (0.65 * height < 0.75 * width ? 0.4 : 0.5) * (height - length), left: 0.5 * (width - length)}}>
          <View style={{position: 'relative', width: length, height: length}}>
            <Animated.View style={[borderStyle, {position: 'absolute', top:    -5, left:  -5, width: 7.5, height: arm}]}></Animated.View>
            <Animated.View style={[borderStyle, {position: 'absolute', top:    -5, left:  -5, width: arm, height: 7.5}]}></Animated.View>
            <Animated.View style={[borderStyle, {position: 'absolute', top:    -5, right: -5, width: 7.5, height: arm}]}></Animated.View>
            <Animated.View style={[borderStyle, {position: 'absolute', top:    -5, right: -5, width: arm, height: 7.5}]}></Animated.View>
            <Animated.View style={[borderStyle, {position: 'absolute', bottom: -5, left:  -5, width: 7.5, height: arm}]}></Animated.View>
            <Animated.View style={[borderStyle, {position: 'absolute', bottom: -5, left:  -5, width: arm, height: 7.5}]}></Animated.View>
            <Animated.View style={[borderStyle, {position: 'absolute', bottom: -5, right: -5, width: 7.5, height: arm}]}></Animated.View>
            <Animated.View style={[borderStyle, {position: 'absolute', bottom: -5, right: -5, width: arm, height: 7.5}]}></Animated.View>
          </View>
        </View>
      </View>
    )
  
  }

  const loop = () => {
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
    if (code !== null) {return code[0].replace(/[^0-9]/g, '');}

    return null;

  };

  if (props.active !== true || permission !== 'granted' || device === null) {
    return (
      <View style={{width: width, height: height}}>
        <CameraBorder/>
        <CameraNavigation/>
      </View>
    )
  }

  return (
    <View style={{width: width, height: height}}>
      <Camera style={{width: width, height: height}} device={device} ref={camera} isActive={true} photo={true} enableZoomGesture={true}/>
      <View style={{top: -height, width: width, height: height}}>
        <CameraBorder/>
        <CameraNavigation/>
      </View>
    </View>
  );

}

export {CameraScreen};