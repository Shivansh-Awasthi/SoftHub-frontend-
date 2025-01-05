import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const MacSoftwares = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 48; // Set items per page
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    const handleData = async () => {
        setLoading(true); // Start loading
        setError(null); // Reset any previous errors
        try {
            const response = await axios.get(`${process.env.REACT_API}/api/apps/category/smac`, {
                params: {
                    page: currentPage,    // Current page number
                    limit: itemsPerPage,  // Items per page
                },
            });

            setData(response.data.apps);
            setTotalItems(response.data.total || 0); // Ensure totalItems is a number
        } catch (error) {
            console.log("Error fetching mac softwares: " + error);
            setError("Failed to load data. Please try again later."); // Set error message
        } finally {
            setLoading(false); // Stop loading
        }
    };

    useEffect(() => {
        handleData();
    }, [currentPage]);

    // Calculate total pages
    const totalPages = totalItems > 0 ? Math.ceil(totalItems / itemsPerPage) : 1;

    const createSlug = (title) => {
        return title
            .toLowerCase() // Convert to lowercase
            .replace(/[^\w\s-]/g, '') // Remove non-alphanumeric characters
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .trim(); // Remove trailing spaces
    };

    return (
        <div className='container mx-auto p-2'>
            <div className='cover mb-6'>
                <h1 className='font-medium text-3xl mb-4'>
                    Mac Softwares <span className='font-medium ml-2 text-[#8E8E8E]'>{totalItems}</span>
                </h1>
            </div>

            {loading ? (
                <p className="text-center">Loading...</p>
            ) : error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : (
                // Responsive grid layout
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {data.map((ele) => (
                        <Link
                            key={ele._id}
                            to={`/${ele._id}/download/${createSlug(ele.title)}`}
                            className="flex flex-col rounded-2xl h-36 overflow-hidden transition duration-300 ease-in-out ring-1 ring-white/10 hover:ring-2 hover:ring-[#8E8E8E] hover:ring-opacity-75"
                        >
                            <div className="flex justify-center items-center h-32 bg-[#262626] pt-4">
                                <img
                                    src={ele.thumbnail[0]}
                                    alt={ele.title}
                                    className="rounded-lg w-14 h-14 transition-transform duration-700 ease-in-out transform hover:scale-110 bg-[#262626]"
                                />
                            </div>
                            <div className="flex flex-col p-4 bg-[#262626]">
                                <div className="text-sm text-center font-normal overflow-hidden whitespace-nowrap text-ellipsis text-[#ffffff] bg-[#262626] pb-2">{ele.title}</div>
                                <div className="text-xs text-center font-thin text-[#8E8E8E] bg-[#262626]">Size: {ele.size}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* Pagination Controls */}
            <div className="flex justify-center mt-6">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 mx-2 bg-gray-700 text-white rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="px-4 py-2">Page {currentPage} of {totalPages}</span>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 mx-2 bg-gray-700 text-white rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default MacSoftwares;