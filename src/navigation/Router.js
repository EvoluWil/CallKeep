import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Call, Contact} from '../screen';

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Contact"
        screenOptions={{gestureEnabled: false}}>
        <Stack.Screen name="Contact" component={Contact} />
        <Stack.Screen
          name="Call"
          component={Call}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Router;
