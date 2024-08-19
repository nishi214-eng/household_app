import React, { createContext, useState, useContext, useEffect } from "react";
import { auth } from "../infra/firebase";

const AuthContext = createContext(undefined);

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("認証情報を取得できない");
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const value = {
    user
  };

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => {
      unsubscribed();
    };
  }, []);

    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
}
