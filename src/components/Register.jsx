import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleName = (e) => {
        setName(e.target.value);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_API}/api/user/signup`, {
                username: name,
                email,
                password
            });

            setName('');
            setEmail('');
            setPassword('');

            // Show success toast
            toast.success('User created successfully! Redirecting to login...', {
                position: "top-right",
                autoClose: 2000, // 2 seconds
            });

            // Redirect to login after 1 second
            setTimeout(() => {
                navigate('/login');
            }, 2000);



        } catch (error) {
            // If the error status is 409 (Conflict), it means user already exists
            if (error.response && error.response.status === 409) {
                toast.error('User already exists!', {
                    position: "top-right",
                    autoClose: 3000, // 3 seconds
                });
            } else {
                toast.error('Something went wrong. Please try again.', {
                    position: "top-right",
                    autoClose: 3000, // 3 seconds
                });
            }
            console.log(error);
        }
    }

    return (
        <div className="max-w-xl h-full mx-auto">
            <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm p-6 sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign Up</h3>

                    <div>
                        <label className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Username</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={handleName}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={handleEmail}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={handlePassword}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Sign Up
                    </button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Already have an account? <Link to={'/login'} className="text-blue-700 hover:underline dark:text-blue-500">Sign in</Link>
                    </div>
                </form>
            </div>
            {/* Toast Container for displaying toasts */}
            <ToastContainer />
        </div>
    )
}

export default Register;