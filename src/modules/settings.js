import { Settings, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

let spoilerStatus = false;
if (Platform.OS === 'ios') {spoilerStatus = Settings.get('spoiler');}
else {const routine = async () => {spoilerStatus = await AsyncStorage.getItem('spoiler') === 'true';}; routine();}

export const getSpoilerStatus = () => {
    return spoilerStatus;    
}

export const setSpoilerStatus = (status) => {

    spoilerStatus = status;

    if (Platform.OS === 'ios') {
        Settings.set({spoiler: status});
        return;
    }

    AsyncStorage.setItem('spoiler', '' + status);

}