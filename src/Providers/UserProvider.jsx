import React, { useState, useEffect, createContext } from 'react';
import { auth, createUserProfileDocument } from '../firebase';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState();
  useEffect(() => {
    const unlisten = auth.onAuthStateChanged(authUser => {
      authUser ? setAuthUser(authUser) : setAuthUser(null);
    });
    return () => {
      unlisten();
    };
  });

  return (
    <UserContext.Provider value={authUser}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
