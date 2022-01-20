import React, {useCallback, useContext, useEffect} from 'react';
import {FlatList, View} from 'react-native';
import {Loading, UserItem} from './index';
import styles from '../style/UserList.style';
import {UserContext} from '../context';

const UserList = ({displayIncomingCall}) => {
  const {getUsers, loading, users} = useContext(UserContext);
  const renderItem = ({item}) => (
    <UserItem item={item} displayIncomingCall={displayIncomingCall} />
  );
  const keyExtractor = useCallback(item => item.phone, []);
  const ItemSeparatorComponent = useCallback(
    () => <View style={styles.itemSeparator} />,
    [],
  );
  const getItemLayout = useCallback(
    (data, index) => ({
      length: 51,
      offset: 51 * index,
      index,
    }),
    [],
  );

  useEffect(() => {
    getUsers();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <FlatList
      data={users}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.contentContainerStyle}
      ItemSeparatorComponent={ItemSeparatorComponent}
      getItemLayout={getItemLayout}
    />
  );
};
export default UserList;
