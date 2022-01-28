import React, {useLayoutEffect, useState, useEffect, useContext} from 'react';
import {Platform, Text, TouchableOpacity, View} from 'react-native';
import VoipPushNotification from 'react-native-voip-push-notification';
import RNCallKeep from 'react-native-callkeep';
import BackgroundTimer from 'react-native-background-timer';
import {UserList} from '../component';
import styles from '../style/Contact.style';
import {CallContext} from '../context';
import {checkNotifications} from 'react-native-permissions';
import {requestNotifications} from 'react-native-permissions';

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

  const handleVoip = () => {
    // or anywhere which is most comfortable and appropriate for you
    //VoipPushNotification.requestPermissions(); // --- optional, you can use another library to request permissions
    VoipPushNotification.registerVoipToken(); // --- required

    VoipPushNotification.addEventListener('register', token => {
      console.log('VOIP Token: ', token);
      // --- send token to your apn provider server
    });

    VoipPushNotification.addEventListener('localNotification', notification => {
      console.warn('Local notification clicked ', notification);
      // --- when user click local push
    });

    VoipPushNotification.addEventListener('notification', notification => {
      console.warn('Notification received: ', notification);
      // --- when receive remote voip push, register your VoIP client, show local notification ... etc
      //this.doRegisterOrSomething();

      // --- This  is a boolean constant exported by this module
      // --- you can use this constant to distinguish the app is launched by VoIP push notification or not
      if (VoipPushNotification.wakeupByPush) {
        console.warn('waked up by VOIP');
        // this.doSomething()

        // --- remember to set this static variable back to false
        // --- since the constant are exported only at initialization time, and it will keep the same in the whole app
        VoipPushNotification.wakeupByPush = false;
      }

      /**
       * Local Notification Payload
       *
       * - `alertBody` : The message displayed in the notification alert.
       * - `alertAction` : The "action" displayed beneath an actionable notification. Defaults to "view";
       * - `soundName` : The sound played when the notification is fired (optional).
       * - `category`  : The category of this notification, required for actionable notifications (optional).
       * - `userInfo`  : An optional object containing additional notification data.
       */
      console.warn('Presenting local notification ');

      VoipPushNotification.presentLocalNotification({
        alertBody: 'hello! ' + notification.getMessage(),
      });
    });
  };

  useEffect(() => {
    RNCallKeep.addEventListener('answerCall', answerCall);
    requestNotifications(['alert', 'sound']).then(({status, settings}) => {});

    checkNotifications().then(({status, settings}) => {});
    handleVoip();

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
