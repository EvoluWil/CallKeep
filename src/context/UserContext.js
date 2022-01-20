import React, {createContext, useState} from 'react';
import axios from 'axios';
import {usersUrl} from '../general/url';

const UserContext = createContext();
export {UserContext};

const UserContextProvider = ({children}) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    setLoading(true);
    const {
      data: {results},
    } = await axios.get(usersUrl);
    setUsers(results);
    setLoading(false);
  };

  const value = {
    users,
    getUsers,
    loading,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
export default UserContextProvider;
