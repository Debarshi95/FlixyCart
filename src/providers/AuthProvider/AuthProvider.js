import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getItem } from '../../utils/helperFuncs';

const AuthContext = createContext({ user: null });

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const persistedData = getItem('user');
    if (persistedData) {
      setUser(persistedData);
    } else {
      setUser(null);
    }
  }, []);

  const value = useMemo(() => ({ user }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
