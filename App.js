import React from 'react';
import { SafeAreaView } from "react-native";
import {Router} from './src/navigation';
import MainContextProvider from "./src/context/MainContext";

const App = () => {
  return (
    <MainContextProvider>
      <SafeAreaView style={{flex:1}}>
        <Router />
      </SafeAreaView>
    </MainContextProvider>
  );
};
export default App;
