"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  multiFactor,
  PhoneAuthProvider,
  PhoneInfoOptions,
  PhoneMultiFactorGenerator,
} from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { User, UserCredential } from "firebase/auth";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<UserCredential>;
  signup: (email: string, password: string) => Promise<User>;
  signInWithGoogle: () => Promise<UserCredential>;
  enable2FA: (phoneNumber: string | PhoneInfoOptions) => Promise<string>;
  verify2FACode: (verificationId: string, code: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<import("firebase/auth").User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // ✅ Sign Up with Email & Password
  async function signup(email: string, password: string) {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    await sendEmailVerification(userCredential.user); // Send verification email
    return userCredential.user;
  }

  // ✅ Sign In with Email & Password
  async function login(email: string, password: string) {
    return await signInWithEmailAndPassword(auth, email, password);
  }

  // ✅ Sign In with Google
  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider);
  }

  // ✅ Two-Factor Authentication (2FA)
  async function enable2FA(phoneNumber: string | PhoneInfoOptions) {
    const user = auth.currentUser;
    if (!user) throw new Error("No authenticated user found");
    const session = await multiFactor(user).getSession();
    const phoneAuthProvider = new PhoneAuthProvider(auth);
    const verificationId = await phoneAuthProvider.verifyPhoneNumber(
      phoneNumber,
      recaptchaVerifier(),
    );
    return verificationId;
  }

  // ✅ Verify 2FA Code
  async function verify2FACode(verificationId: string, code: string) {
    const user = auth.currentUser;
    if (!user) throw new Error("No authenticated user found");
    const phoneAuthCredential = PhoneAuthProvider.credential(
      verificationId,
      code,
    );
    const multiFactorAssertion =
      PhoneMultiFactorGenerator.assertion(phoneAuthCredential);
    await multiFactor(user).enroll(multiFactorAssertion, "My 2FA Device");
  }

  // ✅ Sign Out
  function logout() {
    return signOut(auth);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        signInWithGoogle,
        enable2FA,
        verify2FACode,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

function recaptchaVerifier():
  | import("@firebase/auth").ApplicationVerifier
  | undefined {
  throw new Error("Function not implemented.");
}
// Compare this snippet from src/app/auth/sign-up/page.tsx:
