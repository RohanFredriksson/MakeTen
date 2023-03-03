import React from 'react'
import { View, Dimensions } from 'react-native'
import { ScreenCornerRadius } from "react-native-screen-corner-radius"

export default class Screen extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <View 
        style={{
          width: Dimensions.get('window').width, 
          height: Dimensions.get('window').height, 
          borderRadius: ScreenCornerRadius,
        }}
      >
        {this.props.children}
      </View>
    );

  }

}

export {Screen};