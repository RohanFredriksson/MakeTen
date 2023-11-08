import React from 'react'
import { View, Dimensions } from 'react-native'
import { ScreenCornerRadius } from "react-native-screen-corner-radius"

import { getStyles } from './../styles/styles';
const styles = getStyles();

export default class Screen extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const children = React.Children.toArray(this.props.children).map((child) => {
      return React.cloneElement(child, {active: ('active' in this.props ? this.props.active : false), left: this.props.left, right: this.props.right});
    });

    return (
      <View 
        style={[styles.shadow, {
          width: Dimensions.get('window').width, 
          height: Dimensions.get('window').height, 
          borderRadius: ScreenCornerRadius,
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