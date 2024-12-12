import React, { useEffect, useState } from 'react';

const LiveCounter = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // Retrieve the role from localStorage
        const role = localStorage.getItem('role');
        if (role === 'ADMIN') {
            setIsAdmin(true);
        }
    }, []);


    // Inline styles for showing/hiding the widget based on admin status
    const widgetStyles = {
        display: isAdmin ? 'block' : 'none',  // Show for admins, hide for non-admins
    };

    return (
        <div
            className="elfsight-app-b326be27-a48e-4d48-b83e-ce3ea79324ed"
            data-elfsight-app-lazy
            style={widgetStyles}  // Apply the display styles here
        ></div>
    );
};

export default LiveCounter;
