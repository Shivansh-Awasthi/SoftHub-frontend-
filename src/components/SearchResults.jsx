import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loading/Loader';
import { CiLock } from 'react-icons/ci'; // Lock Icon

const SearchResults = () => {
    const query = new URLSearchParams(useLocation().search).get('query');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [totalApps, setTotalApps] = useState(0); // To store total number of apps for pagination
    const [itemsPerPage] = useState(48); // 48 items per page

    const handleData = async () => {
        setLoading(true);

        try {
            // If query is empty, fetch all apps
            const trimmedQuery = query ? query.trim() : '';
            const params = {
                page: currentPage,
                limit: itemsPerPage,
                q: trimmedQuery || '', // If no query, fetch all
            };

            const response = await axios.get(`${process.env.REACT_API}/api/apps/all`, { params });

            if (response.data.success) {
                setData(response.data.apps);  // Set the apps data from backend
                setTotalApps(response.data.total);  // Set the total number of apps for pagination
            } else {
                setError('Failed to load data. Please try again later.');
            }
        } catch (error) {
            console.log("Error fetching apps:", error);
            setError('Failed to load data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    // Reset currentPage to 1 whenever the query changes
    useEffect(() => {
        setCurrentPage(1); // Reset to page 1 when the search query changes
    }, [query]);

    // Fetch the data whenever the page or query changes
    useEffect(() => {
        handleData();
    }, [currentPage, query]);  // Trigger when currentPage or query changes

    // Handle empty search query state
    useEffect(() => {
        if (!query || query.length < 1) {
            setError(<span style={{ fontSize: '15px' }}>⚠ Search field is empty.</span>);
            setData([]); // Clear data when no query
        } else {
            setError('');
        }
    }, [query]);

    // Get purchased games from localStorage (if logged in)
    const purchasedGames = JSON.parse(localStorage.getItem("gData")) || [];
    const isAdmin = localStorage.getItem("role") === 'ADMIN';  // Check if user is admin

    // Calculate total pages based on the total apps count
    const totalPages = Math.ceil(totalApps / itemsPerPage);

    // Handle Page Change
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const createSlug = (title) => {
        return title
            .toLowerCase() // Convert to lowercase
            .replace(/[^\w\s-]/g, '') // Remove non-alphanumeric characters
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .trim(); // Remove trailing spaces
    };

    return (
        <div>
            <div className='cover mb-6'>
                {data.length > 0 && !error && (
                    <h1 className='font-medium text-3xl mb-4'>
                        Search Results <span className='font-medium ml-2 text-[#8E8E8E]'>{totalApps}</span>
                    </h1>
                )}
            </div>

            {loading ? (
                <Loader />
            ) : error ? (
                <div>
                    <h1 className='font-medium text-3xl mb-6'>Oops! Something went wrong</h1>
                    <div className="p-6 mr-96 bg-[#2c2c2c] rounded-lg text-sm text-center border border-white border-opacity-10 shadow-lg">
                        <p>{error}</p>
                    </div>
                </div>
            ) : data.length === 0 ? (
                <div>
                    <h1 className='font-medium text-3xl mb-6'>Oops! Something went wrong</h1>
                    <div className="p-6 mr-96 bg-[#2c2c2c] rounded-lg text-sm text-center border border-white border-opacity-10 shadow-lg">
                        <p>Sorry, your search did not yield any results. Try changing or shortening your query.</p>
                    </div>
                </div>
            ) : (
                <div className="w-full md:w-full p-4 border border-gray-200 border-opacity-5 bg-[#262626] rounded-lg shadow sm:p-8">
                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-700">
                            {data.map((ele) => {
                                // Check if the game is paid and whether the user has purchased it
                                const isPurchased = purchasedGames.includes(ele._id); // Compare game ID with purchased games
                                const isUnlocked = isAdmin || !ele.isPaid || isPurchased; // Unlock if Admin or if it's free or the user purchased it
                                const isLocked = !isUnlocked; // Game is locked if not unlocked

                                return (
                                    <li
                                        key={ele._id}
                                        className={`py-2 sm:py-2 relative ${isLocked ? 'opacity-30 pointer-events-none' : ''}`} // Apply opacity and disable interactions for locked games
                                    >
                                        <Link
                                            to={isLocked ? '#' : `/download/${createSlug(ele.platform)}/${createSlug(ele.title)}/${ele._id}`}
                                            className="flex items-center justify-between w-full"
                                        >
                                            <div className="flex-shrink-0">
                                                <img
                                                    className="w-12 h-12 rounded-xl object-cover hover:rounded-full"
                                                    src={ele.thumbnail[0]}
                                                    alt={ele.title}
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0 ms-4">
                                                <p className="text-normal font-light truncate text-white">
                                                    {ele.title}
                                                </p>

                                                <p className={`text-sm text-blue-500 truncate ${ele.platform === 'mac' ? 'text-gray-500' : ele.platform === 'PC' ? 'text-red-500' : ele.platform === 'Android' ? 'text-green-500' : ele.platform === 'Playstation' ? 'text-purple-500' : ''}`}>
                                                    {ele.platform}
                                                </p>
                                            </div>
                                            <div className="flex-1 flex justify-center text-sm font-semibold text-gray-500 hidden sm:block">
                                                {ele.size}
                                            </div>
                                            <div className="text-right text-sm text-gray-500 hidden md:block ">
                                                {new Date(ele.updatedAt).toLocaleDateString()}
                                            </div>
                                        </Link>

                                        {/* Lock Icon for Locked Games */}
                                        {isLocked && (
                                            <div className="absolute top-0 left-0 right-0 bottom-0 lg:right-20 flex justify-center items-center z-10 opacity-100">
                                                {/* Ensure lock icon is fully visible */}
                                                <CiLock className="text-white font-bold text-4xl" />
                                            </div>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            )}

            {/* Pagination Controls */}
            {totalApps > itemsPerPage && !loading && query && (  // Only show pagination if query is not empty and there are multiple pages
                <div className="flex justify-center mt-6">
                    <nav aria-label="Page navigation">
                        <ul className="inline-flex items-center -space-x-px">
                            <li>
                                <button
                                    onClick={() => paginate(currentPage - 1)}
                                    className="px-4 py-3 ml-0 leading-tight text-sm text-white bg-[#2c2c2c] border border-gray-300 rounded-l-lg hover:bg-gray-800 hover:text-white"
                                    disabled={currentPage === 1}
                                >
                                    Prev
                                </button>
                            </li>

                            {/* Page Number Controls */}
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => paginate(index + 1)}
                                        className={`px-4 py-3 leading-tight text-sm text-white bg-[#2c2c2c] border border-gray-300 ${currentPage === index + 1 ? 'bg-blue-600 text-white' : ''} hover:bg-gray-800 hover:text-white`}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}

                            <li>
                                <button
                                    onClick={() => paginate(currentPage + 1)}
                                    className="px-4 py-3 leading-tight text-sm text-white bg-[#2c2c2c] border border-gray-300 rounded-r-lg hover:bg-gray-800 hover:text-white"
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
        </div>
    );
};

export default SearchResults;
