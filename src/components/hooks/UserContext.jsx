import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create a context for user
export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Fetch user data if logged in
    const fetchUserData = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await axios.get(`${process.env.REACT_API}/api/user`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const userData = response.data.user;
                setUser(userData); // Set user data in state
                localStorage.setItem('name', userData.username);
                localStorage.setItem('role', userData.role);
                localStorage.setItem('gData', JSON.stringify(userData.purchasedGames));
                localStorage.setItem('userId', userData.userId);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setUser(null); // If error, clear user data
            }
        }
    };

    useEffect(() => {
        fetchUserData(); // Fetch user data on initial page load
    }, []); // Empty dependency array so it runs once on mount

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
