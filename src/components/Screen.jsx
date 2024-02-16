import React from 'react'
import { View, Dimensions, Platform } from 'react-native'
//import { ScreenCornerRadius } from "react-native-screen-corner-radius"

const ScreenCornerRadius = 0;

import { getStyles } from './../styles/styles';
const styles = getStyles();

export default class Screen extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;

    const children = React.Children.toArray(this.props.children).map((child) => {
      return React.cloneElement(child, {active: ('active' in this.props ? this.props.active : false), left: this.props.left, right: this.props.right});
    });

    // If we need to change the positioning of elements.
    let top = 0;

    // Pixel Tablet has a bar at the bottom that blocks.
    if (Platform.OS === 'android' && height / width  < 1.6) {top = -60;}

    return (
      <View 
        style={[styles.shadow, {
          width: width, 
          height: height,
          borderRadius: ScreenCornerRadius,
          top: top
        }]}
      >
        <View style={{width: '100%', height: '100%', borderRadius: ScreenCornerRadius, overflow: 'hidden',}}>
          {children}
        </View>
      </View>
    );

  }

}

export {Screen};