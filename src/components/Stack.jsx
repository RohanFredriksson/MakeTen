import React from 'react'
import { View, Animated, Dimensions } from 'react-native'
import { PanGestureHandler, State } from 'react-native-gesture-handler';

export default class Stack extends React.Component {

  constructor(props) {

    super(props);
    this.state = {current: null, next: null, dictionary: {}, translate: new Animated.Value(0)}
    
    if (this.state.current == null && this.props.children.length > 0) {
      this.state.current = this.props.children[0];
    }
    
    this.props.children.forEach((child) => {
      this.state.dictionary[child.props.id] = child;
    });
    
    if (this.state.current.props.right != null) {this.state.next = this.state.dictionary[this.state.current.props.right];}
    if (this.state.current.props.left != null) {this.state.next = this.state.dictionary[this.state.current.props.left];}

  }

  onGestureEvent = (event, screen) => {

    // See if we can move the screen, and how much if we can.
    const { translationX } = event.nativeEvent;
    if (!('left' in screen.props) && translationX > 0) {return;}
    if (!('right' in screen.props) && translationX < 0) {return;}
    
    // Set the next screen state.
    this.state.next = this.state.dictionary[screen.props.left];
    if (translationX < 0) {this.state.next = this.state.dictionary[screen.props.right];}
    this.forceUpdate();

    // Move the screen.
    this.state.translate.setValue(translationX);

  }
  
  onHandlerStateChange = async (event, screen) => {
  
    // If the user ends the gesture, determine if we can move.
    if (event.nativeEvent.state === State.END) {
      
      // If the user moved far enough to the left.
      var success = event.nativeEvent.translationX > Dimensions.get('window').width / 3 && ('left' in screen.props);
      if (success) {
  
        console.log("NAVIGATE LEFT");
        //setTimeout(() => {this.state.translate.setValue(0);}, 500);
        
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

    return (
      <PanGestureHandler
        onGestureEvent={(event) => {if (this.state.current != null) {this.onGestureEvent(event, this.state.current);}}}
        onHandlerStateChange={(event) => {if (this.state.current != null) {this.onHandlerStateChange(event, this.state.current);}}}
      >
        <View>
          <Animated.View style={{position: 'absolute', zIndex: 1, elevation: 1, transform: [{ translateX: this.state.translate }]}}>{this.state.current}</Animated.View>
          <View style={{position: 'absolute', zIndex: 0, elevation: 0}}>{this.state.next}</View>
        </View>
      </PanGestureHandler>
    );
    
  }

}

export {Stack};