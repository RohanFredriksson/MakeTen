import React from 'react'
import { View, Animated, Dimensions, Easing } from 'react-native'
import { PanGestureHandler, State } from 'react-native-gesture-handler';

export default class Stack extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      current: null, 
      bottom: null,
      left: null,
      right: null,
      lock: false,
      dictionary: {}, 
      translate: new Animated.Value(0)
    }

    const children = React.Children.toArray(this.props.children);
    if (this.state.current == null && children.length > 0) {
      this.state.current = children[0];
    }
    
    children.forEach((child) => {
      this.state.dictionary[child.props.id] = child;
    });

  }

  change = (left, next, duration) => {
    this.state.lock = true;
    Animated.timing(this.state.translate, {
      toValue: Dimensions.get('window').width * (left ? 1 : -1),
      duration: duration,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start(() => {
      this.state.current = next;
      this.state.left = null;
      this.state.right = null;
      this.state.bottom = null;
      this.state.lock = false;
      this.state.translate.setValue(0);
      this.forceUpdate();
    });
  }

  bounce = () => {
    Animated.spring(this.state.translate, {
      toValue: 0,
      useNativeDriver: false
    }).start();
  }

  move = async (left, to) => {

    if (this.state.lock) {return;}

    var next;
    const current = this.state.current;
    const dictionary = this.state.dictionary;

    if (to != null && !(to in dictionary)) {return;}
    if (to != null) {next = dictionary[to];}
    else if (left && !('left' in current.props)) {return;}
    else if (!left && !('right' in current.props)) {return;}
    else {next = dictionary[left ? current.props.left : current.props.right];}

    this.state.bottom = null; if (next.props.zIndex < current.props.zIndex) {this.state.bottom = next;}
    this.state.left   = null; if (left && next.props.zIndex >= current.props.zIndex) {this.state.left = next;} 
    this.state.right  = null; if (!left && next.props.zIndex >= current.props.zIndex) {this.state.right = next;}
    this.forceUpdate();

    if (!('check' in next.props) || await next.props.check()) {this.change(left, next, 300);}
    else {this.bounce();}

  }

  left = async (to=null) => {
    this.move(true, to);
  }

  right = async (to=null) => {
    this.move(false, to);
  }

  onGestureEvent = (event) => {

    // Alias some variables for readability
    const current = this.state.current;
    const dictionary = this.state.dictionary;

    // See if we can move the screen, and how much if we can.
    const { translationX } = event.nativeEvent;
    if (!('left'  in current.props) && translationX > 0) {return;}
    if (!('right' in current.props) && translationX < 0) {return;}
    if (translationX == 0) {return;}
    if (this.state.lock) {return;}
    
    // Set the next screen state.
    const next = (translationX > 0 ? dictionary[current.props.left] : dictionary[current.props.right]);
    this.state.bottom = null; if (next.props.zIndex < current.props.zIndex) {this.state.bottom = next;}
    this.state.left = null; if (translationX > 0 && next.props.zIndex >= current.props.zIndex) {this.state.left = next;}
    this.state.right = null; if (translationX < 0 && next.props.zIndex >= current.props.zIndex) {this.state.right = next;}
  
    // Move the screen.
    this.forceUpdate();
    this.state.translate.setValue(translationX);

  }
  
  onHandlerStateChange = async (event) => {

    // If the user ends the gesture, determine if we can move.
    if (event.nativeEvent.state === State.END) {

      if (this.state.lock) {return;}

      if (event.nativeEvent.translationX > Dimensions.get('window').width / 4 && ('left' in this.state.current.props)) {
        const next = (this.state.left == null ? this.state.bottom : this.state.left);
        if (!('check' in next.props) || await next.props.check()) {this.change(true, next, 200);}
        else {this.bounce();}
        return;
      } 

      if (event.nativeEvent.translationX < -Dimensions.get('window').width / 4 && ('right' in this.state.current.props)) {
        const next = (this.state.right == null ? this.state.bottom : this.state.right);
        if (!('check' in next.props) || await next.props.check()) {this.change(false, next, 200);}
        else {this.bounce();}
        return;
      } 
      
      this.bounce();
      
    }
  
  }

  render() {

    const left = (this.state.left != null ? React.cloneElement(this.state.left, {active: false, left: this.left, right: this.right}) : null);
    const right = (this.state.right != null ? React.cloneElement(this.state.right, {active: false, left: this.left, right: this.right}) : null);
    const bottom = (this.state.bottom != null ? React.cloneElement(this.state.bottom, {active: false, left: this.left, right: this.right}) : null);
    const current = (this.state.current != null ? React.cloneElement(this.state.current, {active: true, left: this.left, right: this.right}) : null); 

    if (this.state.left != null || this.state.right != null) {

      return (
        <PanGestureHandler
          onGestureEvent={(event) => {if (this.state.current != null) {this.onGestureEvent(event);}}}
          onHandlerStateChange={(event) => {if (this.state.current != null) {this.onHandlerStateChange(event);}}}
        >
          <View>
            <Animated.View style={{position: 'absolute', zIndex: 2, elevation: 2, transform: [{ translateX: this.state.translate }], left: -Dimensions.get('window').width}}>{left}</Animated.View>
            <Animated.View style={{position: 'absolute', zIndex: 2, elevation: 2, transform: [{ translateX: this.state.translate }], left: Dimensions.get('window').width}}>{right}</Animated.View>
            <Animated.View style={{position: 'absolute', zIndex: 1, elevation: 1}}>{current}</Animated.View>
            <View style={{position: 'absolute', zIndex: 0, elevation: 0}}>{bottom}</View>
          </View>
        </PanGestureHandler>
      );

    }

    else {

      return (
        <PanGestureHandler
          onGestureEvent={(event) => {if (this.state.current != null) {this.onGestureEvent(event);}}}
          onHandlerStateChange={(event) => {if (this.state.current != null) {this.onHandlerStateChange(event);}}}
        >
          <View>
            <Animated.View style={{position: 'absolute', zIndex: 2, elevation: 2, transform: [{ translateX: this.state.translate }], left: -Dimensions.get('window').width}}>{left}</Animated.View>
            <Animated.View style={{position: 'absolute', zIndex: 2, elevation: 2, transform: [{ translateX: this.state.translate }], left: Dimensions.get('window').width}}>{right}</Animated.View>
            <Animated.View style={{position: 'absolute', zIndex: 1, elevation: 1, transform: [{ translateX: this.state.translate }]}}>{current}</Animated.View>
            <View style={{position: 'absolute', zIndex: 0, elevation: 0}}>{bottom}</View>
          </View>
        </PanGestureHandler>
      );

    }
    
  }

}

export {Stack};