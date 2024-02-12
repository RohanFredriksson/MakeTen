import { StyleSheet, Dimensions } from 'react-native';

function getStyles() {

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    shadow: {
      shadowColor: 'black',
      shadowOffset: { width: 2, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 4
    },
    title: {
      fontSize: 0.04265402843 * height,
      fontFamily: 'Inter-Regular',
    },
    header: {
      fontSize: 0.02843601895 * height,
      fontFamily: 'Inter-Regular',
    },
    paragraph: {
      fontSize: 0.02132701421 * height,
      fontFamily: 'Inter-Regular',
    },
  });

}

export { getStyles };