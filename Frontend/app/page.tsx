"use client";

import React, {useState} from 'react';
import SpinningFruit from './components/SpinningFruit';


export default function Home() {
    const [isClicked, setClicked] = useState(false);
    const bcolor = isClicked ? "bg-red-600" : "bg-blue-600";

    return (

        <div className={isClicked ? "dark" : ""}>
 
            <div className="relative flex flex-col pt-20 items-center min-h-screen bg-gray-100 dark:bg-black transition-colors overflow-hidden">

                <div className="absolute inset-0 z-0">
                    <SpinningFruit/>
                </div>

                <div className="relative z-10 flex flex-col items-center  pointer-events-none">
                    <h1 className="text-6xl font-bold text-black dark:text-white text-outline" style={{ WebkitTextStroke: isClicked ? '2px white' : '2px black' }}>Welcome to the Food Tracker</h1>
                    <button 
                        onClick={() => setClicked(!isClicked)}
                        className={`pointer-events-auto cursor-pointer fixed bottom-6 left-6 z-50  ml-4 px-4 py-2 bg-black text-white rounded transition-colors duration-300 dark:bg-white dark:text-black `}>
                        {isClicked ? "☀️ Light Mode" : "🌙 Dark Mode"}            
                    </button>

                    <h2 className="text-gray-700 dark:text-gray-100 ">Track your food, track your life.</h2>

                    <p className="text-gray-700 dark:text-gray-300 ">This is a tool to help make informed decisions on grocery prices by price comparison between retailers.</p>

                </div>


                

            </div>

        </div>


    );
}