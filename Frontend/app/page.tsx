"use client";

import React, {useState} from 'react';


export default function Home() {
    const [isClicked, setClicked] = useState(false);
    const bcolor = isClicked ? "bg-red-600" : "bg-blue-600";

    return (

        <div className={isClicked ? "dark" : ""}>

            <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-black transition-colors ">
                <h1 className="text-3xl font-bold text-black dark:text-white ">Welcome to the Food Tracker</h1>
                <button 
                    onClick={() => setClicked(!isClicked)}
                    className={`cursor-pointer fixed bottom-6 left-6 z-50  ml-4 px-4 py-2 bg-black text-white rounded transition-colors duration-300 dark:bg-white dark:text-black `}>
                    {isClicked ? "☀️ Light Mode" : "🌙 Dark Mode"}            
                </button>

            </div>

        </div>

    );
}