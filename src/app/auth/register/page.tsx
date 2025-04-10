"use client"

import { loginWithGoogle } from "@/pages/api/auth/googleLogin"
import { register } from "@/pages/api/auth/register"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

const secret = process.env.NEXT_PUBLIC_JWT_SECRET!

export default function RegisterPage() {
  const [registeredEmail, setEmail] = useState("")
  const [registeredUsername, setUsername] = useState("")
  const [registeredPassword, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const registering= await register(registeredEmail, registeredPassword, registeredUsername)

      alert("Registrasi berhasil!")
      router.push("/auth/login")
    } catch (error: any) {
      alert(error.message || "Terjadi kesalahan saat registrasi.")
    }
  }

  const handleGoogleRegister = async () => {
    try {
      const { token } = await loginWithGoogle();
      localStorage.setItem("userToken", token);

      alert("Registrasi dengan Google berhasil!");
      router.push("/auth/set-username");
    } catch (error: any) {
      alert(error.message || "Gagal login dengan Google.");
    }
  };
  
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-cover bg-center bg-[url('/images/auth-bg.png')]">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 to-gray-900/80 backdrop-blur-sm"></div>

      <div className="w-full max-w-md relative z-10 bg-gray-900/90 backdrop-blur-md border border-gray-800 rounded-xl shadow-2xl overflow-hidden">
        <div className="px-6 pt-8 pb-4">
          <h1 className="text-2xl font-bold text-center text-white mb-1">Create Account</h1>
          <p className="text-center text-sky-400 text-sm font-semibold">Sign up to get started</p>
        </div>

        <div className="px-6 pb-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Username"
                  value={registeredUsername}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent text-white text-sm"
                  required
                />
              </div>

              <div className="relative">
                <input
                  type="email"
                  placeholder="Email"
                  value={registeredEmail}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent text-white text-sm"
                  required
                />
              </div>

              <div className="relative">
                <input
                  type="password"
                  placeholder="Password"
                  value={registeredPassword}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent text-white text-sm"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-sky-600 font-semibold hover:cursor-pointer hover:bg-sky-700 text-white py-2 px-4 rounded-md transition-colors duration-200"
            >
              Register
            </button>
          </form>

          <div className="relative flex items-center justify-center">
            <div className="absolute w-full h-px bg-gray-700"></div>
            <span className="relative px-2 bg-gray-900 text-sm text-sky-400">atau</span>
          </div>

          <button
            onClick={handleGoogleRegister}
            className="w-full bg-white text-black border p-2 rounded flex hover:cursor-pointer items-center justify-center space-x-2"
          >
            <img src="/icons/Google/google-96.svg" alt="Google" className="w-5 h-5" />
            <span>Register dengan Google</span>
          </button>

          <Link href="/auth/login" className="text-sky-400 hover:underline underline-offset-2 decoration-sky-400">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  )
}
