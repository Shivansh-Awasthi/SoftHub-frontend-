import React, { useEffect, useState } from 'react';

const LiveCounter = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // Retrieve the role from localStorage
        const role = localStorage.getItem('role');

        // Check if the role is 'ADMIN'
        if (role === 'ADMIN') {
            setIsAdmin(true);  // Set state to true if role is ADMIN
        }
    }, []);

    // Only render the Elfsight widget if isAdmin is true
    if (!isAdmin) {
        return null; // Do nothing, return null if not an ADMIN
    }

    return (
        <div
            className="elfsight-app-b326be27-a48e-4d48-b83e-ce3ea79324ed"
            data-elfsight-app-lazy
        ></div>
    );
};

export default LiveCounter;
