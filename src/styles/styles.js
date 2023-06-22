import { StyleSheet } from 'react-native';

function getStyles() {

  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      fontSize: 36,
      fontFamily: 'Inter-Regular',
    },
    paragraph: {
      fontSize: 18,
      fontFamily: 'Inter-Regular',
    },
    camera: {
      flex: 1,
    },
    status: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold',
      fontFamily: 'Inter-Regular',
      position: 'absolute',
      bottom: 32,
      left: 32,
    },
  });

}

export { getStyles };