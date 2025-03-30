"use client";

import { auth } from "@/firebase/client";
import {
  GoogleAuthProvider,
  ParsedToken,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { removeToken, setToken } from "./actions";

type AuthContextType = {
  currentUser: User | null;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  customClaims: ParsedToken | null;
  loginWithEmailAndPassword: (email: string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [customClaims, setCustomClaims] = useState<ParsedToken | null>(null);

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user ?? null);

      if (user) {
        const tokenResult = await user.getIdTokenResult();
        const token = tokenResult.token;
        const refreshToken = user.refreshToken;

        const claims = tokenResult.claims;
        setCustomClaims(claims ?? null);

        if (token && refreshToken) {
          await setToken({ token, refreshToken });
        }
      } else {
        await removeToken();
      }
    });
    return () => unsubcribe();
  }, []);

  const logout = async () => {
    await auth.signOut();
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const loginWithEmailAndPassword = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        logout,
        loginWithGoogle,
        customClaims,
        loginWithEmailAndPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
