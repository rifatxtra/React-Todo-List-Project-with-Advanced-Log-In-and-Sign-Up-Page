import React from 'react';

const SignUP = () => {
    return (
        <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">
            <form className="bg-white p-10 rounded-2xl shadow-xl w-[90%] max-w-2xl">
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Create an Account</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                        <label className="mb-2 font-semibold text-gray-700">Name</label>
                        <input
                            type="text"
                            placeholder="Enter Your Name"
                            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-2 font-semibold text-gray-700">Email</label>
                        <input
                            type="email"
                            placeholder="Enter Your Email"
                            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-2 font-semibold text-gray-700">Password</label>
                        <input
                            type="password"
                            placeholder="Enter Your Password"
                            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-2 font-semibold text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="mt-8 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignUP;
