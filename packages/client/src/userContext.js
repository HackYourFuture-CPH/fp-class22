import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  auth,
  db,
  logInWithEmailAndPassword,
  signInWithGoogle,
  registerWithEmailAndPassword,
  logout,
} from './firebase';
import { query, collection, getDocs, where } from 'firebase/firestore';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState('');
  const fetchUserName = useCallback(async () => {
    try {
      const q = query(collection(db, 'users'), where('uid', '==', user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      /* error */
    }
  }, [user?.uid]);
  useEffect(() => {
    if (user) {
      fetchUserName();
    }
    /* if (!user) navigate('/'); */
  }, [user, fetchUserName]);

  const fireBaseProviderValue = useMemo(
    () => ({
      user,
      db,
      name,
      loading,
      logInWithEmailAndPassword,
      signInWithGoogle,
      registerWithEmailAndPassword,
      logout,
    }),
    [user, name, loading],
  );

  return (
    <UserContext.Provider value={fireBaseProviderValue}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const value = useContext(UserContext);
  if (!value) {
    throw new Error('Did you forget to put this under UserProvider');
  }
  return value;
}

UserProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
