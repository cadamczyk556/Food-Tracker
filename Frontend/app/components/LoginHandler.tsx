
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";







export default function LoginHandler() {

const { data: session, status } = useSession();
const router = useRouter();

const [loginEmail, setLoginEmail] = useState("");
const [loginPassword, setLoginPassword] = useState("");

const [regEmail, setRegEmail] = useState("");
const [regPassword, setRegPassword] = useState("");

const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();     //necessary to prevent the default form submission behavior
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
        email: loginEmail,
        password: loginPassword,
        redirect: false,
    });

    setLoading(false);

    if (result?.error) {
        setError("Invalid email or password");
    } else {
        router.push("/");
        router.refresh();
    }

};

const handleRegister = async ( e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {

        const res = await fetch("http://localhost:8000/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: regEmail,
                password: regPassword,
            }),
        });

        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.detail || "registration failed");
        }

        const result = await signIn("credentials", {
        email: regEmail,
        password: regPassword,
        redirect: false,
        });

        setLoading(false);

        if (result?.error) {
            setError("Invalid email or password");
        } else {
            router.push("/");
            router.refresh();
        }

    } catch (err: any) {
        setError(err.message || "something went wrong");
    } finally {
        setLoading(false);
    }

};







    if (status === "loading") {
        return (
            <div>
                <p className="text-center text-gray-500">Loading...</p>
            </div>
        )
    }


    if (status === "authenticated") {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100 gap-10">
                <p className="text-center text-gray-500"> you are logged in!!!!</p>
            </div>
        )
    }


    //unauthenticated 

    return (
        <div className=" min-h-screen flex items-center justify-center p-6 bg-gray-100 gap-10">

            {error && (
                <div className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md max-w-md w-full text-center">
                    {error}
                </div>
            )}


            {/* login tab */}

            <div className="bg-slate-600 w-full max-w-md rounded-lg shadow-md p-8">

                <div className="mb-8 text-center border-b border-slate-500 pb-4">
                    <h1 className="font-bold text-white text-xl">Sign In</h1>
                </div>

                <form onSubmit={handleLogin} className="flex flex-col gap-6">

                    <div>
                        <label className="block text-sm font-semibold text-white mb-1">
                            Email Address
                        </label>
                        <input 
                            type="email"
                            required
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            placeholder="enter your email here"
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition"
                        />


                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-white mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            placeholder="enter your password here"
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition"
                        />

                    </div>


                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 hover:cursor-pointer">
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                
                </form>
            </div>

            {/* register tab */}

            <div className="bg-slate-600 w-full max-w-md rounded-lg shadow-md p-8">
                <div className="mb-8 text-center border-b border-slate-500 pb-4">
                    <h1 className="font-bold text-white text-xl">Register</h1>
                </div>

                   <form onSubmit={handleRegister} className="flex flex-col gap-6">

                    <div>
                        <label className="block text-sm font-semibold text-white mb-1">
                            Email Address
                        </label>
                        <input 
                            type="email"
                            required
                            value={regEmail}
                            onChange={(e) => setRegEmail(e.target.value)}
                            placeholder="enter your email here"
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition"
                        />


                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-white mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            value={regPassword}
                            onChange={(e) => setRegPassword(e.target.value)}
                            placeholder="enter your password here"
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition"
                        />

                    </div>


                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full  py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 hover:cursor-pointer">
                        {loading ? "Registering..." : "Register"}
                    </button>
                
                </form>



            </div>



        </div>
    )
}