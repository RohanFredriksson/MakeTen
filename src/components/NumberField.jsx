import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Animated, Easing } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { getStyles } from './../styles/styles';
import { getTheme } from './../styles/themes';

const CELL_COUNT = 4;

const styles = getStyles();
const theme = getTheme('dark');

const fieldStyles = StyleSheet.create({
  codeFiledRoot: {
    marginTop: 20,
    width: 280,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cellRoot: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.surface,
    borderRadius: 10,
  },
  cellText: {
    color: '#000',
    fontSize: 36,
    textAlign: 'center',
  },
  focusCell: {
    backgroundColor: theme.primary,
  },
});

const NumberField = ({ callback }) => {

  const [value, setValue] = useState('');
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({value, setValue});
  const opacity = useRef(new Animated.Value(0.0)).current;
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});

  function updateValue(value) {
    value = value.replace(/[^0-9]/g, '');
    setValue(value);
  }

  function enterValue() {
    if (value.length == CELL_COUNT) {
      callback(value);
      setValue('');
    } else {
      Animated.timing(opacity, {
        toValue: 1.0, 
        duration: 200, 
        useNativeDriver: true, 
        easing: Easing.linear}
      ).start();
    }
  }

  return (
    <View>
      <CodeField
        ref={ref}
        {...props}
        caretHidden={true}
        value={value}
        onChangeText={updateValue}
        cellCount={CELL_COUNT}
        rootStyle={fieldStyles.codeFiledRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <View
            // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
            onLayout={getCellOnLayoutHandler(index)}
            key={index}
            style={[fieldStyles.cellRoot, isFocused && fieldStyles.focusCell]}>
            <Text style={fieldStyles.cellText}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
      <Animated.View style={{opacity: opacity}}><Text style={[styles.paragraph, {textAlign: 'center', color: theme.paragraph, paddingVertical: 40}]}>Please enter a four digit code</Text></Animated.View>
      <TouchableHighlight
        style={[{width: 280, height: 60, backgroundColor: theme.primary, borderRadius: 10}]}
        underlayColor={theme.primary}
        onPress={enterValue}
      >
        <View style={styles.container}><Text style={styles.paragraph}>Enter code</Text></View>
      </TouchableHighlight>
    </View>
  );

}

export {NumberField};