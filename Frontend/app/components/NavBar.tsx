"use client";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import { text } from "stream/consumers";
import Link from "next/link"

function NavBar() {

    const [textInput, settextInput] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (!textInput.trim()) return; // Prevent empty searches
        router.push(`/search?search=${textInput}`);
    }

    return (


        <div className="bg-gray-700 sticky z-50 top-0 text-white   w-full">

            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex flex-col md:flex-row items-center justify-between gap-4"> 

                {/* Logo and links */}

                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 w-full md:w-auto"> 


                <img src="/banana.png" alt="Logo" className="shrink-0 h-8 w-8" />
                <ul className="flex items-center gap-4 sm:gap-6 text-sm sm:text-base font-medium">
                    <li className="nav-item">
                        <a className="nav-link active hover:text-blue-400 transition-colors" aria-current="page" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link hover:text-blue-400 transition-colors" href="#">Link</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link hover:text-blue-400 transition-colors" href="#">Link</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled hover:text-blue-400 transition-colors" aria-disabled="true">Disabled</a>
                    </li>


                </ul>

                </div>

            {/* search bar */}

            <div className="w-full md:w-auto flex flex-col sm:flex-row items-center justify-end">

                <form onSubmit={handleSearch} className="flex items-center gap-2">
                <input 
                    type="text" 
                    placeholder="Search..." 
                    className="ml-4 px-2 py-1 rounded bg-gray-600 border-2 border-blue-400 text-white focus:outline-white focus:ring-2 focus:ring-blue-500" 
                    value={textInput}
                    onChange={(e) => settextInput(e.target.value)}
                />
                <button
                    type="submit"
                    className="px-4 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300 shrink-0"
                >
                    Search
                    </button>
                </form>

                <Link href="/profile">
                    <img src="/profile.jpg" alt="Profile" className="ml-4 h-8 w-8 rounded-full hover:ring-2 hover:ring-blue-500 hover:cursor-pointer" />
                </Link>
            </div>
            </div>
        </div>

    );

}

export default NavBar;




