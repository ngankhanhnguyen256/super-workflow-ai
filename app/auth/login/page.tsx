"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Login failed");
      }

      // ✅ FIX: KHÔNG dùng localStorage nữa
      // token đã được set bằng HttpOnly cookie từ backend

      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md p-6 rounded-xl border border-[#333] bg-[#111]">
        
        <h1 className="text-2xl font-bold text-center mb-6">
          AI Workflow Login
        </h1>

        <input
          className="w-full mb-3 p-3 rounded bg-black border border-[#333]"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full mb-3 p-3 rounded bg-black border border-[#333]"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <div className="text-red-400 text-sm mb-3">
            {error}
          </div>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-500 py-3 rounded font-semibold transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="text-xs text-gray-500 mt-4 text-center">
          demo: admin@ai.com / 123456
        </div>
      </div>
    </div>
  );
}
