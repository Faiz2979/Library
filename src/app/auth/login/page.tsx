"use client"

import type React from "react"

import { loginWithGoogle } from "@/lib/auth/googleLogin"
import { login } from "@/lib/auth/login"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { token } = await login(email, password)
      localStorage.setItem("userToken", token)
      alert("Login berhasil!")
      router.push("/books")
    } catch (error: any) {
      alert(error.message)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      const {token} = await loginWithGoogle()
      localStorage.setItem("userToken", token)

      alert("Login dengan Google berhasil!")
      router.push("/books")
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4 bg-cover bg-center bg-[url('/images/auth-bg.png')]"
    >
      {/* Dark overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 to-gray-900/80 backdrop-blur-sm"></div>

      {/* Card container */}
      <div className="w-full max-w-md relative z-10 bg-gray-900/90 backdrop-blur-md border border-gray-800 rounded-xl shadow-2xl overflow-hidden">
        {/* Card header */}
        <div className="px-6 pt-8 pb-4">
          <h1 className="text-2xl font-bold text-center text-white mb-1">Welcome Back</h1>
          <p className="text-center text-sky-400 text-sm font-semibold">Sign in to your account to continue</p>
        </div>

        {/* Card content */}
        <div className="px-6 pb-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              {/* Email input */}
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-3 top-3 h-5 w-5 text-sky-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent text-white text-sm"
                  required
                />
              </div>

              {/* Password input */}
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-3 top-3 h-5 w-5 text-sky-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent text-white text-sm"
                  required
                />
              </div>
            </div>

            {/* Login button */}
            <button
              type="submit"
              className="w-full bg-sky-600 font-semibold hover:cursor-pointer hover:bg-sky-700 text-white py-2 px-4 rounded-md transition-colors duration-200 font-medium"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="absolute w-full h-px bg-gray-700"></div>
            <span className="relative px-2 bg-gray-900 text-sm text-sky-400">atau</span>
          </div>

          {/* Google login button */}
            <button
                onClick={handleGoogleLogin}
                className="w-full bg-white text-black border p-2 rounded flex hover:cursor-pointer items-center justify-center space-x-2"
                >
                <img src="/icons/Google/google-96.svg" alt="Google" className="w-5 h-5" />
                <span>Login dengan Google</span>
            </button>

            <Link href="/auth/register" className="text-sky-400 hover:underline underline-offset-2 decoration-sky-400">Didnt have an account? Register</Link>
        </div>
      </div>
    </div>
  )
}

