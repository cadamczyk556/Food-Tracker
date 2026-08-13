





export default function Profile() {
    return (
        <div className=" min-h-screen flex items-center justify-center p-6 bg-gray-100 gap-10">


            {/* login tab */}

            <div className="bg-slate-600 w-full max-w-md rounded-lg shadow-md p-8">

                <div className="mb-8 text-center border-b border-slate-500 pb-4">
                    <h1 className="font-bold text-white text-xl">Sign In</h1>
                </div>

                <form className="flex flex-col gap-6">

                    <div>
                        <label className="block text-sm font-semibold text-white mb-1">
                            Email Address
                        </label>
                        <input 
                            type="email"
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
                            placeholder="enter your password here"
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition"
                        />

                    </div>


                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 hover:cursor-pointer">
                        Sign In
                    </button>
                
                </form>
            </div>

            {/* register tab */}

            <div className="bg-slate-600 w-full max-w-md rounded-lg shadow-md p-8">
                <div className="mb-8 text-center border-b border-slate-500 pb-4">
                    <h1 className="font-bold text-white text-xl">Register</h1>
                </div>

                   <form className="flex flex-col gap-6">

                    <div>
                        <label className="block text-sm font-semibold text-white mb-1">
                            Email Address
                        </label>
                        <input 
                            type="email"
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
                            placeholder="enter your password here"
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition"
                        />

                    </div>


                    <button
                        type="submit"
                        className="w-full  py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 hover:cursor-pointer">
                        Register
                    </button>
                
                </form>



            </div>



        </div>
    )
}