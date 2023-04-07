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
      fontFamily: 'Inter-Regular',
      textAlign: 'center', 
      paddingBottom: 10,
      paddingTop: 10,
    },
    text: {
      color: '#fff',
      fontSize: 36,
      fontFamily: 'Inter-Regular',
      textAlign: 'center',
    },
    primary: {
      backgroundColor: theme.primary,
    },
    secondary: {
      backgroundColor: theme.secondary,
    },
    background: {
      backgroundColor: theme.background,
    },
    surface: {
      backgroundColor: theme.surface,
    },
    error: {
      backgroundColor: theme.error,
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