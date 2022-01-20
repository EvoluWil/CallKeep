import React, {createContext, useState} from 'react';

const CallContext = createContext();
export {CallContext};

const CallContextProvider = ({children}) => {
  const [calls, setCalls] = useState([]);

  const setCall = ({callUUID}) => {
    setCalls([...calls, callUUID]);
  };

  const removeCall = () => {
    setCalls([]);
  };

  const value = {
    calls,
    setCalls,
    setCall,
    removeCall,
  };
  return <CallContext.Provider value={value}>{children}</CallContext.Provider>;
};
export default CallContextProvider;
