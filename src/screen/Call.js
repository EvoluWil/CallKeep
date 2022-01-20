import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {acceptUrl, declineUrl} from '../general/url';
import BackgroundTimer from 'react-native-background-timer';
import {findUser, secondsToTime} from '../general/helper';
import styles from '../style/Call.style';
import {CallContext, UserContext} from '../context';
import RNCallKeep from 'react-native-callkeep';
import {Loading} from '../component';

const Call = ({route, navigation}) => {
  const {callUUID} = route.params;
  const {width} = useWindowDimensions();
  const {setCall, removeCall, calls} = useContext(CallContext);
  const {users} = useContext(UserContext);
  const [seconds, setSeconds] = useState(0);
  const [intervalID, setIntervalID] = useState();
  const [end, setEnd] = useState(false);
  const [reject, setReject] = useState(false);
  const [user, setUser] = useState();
  const isCall = calls.length > 0;

  const endAllCalls = () => RNCallKeep.endAllCalls();

  const startTimer = () => {
    const id = BackgroundTimer.setInterval(
      () => setSeconds(_seconds => _seconds + 1),
      1000,
    );
    setIntervalID(id);
  };

  const handleEnd = () => {
    removeCall();
    BackgroundTimer.clearInterval(intervalID);
    setEnd(true);
    BackgroundTimer.setTimeout(() => {
      navigation.goBack();
    }, 2000);
    endAllCalls();
  };

  const handleReject = () => {
    setReject(true);
    BackgroundTimer.setTimeout(() => {
      navigation.goBack();
    }, 1500);
  };

  const handleAccept = () => {
    setCall(user.login.uuid);
    RNCallKeep.startCall(callUUID, user.phone, user.phone, 'number', false);
  };

  useEffect(() => {
    if (isCall) {
      startTimer();
    }
  }, [isCall]);

  useEffect(() => {
    const _user = findUser(callUUID, users);
    setUser(_user);
  }, []);

  if (!user) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={{width: width * 0.6, height: width * 0.6, borderRadius: 20}}
          source={{uri: user.picture.large}}
        />
      </View>

      <View style={styles.nameContainer}>
        <Text style={styles.name}>
          {user.name.first} {user.name.last}
        </Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.timer}>
        {(end || reject) && (
          <Text style={styles.timerText}>
            {end ? 'Call Ended' : 'Call Rejected'}
          </Text>
        )}
        <Text style={styles.timerText}>
          {!isCall ? '' : secondsToTime(seconds)}
        </Text>
      </View>

      {!end && !reject && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={isCall ? handleEnd : handleReject}>
            <Image
              style={styles.buttonLogo}
              source={{
                uri: declineUrl,
              }}
            />
            {!isCall && <Text style={styles.buttonText}>{'Decline'}</Text>}
          </TouchableOpacity>
          {!isCall && (
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={handleAccept}>
              <Image
                style={styles.buttonLogo}
                source={{
                  uri: acceptUrl,
                }}
              />
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};
export default Call;
