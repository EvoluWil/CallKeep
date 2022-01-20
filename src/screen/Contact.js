import React, {useLayoutEffect, useState, useEffect, useContext} from 'react';
import {Platform, Text, TouchableOpacity, View} from 'react-native';
import RNCallKeep from 'react-native-callkeep';
import BackgroundTimer from 'react-native-background-timer';
import {UserList} from '../component';
import styles from '../style/Contact.style';
import {CallContext} from '../context';

BackgroundTimer.start();

RNCallKeep.setup({
  ios: {
    appName: 'CallKeep',
  },
  android: {
    alertTitle: 'Permissions required',
    alertDescription: 'This application needs to access your phone accounts',
    cancelButton: 'Cancel',
    okButton: 'ok',
  },
});

const isIOS = Platform.OS === 'ios';

const Contact = ({navigation}) => {
  const [isCustom, setIsCustom] = useState(true);
  const {setCall} = useContext(CallContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        isIOS && (
          <TouchableOpacity onPress={handleSwitch}>
            <Text>Switch({isCustom ? 'C' : 'N'})</Text>
          </TouchableOpacity>
        ),
    });
  }, [navigation, isCustom]);

  const handleSwitch = () => {
    setIsCustom(!isCustom);
  };

  const displayIncomingCall = (callUUID, number) => {
    if (isCustom) {
      navigation.navigate('Call', {callUUID});
    } else {
      BackgroundTimer.setTimeout(() => {
        RNCallKeep.displayIncomingCall(
          callUUID,
          number,
          number,
          'number',
          false,
        );
      }, 3000);
    }
  };

  const answerCall = async ({callUUID}) => {
    setCall(callUUID);
    navigation.navigate('Call', {callUUID});
  };

  useEffect(() => {
    RNCallKeep.addEventListener('answerCall', answerCall);
    return () => {
      RNCallKeep.removeEventListener('answerCall', answerCall);
    };
  }, []);
  return (
    <View style={styles.container}>
      <UserList displayIncomingCall={displayIncomingCall} />
    </View>
  );
};
export default Contact;
