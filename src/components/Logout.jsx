import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast

const Logout = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook

    useEffect(() => {
        // Clear local storage
        localStorage.clear();

        // Show logout toast notification
        toast.success("You have successfully logged out.", {
            position: 'top-right',
            autoClose: 2000, // 2 seconds delay
        });

        // Redirect to the login page after 2 seconds
        const timer = setTimeout(() => {
            navigate('/login'); // Adjust the path based on your routing
        }, 2000);

        // Clean up the timer on component unmount
        return () => clearTimeout(timer);
    }, [navigate]);

    return null; // This component doesn't need to render anything
};

export default Logout;