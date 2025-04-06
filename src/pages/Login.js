import React, { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user,setUser]=useState({});

    const handleLogin = (e) => {
        e.preventDefault();

        const latestId = localStorage.getItem('Todolist_latest_userID');
        

        // Loop through stored users to find a match
        for (let i = 1; i <= latestId; i++) {
            const storedUser = localStorage.getItem(`Todolist_user_${i}`);
            if (storedUser) {
                const userObj = JSON.parse(storedUser);
                if (userObj.email === email && userObj.password === password) {
                    setUser(userObj);
                    break;
                }
                else{
                    setUser(null)
                }
            }
        }

        if (user) {
            // Optional: Store session data
            localStorage.setItem('Todolist_loggedInUser', user.id);
            alert('Login Successful!');
            // redirect or do something
        } else {
            alert('Invalid Email or Password');
        }
    };

    return (
        <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">
            <form onSubmit={handleLogin} className="bg-white p-10 rounded-2xl shadow-xl w-[90%] max-w-md">
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Welcome Back</h2>

                <div className="flex flex-col mb-6">
                    <label className="mb-2 font-semibold text-gray-700">Email</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Enter Your Email"
                        className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>

                <div className="flex flex-col mb-4">
                    <label className="mb-2 font-semibold text-gray-700">Password</label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Enter Your Password"
                        className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
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
