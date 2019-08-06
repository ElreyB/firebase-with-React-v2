import React, { useState, useEffect, createContext } from 'react';
import { auth, createUserProfileDocument } from '../firebase';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  useEffect(() => {
    const unlisten = auth.onAuthStateChanged(async user => {
      if (user) {
        const userRef = await createUserProfileDocument(user, {});
        userRef.onSnapshot(snapshot => {
          console.warn(snapshot.data(), snapshot.id);
          setUser({ uid: snapshot.id, ...snapshot.data() });
        });
      }
    });
    return () => {
      unlisten();
    };
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;
