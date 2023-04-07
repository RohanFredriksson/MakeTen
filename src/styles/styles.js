import { StyleSheet } from 'react-native';
import { getTheme } from './themes';

const getStyles = (name) => {

  const theme = getTheme(name);

  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    sign: {
      backgroundColor: theme.primary,
      color: theme.onPrimary,
      fontSize: 36,
      fontFamily: 'Inter-Light',
      textAlign: 'center', 
    },
    text: {
      color: '#fff',
      fontSize: 36,
      fontFamily: 'Inter-Light',
      textAlign: 'center',
    },
    camera: {
      flex: 1,
    },
    status: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold',
      fontFamily: 'Inter-Light',
      position: 'absolute',
      bottom: 32,
      left: 32,
    },
  });

}

export { getStyles };