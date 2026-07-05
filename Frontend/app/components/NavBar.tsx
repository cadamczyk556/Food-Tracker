"use client";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import { text } from "stream/consumers";

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


                <img src="/vercel.svg" alt="Logo" className="flex-shrink-0 h-8 w-8" />
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

            <div className="w-full md:w-auto flex flex-col sm:flex-row items-center">

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
                    className="px-4 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300 flex-shrink-0"
                >
                    Search
                    </button>
                </form>
            </div>
            </div>
        </div>

    );

}

export default NavBar;






//     return (
//         // 1. The Outer Wrapper: No fixed heights.
//         <div className="bg-gray-700 sticky z-50 top-0 text-white shadow-md w-full">
            
//             {/* 2. The Inner Container: 
//                 - flex-col on mobile (stacked)
//                 - md:flex-row on desktop (side-by-side)
//                 - max-w-7xl mx-auto replaces your 15% margins! */}
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex flex-col md:flex-row items-center justify-between gap-4">
                
//                 {/* LEFT SIDE: Logo & Links */}
//                 <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 w-full md:w-auto">
                    
//                     <a href="/" className="flex-shrink-0">
//                         <img src="/vercel.svg" alt="Logo" className="h-8 w-8" />
//                     </a>
                    
//                     {/* gap-4 on mobile, gap-6 on desktop */}
//                     <ul className="flex items-center gap-4 sm:gap-6 text-sm sm:text-base font-medium">
//                         <li>
//                             <a href="/" className="hover:text-blue-400 transition-colors">Home</a>
//                         </li>
//                         <li>
//                             <a href="#" className="hover:text-blue-400 transition-colors">Link</a>
//                         </li>
//                         <li>
//                             <a href="#" className="hover:text-blue-400 transition-colors">Link</a>
//                         </li>
//                         <li>
//                             <span className="text-gray-400 cursor-not-allowed">Disabled</span>
//                         </li>
//                     </ul>

//                 </div>

//                 {/* RIGHT SIDE: Search Bar */}
//                 {/* w-full on mobile makes the search bar stretch nicely, md:w-auto restricts it on desktop */}
//                 <div className="w-full md:w-auto">
//                     <form onSubmit={handleSearch} className="flex items-center gap-2">
//                         <input 
//                             type="text" 
//                             placeholder="Search..." 
//                             className="w-full sm:w-auto px-3 py-1.5 rounded bg-gray-600 border border-gray-500 text-white placeholder-gray-300 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all" 
//                             value={textInput}
//                             onChange={(e) => settextInput(e.target.value)}
//                         />
//                         <button
//                             type="submit"
//                             className="px-4 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-300 flex-shrink-0"
//                         >
//                             Search
//                         </button>
//                     </form>
//                 </div>

//             </div>
//         </div>
//     );
// }

// export default NavBar;