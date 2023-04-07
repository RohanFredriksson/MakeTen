import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { getTheme } from './../styles/themes';

const BRICK_WIDTH = 100;
const BRICK_HEIGHT = 50;
const BRICK_GAP = 5;

const BrickRow = ({even}) => {

  const n = Math.ceil(Dimensions.get('window').width / (BRICK_WIDTH + BRICK_GAP)) + 1

  if (even) {
    return (
      <View style={{flexDirection: 'row'}}>
        {Array.from({ length: n }, (v, i) => (
          <View key={i} style={[styles.brick]}/>
        ))}
      </View>
    );
  }

  return (
    <View style={{flexDirection: 'row', left: (BRICK_WIDTH + BRICK_GAP) / 2}}>
      {Array.from({ length: n }, (v, i) => (
        <View key={i} style={[styles.brick]}/>
      ))}
    </View>
  );

}

const BrickBackground = () => {

  const n = Math.ceil(Dimensions.get('window').height / (BRICK_HEIGHT + BRICK_GAP)) + 1

  return (
    <View style={styles.background}>
      {Array.from({ length: n }, (v, i) => (
        (i % 2 == 0 ? <BrickRow key={i} even={true}/> : <BrickRow key={i} even={false}/>)
      ))}
    </View>
  );

}

const theme = getTheme('light');

const styles = StyleSheet.create({
  background: {
    flexDirection: 'column', 
    alignItems: 'flex-start',
    backgroundColor: theme.background,
  },
  brick: {
    width: BRICK_WIDTH,
    height: BRICK_HEIGHT,
    margin: BRICK_GAP / 2,
    backgroundColor: theme.surface,
  },
});


export {BrickBackground};