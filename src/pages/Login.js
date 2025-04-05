import React from 'react';

const Login = () => {
    return (
        <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">
            <form className="bg-white p-10 rounded-2xl shadow-xl w-[90%] max-w-md">
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Welcome Back</h2>

                <div className="flex flex-col mb-6">
                    <label className="mb-2 font-semibold text-gray-700">Email</label>
                    <input
                        type="email"
                        placeholder="Enter Your Email"
                        className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="flex flex-col mb-4">
                    <label className="mb-2 font-semibold text-gray-700">Password</label>
                    <input
                        type="password"
                        placeholder="Enter Your Password"
                        className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="flex justify-between items-center mb-6">
                    <label className="text-sm text-gray-600">
                        <input type="checkbox" className="mr-2" />
                        Remember me
                    </label>
                    <a href="#" className="text-sm text-indigo-500 hover:underline">Forgot password?</a>
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all duration-300"
                >
                    Log In
                </button>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <a href="/sign-up" className="text-indigo-500 hover:underline">Sign Up</a>
                </p>
            </form>
        </div>
    );
};

export default Login;
