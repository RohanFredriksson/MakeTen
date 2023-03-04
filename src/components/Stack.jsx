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

  onGestureEvent = (event) => {

    // Alias some variables for readability
    const current = this.state.current;
    const dictionary = this.state.dictionary;

    // See if we can move the screen, and how much if we can.
    const { translationX } = event.nativeEvent;
    if (!('left'  in current.props) && translationX > 0) {return;}
    if (!('right' in current.props) && translationX < 0) {return;}
    if (this.state.lock) {return;}
    
    // Set the next screen state.
    if (translationX > 0) {

      const left = dictionary[current.props.left];
      if (left.props.zIndex < current.props.zIndex) {

        this.state.bottom = left;
        this.state.left = null;
        this.state.right = null;

      } else {

        this.state.bottom = null;
        this.state.left = left;
        this.state.right = null;

      }

    } else {

      const right = dictionary[current.props.right];
      if (right.props.zIndex < current.props.zIndex) {

        this.state.bottom = right;
        this.state.left = null;
        this.state.right = null;

      } else {

        this.state.bottom = null;
        this.state.left = null;
        this.state.right = right;
        
      }

    }
  
    // Move the screen.
    this.forceUpdate();
    this.state.translate.setValue(translationX);

  }
  
  onHandlerStateChange = async (event) => {

    // If the user ends the gesture, determine if we can move.
    if (event.nativeEvent.state === State.END) {

      // If a gesture resolution is already being executed, return.
      if (this.state.lock) {return;}
      
      // If the user moved far enough to the left.
      var success = event.nativeEvent.translationX > Dimensions.get('window').width / 4 && ('left' in this.state.current.props);
      if (success) {
  
        // If there is a check, run the check to see if we can navigate.
        if ('leftCheck' in this.state.current.props) {
          success = await this.state.current.props.leftCheck();
        }

        if (success) {

          this.state.lock = true;
          Animated.timing(this.state.translate, {
            toValue: Dimensions.get('window').width,
            duration: 200,
            useNativeDriver: false,
            easing: Easing.linear,
          }).start(() => {

            if (this.state.left != null) {this.state.current = this.state.left;} 
            else {this.state.current = this.state.bottom;}

            this.state.left = null;
            this.state.right = null;
            this.state.bottom = null;
            this.state.lock = false;

            this.state.translate.setValue(0);
            this.forceUpdate();

          });

        }

        else {
          Animated.spring(this.state.translate, {
            toValue: 0,
            useNativeDriver: false
          }).start();
        }

        return;
      } 

      // If the user moved far enough to the right.
      success = event.nativeEvent.translationX < -Dimensions.get('window').width / 4 && ('right' in this.state.current.props);
      if (success) {

        // If there is a check, run the check to see if we can navigate.
        if ('rightCheck' in this.state.current.props) {
          success = await this.state.current.props.rightCheck();
        }
  
        if (success) {

          this.state.lock = true;
          Animated.timing(this.state.translate, {
            toValue: -Dimensions.get('window').width,
            duration: 200,
            useNativeDriver: false,
            easing: Easing.linear,
          }).start(() => {

            if (this.state.right != null) {this.state.current = this.state.right;} 
            else {this.state.current = this.state.bottom;}

            this.state.left = null;
            this.state.right = null;
            this.state.bottom = null;
            this.state.lock = false;

            this.state.translate.setValue(0);
            this.forceUpdate();
            
          });

        }

        else {
          Animated.spring(this.state.translate, {
            toValue: 0,
            useNativeDriver: false
          }).start();
        }

        return;
      } 
      
      // Spring the screen back to its default location.
      if (!success) {
        Animated.spring(this.state.translate, {
          toValue: 0,
          useNativeDriver: false
        }).start();
      }

    }
  
  }

  render() {

    const left = (this.state.left != null ? React.cloneElement(this.state.left, {active: false}) : null);
    const right = (this.state.right != null ? React.cloneElement(this.state.right, {active: false}) : null);
    const bottom = (this.state.bottom != null ? React.cloneElement(this.state.bottom, {active: false}) : null);
    const current = (this.state.current != null ? React.cloneElement(this.state.current, {active: true}) : null); 

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