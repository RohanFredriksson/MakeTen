import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Dimensions, Animated, Easing } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { getStyles } from './../styles/styles';
import { getTheme } from './../styles/themes';

const CELL_COUNT = 4;

const styles = getStyles();
const theme = getTheme('dark');

const NumberField = ({ callback }) => {

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const fieldStyles = StyleSheet.create({
    codeFiledRoot: {
      marginTop: 0.02369668246 * height,
      width: 0.3317535545 * height,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    cellRoot: {
      width: 0.07109004739 * height,
      height: 0.07109004739 * height,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.surface,
      borderRadius: 0.01184834123 * height,
    },
    cellText: {
      color: '#000',
      fontSize: 0.04265402843 * height,
      textAlign: 'center',
    },
    focusCell: {
      backgroundColor: theme.primary,
    },
  });

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
      <Animated.View style={{opacity: opacity}}><Text style={[styles.paragraph, {textAlign: 'center', color: theme.paragraph, paddingVertical: 0.04739336492 * height}]}>Please enter a four digit code</Text></Animated.View>
      <TouchableHighlight
        style={[{width: 0.3317535545 * height, height: 0.07109004739 * height, backgroundColor: theme.primary, borderRadius: 0.01184834123 * height}]}
        underlayColor={theme.primary}
        onPress={enterValue}
      >
        <View style={styles.container}><Text style={[styles.paragraph, {color: theme.black}]}>Enter code</Text></View>
      </TouchableHighlight>
    </View>
  );

}

export {NumberField};