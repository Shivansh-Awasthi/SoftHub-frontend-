import axios from 'axios';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteApps = ({ appId }) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!appId) {
            toast.error("App ID is required for deletion!");
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${process.env.REACT_API}/api/apps/delete/${id}`, {
                headers: {
                    'Authorization': token,
                },
            });

            toast.success("App deleted successfully!");
            setTimeout(() => {
                window.location.reload(); // Refresh page after deletion
            }, 2000);
        } catch (error) {
            console.error("Error deleting app:", error.response?.data || error.message);
            toast.error("Error deleting app! Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <ToastContainer />
            <button
                onClick={handleDelete}
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                disabled={loading}
            >
                {loading ? 'Deleting...' : 'Delete App'}
            </button>
        </div>
    );
};

export default DeleteApps;