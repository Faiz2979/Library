"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function AdminDashboard() {
  // Placeholder data (would normally come from an API)
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalUsers: 0,
  })

  // Simulate loading data
  useEffect(() => {
    // This would be replaced with actual API calls
    setTimeout(() => {
      setStats({
        totalBooks: 256,
        totalUsers: 124,
      })
    }, 1000)
  }, [])

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-cover bg-center bg-[url('/images/auth-bg.png')]">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 to-gray-900/80 backdrop-blur-sm"></div>

      <div className="w-full max-w-4xl relative z-10 bg-gray-900/90 backdrop-blur-md border border-gray-800 rounded-xl shadow-2xl overflow-hidden">
        <div className="px-6 pt-8 pb-4">
          <h1 className="text-2xl font-bold text-center text-white mb-1">Admin Dashboard</h1>
          <p className="text-center text-sky-400 text-sm font-semibold">System overview and statistics</p>
        </div>

        <div className="px-6 pb-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Total Books Card */}
            <div className="bg-gray-800/80 border border-gray-700 rounded-xl p-6 transition-all hover:border-sky-600/50 hover:shadow-lg hover:shadow-sky-600/10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">Total Books</h2>
                <div className="p-2 bg-sky-600/20 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-sky-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex items-end">
                <span className="text-4xl font-bold text-white">{stats.totalBooks}</span>
                <span className="ml-2 text-sm text-sky-400 mb-1">books</span>
              </div>
              <p className="mt-2 text-gray-400 text-sm">Total books in the library system</p>
            </div>

            {/* Total Users Card */}
            <div className="bg-gray-800/80 border border-gray-700 rounded-xl p-6 transition-all hover:border-sky-600/50 hover:shadow-lg hover:shadow-sky-600/10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">Total Users</h2>
                <div className="p-2 bg-sky-600/20 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-sky-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex items-end">
                <span className="text-4xl font-bold text-white">{stats.totalUsers}</span>
                <span className="ml-2 text-sm text-sky-400 mb-1">users</span>
              </div>
              <p className="mt-2 text-gray-400 text-sm">Registered users in the system</p>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="bg-gray-800/80 border border-gray-700 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-gray-900/60 rounded-lg border border-gray-700">
                <div className="p-2 bg-sky-600/20 rounded-lg mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-sky-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div>
                  <p className="text-white text-sm">
                    New book added: <span className="text-sky-400">The Great Gatsby</span>
                  </p>
                  <p className="text-xs text-gray-400">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-900/60 rounded-lg border border-gray-700">
                <div className="p-2 bg-sky-600/20 rounded-lg mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-sky-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-white text-sm">
                    New user registered: <span className="text-sky-400">johndoe@example.com</span>
                  </p>
                  <p className="text-xs text-gray-400">5 hours ago</p>
                </div>
              </div>
            </div>
          </div>

          <Link
            href="/admin"
            className="inline-block text-sky-400 hover:underline underline-offset-2 decoration-sky-400"
          >
            Back to Admin Panel
          </Link>
        </div>
      </div>
    </div>
  )
}

