import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getItem } from 'utils/helperFuncs';

const AuthContext = createContext({ user: null, setUser: () => {} });

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const persistedUser = getItem('user');

    if (persistedUser) {
      setUser(persistedUser);
    } else {
      setUser(null);
    }
  }, []);

  const value = useMemo(() => ({ user, setUser }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
