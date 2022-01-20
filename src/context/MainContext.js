import React from 'react';
import UserContextProvider from './UserContext';
import CallContextProvider from './CallContext';

const MainContextProvider = ({children}) => (
  <UserContextProvider>
    <CallContextProvider>{children}</CallContextProvider>
  </UserContextProvider>
);
export default MainContextProvider;
