"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import LoaderSpinner from "@/components/loader/LoaderSpinner";

const AuthContext = createContext<{
  user: User | null;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}>({
  user: null,
  loading: true,
  setLoading: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsub;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setLoading }}>
      {children}
      {loading && <LoaderSpinner loading={loading} />}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
