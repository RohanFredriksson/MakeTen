import { StyleSheet } from 'react-native';

function getStyles() {

  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 36,
      fontFamily: 'Inter-Regular',
    },
    header: {
      fontSize: 24,
      fontFamily: 'Inter-Regular',
    },
    paragraph: {
      fontSize: 18,
      fontFamily: 'Inter-Regular',
    },
  });

}

export { getStyles };