'use client';

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";

export default function SetUsername() {


    const [registeredUsername, setRegisteredUsername] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const notifySuccess = () => toast("Username has been Set!");

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-cover bg-center bg-[url('/images/auth-bg.png')]">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 to-gray-900/80 backdrop-blur-sm"></div>

            <div className="w-full max-w-md relative z-10 bg-gray-900/90 backdrop-blur-md border border-gray-800 rounded-xl shadow-2xl overflow-hidden">
                <div className="px-6 pt-8 pb-4">
                    <h1 className="text-2xl font-bold text-center text-white mb-1">Set your Username</h1>
                    <p className="text-center text-sky-400 text-sm font-semibold">Set how you want your name to be displayed</p>
                </div>

                <div className="px-6 pb-8 space-y-6">
                    <form
                        onSubmit={notifySuccess} 
                        className="space-y-4">
                        <div className="space-y-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={registeredUsername}
                                    onChange={(e) => setRegisteredUsername(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent text-white text-sm"
                                    required
                                />
                            </div>


                            <button
                                type="submit"
                                className="w-full bg-sky-600 font-semibold hover:cursor-pointer hover:bg-sky-700 text-white py-2 px-4 rounded-md transition-colors duration-200"
                            >
                                Set Username
                            </button>
                        </div>
                    </form>
                </div>

                <div className="px-6 pb-8 text-white">
                    <Link href={
                        //back to previous page
                        document.referrer ? document.referrer : "/auth/login"}>
                        <ArrowLeft></ArrowLeft>
                    </Link>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
        </div>
    )
}