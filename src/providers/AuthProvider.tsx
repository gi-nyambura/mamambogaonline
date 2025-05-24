
"use client";

import type { User as FirebaseUser } from 'firebase/auth';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, DocumentData } from 'firebase/firestore';

interface UserProfile extends FirebaseUser {
  // Add any custom user profile fields you store in Firestore
  firstName?: string;
  lastName?: string;
  role?: 'buyer' | 'seller';
  phone?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  loadingAuthState: boolean;
  isAdmin: boolean; // Example, can be expanded
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loadingAuthState, setLoadingAuthState] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false); // Example admin state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in, fetch additional profile data from Firestore
        const userDocRef = doc(db, "users", firebaseUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data() as DocumentData;
          setUser({
            ...firebaseUser,
            firstName: userData.firstName,
            lastName: userData.lastName,
            role: userData.role,
            phone: userData.phone,
          });
          // Example: Check if user is admin based on role or a specific field
          // setIsAdmin(userData.role === 'admin');
        } else {
          // Should not happen if user data is created on signup
          setUser(firebaseUser as UserProfile); 
        }
      } else {
        // User is signed out
        setUser(null);
        setIsAdmin(false);
      }
      setLoadingAuthState(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loadingAuthState, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
