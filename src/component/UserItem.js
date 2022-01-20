import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import styles from '../style/UserItem.style';

const UserItem = ({item, displayIncomingCall}) => {
  const {phone, name, picture, login} = item;
  const handleItem = () => {
    displayIncomingCall(login.uuid, phone);
  };
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.85}
      onPress={handleItem}>
      <Image style={styles.logo} source={{uri: picture.thumbnail}} />
      <View style={styles.nameContainer}>
        <Text style={styles.name}>
          {name.first} {name.last}
        </Text>
        <Text>{phone}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default UserItem;
