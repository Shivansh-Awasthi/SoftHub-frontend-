import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearUserError } from '../redux/slices/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterRedux = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // Get user state from Redux
    const { loading, error, success } = useSelector(state => state.user);
    
    // Clear any previous errors when component mounts
    useEffect(() => {
        dispatch(clearUserError());
    }, [dispatch]);
    
    // Handle registration success
    useEffect(() => {
        if (success) {
            toast.success('Registration successful! Redirecting to login...', {
                position: 'top-right',
                autoClose: 2000,
            });
            
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        }
    }, [success, navigate]);
    
    // Handle registration errors
    useEffect(() => {
        if (error) {
            toast.error(error.message || 'Registration failed. Please try again.', {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    }, [error]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate form
        if (password.length < 6) {
            toast.error('Password must be at least 6 characters long', {
                position: 'top-right',
                autoClose: 3000,
            });
            return;
        }
        
        // Dispatch register action
        dispatch(registerUser({ username, email, password }));
        
        // Clear form
        setUsername("");
        setEmail("");
        setPassword("");
    };
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <ToastContainer />
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create an Account</h2>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Choose a username"
                            required
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Create a password"
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters long</p>
                    </div>
                    
                    <div className="flex items-center justify-between mb-6">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Registering...
                                </span>
                            ) : (
                                'Register'
                            )}
                        </button>
                    </div>
                    
                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="text-blue-500 hover:text-blue-700">
                                Login here
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterRedux;
