"use client";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import { text } from "stream/consumers";

function NavBar() {

    const [textInput, settextInput] = useState("");
    const router = useRouter();

    const handleSearch = () => {
        if (!textInput.trim()) return; // Prevent empty searches
        router.push(`/?search=${textInput}`);
    }

    return (

        <div className="bg-gray-700 text-white p-4 flex items-center justify-between h-16">
            <img src="/vercel.svg" alt="Logo" className="h-8 w-8 inline-block mr-2 justify-end" />
            <ul className="flex space-x-4 justify-center items-center">
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">Active</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Link</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Link</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                </li>


            </ul>
            <input 
                type="text" 
                placeholder="Search..." 
                className="ml-4 px-2 py-1 rounded bg-gray-600 border-2 border-blue-400 text-white focus:outline-white focus:ring-2 focus:ring-blue-500" 
                value={textInput}
                onChange={(e) => settextInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />

        </div>

    )

}

export default NavBar;

