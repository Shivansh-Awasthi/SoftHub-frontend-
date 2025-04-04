import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppsByCategory } from '../../../redux/slices/appsSlice';

const Ps4Redux = () => {
    // Redux hooks
    const dispatch = useDispatch();
    const { ps4Apps } = useSelector(state => state.apps);
    
    // Local state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 48; // Set items per page
    
    // Extract data from Redux state
    const { data = [], total: totalItems = 0, loading = false, error = null } = ps4Apps;
    
    // Fetch data when component mounts or page changes
    useEffect(() => {
        dispatch(fetchAppsByCategory({
            category: 'ps4',
            params: {
                page: currentPage,
                limit: itemsPerPage
            }
        }));
    }, [dispatch, currentPage, itemsPerPage]);
    
    // Calculate total pages
    const totalPages = totalItems > 0 ? Math.ceil(totalItems / itemsPerPage) : 1;
    
    // Create slug for URLs
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
                    PS4 ISO <span className='font-medium ml-2 text-[#8E8E8E]'>{totalItems}</span>
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
                            to={`/download/${createSlug(ele.platform)}/${createSlug(ele.title)}/${ele._id}`}
                            className="flex flex-col rounded-2xl h-36 overflow-hidden transition duration-300 ease-in-out ring-1 ring-white/10 hover:ring-2 hover:ring-[#8E8E8E] hover:ring-opacity-75"
                        >
                            <div className="flex justify-center items-center h-32 bg-[#262626] pt-4">
                                <img
                                    src={ele.thumbnail && ele.thumbnail[0] ? ele.thumbnail[0] : ele.image}
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

export default Ps4Redux;
