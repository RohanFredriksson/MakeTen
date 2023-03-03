import React from 'react'
import { View, Dimensions } from 'react-native'
import { ScreenCornerRadius } from "react-native-screen-corner-radius"

export default class Screen extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const children = React.Children.toArray(this.props.children).map((child) => {
      if ('active' in this.props) {return React.cloneElement(child, {active: this.props.active});}
      return React.cloneElement(child, {active: false});
    });

    return (
      <View 
        style={{
          width: Dimensions.get('window').width, 
          height: Dimensions.get('window').height, 
          borderRadius: ScreenCornerRadius,
        }}
      >
        {children}
      </View>
    );

  }

}

export {Screen};