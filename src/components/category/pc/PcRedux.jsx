import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppsByCategory } from '../../../redux/slices/appsSlice';

const PcRedux = () => {
    // Redux hooks
    const dispatch = useDispatch();
    const { pcApps } = useSelector(state => state.apps);
    
    // Local state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 48; // Set the number of items per page
    
    // Extract data from Redux state
    const { data = [], total: totalApps = 0, loading = false, error = null } = pcApps;
    
    // Fetch data when component mounts or page changes
    useEffect(() => {
        dispatch(fetchAppsByCategory({
            category: 'pc',
            params: {
                page: currentPage,
                limit: itemsPerPage
            }
        }));
    }, [dispatch, currentPage, itemsPerPage]);
    
    // Calculate total pages
    const totalPages = Math.ceil(totalApps / itemsPerPage);
    
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
                <h1 className='font-medium text-3xl mb-4'>Games <span className='font-medium ml-2 text-[#8E8E8E]'>{totalApps}</span></h1>
            </div>
            
            {loading ? (
                <p className="text-center">Loading...</p>
            ) : error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
                    {data.map((ele) => (
                        <Link
                            key={ele._id}
                            to={`/download/${createSlug(ele.platform)}/${createSlug(ele.title)}/${ele._id}`}
                            className="flex flex-col rounded-2xl h-52 overflow-hidden transition duration-300 ease-in-out ring-0 hover:ring-2 hover:ring-[#8E8E8E] hover:ring-opacity-75"
                        >
                            <figure className="flex justify-center items-center rounded-t-2xl overflow-hidden h-full">
                                <img
                                    src={ele.coverImg}
                                    alt={ele.title}
                                    className="w-full h-full object-cover rounded-t-2xl transition-transform duration-700 ease-in-out transform hover:scale-110"
                                />
                            </figure>
                            <div className="flex flex-col p-3 bg-[#262626] flex-grow">
                                <div className="text-sm font-normal text-[#ffffff] pb-2 overflow-hidden whitespace-nowrap text-ellipsis">{ele.title}</div>
                                <div className="text-xs font-thin text-[#ffffff]">Size: {ele.size}</div>
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

export default PcRedux;
