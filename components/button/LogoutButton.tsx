"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export const LogoutButton = () => {
  const { setLoading } = useAuth();
  const router = useRouter();

  const logout = async () => {
    setLoading(true);

    await signOut(auth); // 1. Firebase sign out

    await fetch("/api/logout", { method: "POST" }); // 2. Destroy session

    router.push("/login"); // 3. Redirect

    setLoading(false); // 4. Reset loading state
  };

  return (
    <button onClick={logout} className="btn-secondary">
      Sign Out
    </button>
  );
};
