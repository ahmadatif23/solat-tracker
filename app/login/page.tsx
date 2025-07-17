"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

export default function LoginPage() {
  const { user, loading, setLoading } = useAuth();

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  // 🔁 Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      router.replace("/");
    }
  }, [user, loading, router]);

  // ⏳ Block rendering during redirect or auth check
  if (user) return null;

  const login = async () => {
    setError("");

    if (!email || !pass) {
      setError("Email and password are required.");
      return;
    }

    try {
      setLoading(true);
      const res = await signInWithEmailAndPassword(auth, email, pass);
      const token = await res.user.getIdToken();

      await fetch("/api/set-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      router.push("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mx-auto h-24 w-auto relative">
          <Image
            src="/icon.png"
            alt="Your Company"
            width={900}
            height={900}
            priority
            className="mx-auto h-24 w-auto"
          />
        </div>

        <h2 className="mt-2 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="card">
          <form action="#" method="POST" className="space-y-2">
            <div>
              <label htmlFor="email" className="form-label">
                Email address
              </label>

              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  required
                  autoComplete="email"
                  className="form"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="form-label">
                Password
              </label>

              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={pass}
                  required
                  autoComplete="current-password"
                  className="form"
                  onChange={(e) => setPass(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-6 relative">
              {error && (
                <div className="absolute inset-0 translate-y-full">
                  <p className="text-sm text-red-500 mt-1">{error}</p>
                </div>
              )}

              <button
                type="button"
                className="btn-primary w-full"
                onClick={login}
              >
                Sign in
              </button>
            </div>
          </form>

          <div>
            <p className="mt-10 text-center text-sm/6 text-gray-500">
              Not a member?{" "}
              <a
                href="/register"
                className="font-semibold text-primary hover:text-light"
              >
                Create an account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
