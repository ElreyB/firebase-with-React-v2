import React, { useState, useEffect, createContext } from 'react';
import { auth, createUserProfileDocument } from '../firebase';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(auth.currentUser);
  useEffect(() => {
    const unlisten = auth.onAuthStateChanged(async user => {
      if (user) {
        const authUser = await createUserProfileDocument(user, {});
        setUser(authUser);
      }
    });
    return () => {
      unlisten();
    };
  }, []);

  return (
    <UserContext.Provider value={user ? user : null}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
