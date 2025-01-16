import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CiLock } from 'react-icons/ci'; // Lock Icon
import { useNavigate } from 'react-router-dom';

const Mac = () => {
    const [data, setData] = useState([]);
    const [totalApps, setTotalApps] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [userData, setUserData] = useState(null); // Store user data
    const itemsPerPage = 48; // Set the number of items per page
    const navigate = useNavigate();

    const handleData = async (page) => {
        try {
            const response = await axios.get(`${process.env.REACT_API}/api/apps/category/mac?page=${page}&limit=${itemsPerPage}`);
            setData(response.data.apps);
            setTotalApps(response.data.total); // Set total apps for pagination
        } catch (error) {
            console.log("Error fetching mac games: " + error);
        }
    };

    const fetchUserData = async () => {
        try {
            // If the token is stored in localStorage, send it in the request
            const response = await axios.get(`${process.env.REACT_API}/api/user`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}` // Or fetch from cookies if necessary
                }
            });
            setUserData(response.data); // Store user data
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        handleData(currentPage);
        fetchUserData(); // Fetch user data if logged in
    }, [currentPage]);

    // Get purchased games from localStorage (if logged in)
    const purchasedGames = JSON.parse(localStorage.getItem("gData")) || [];
    const isAdmin = localStorage.getItem("role") === 'ADMIN';  // Check if user is admin

    // Calculate total pages
    const totalPages = Math.ceil(totalApps / itemsPerPage);

    // Generate an array of page numbers to display (7 clickable pages)
    const pageNumbers = [];
    const maxPagesToShow = 7;

    let startPage = Math.max(1, currentPage - 3); // Ensure the first page is at least 1
    let endPage = Math.min(totalPages, currentPage + 3); // Ensure the last page is not beyond the total pages

    // Adjust to show maxPagesToShow if there's space
    if (endPage - startPage < maxPagesToShow - 1) {
        if (currentPage <= 3) {
            endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
        } else if (currentPage + 3 >= totalPages) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

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
                    Mac Games <span className='font-medium ml-2 text-[#8E8E8E]'>{totalApps}</span>
                </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
                {data.map((ele) => {
                    // Check if game is purchased by the user
                    const isPurchased = purchasedGames.includes(ele._id); // Compare game ID with purchased games
                    const isUnlocked = isAdmin || !ele.isPaid || isPurchased; // Unlock if Admin or if it's free or the user purchased it
                    const isLoggedIn = !!userData; // Check if user is logged in (i.e. if we have userData)

                    return (
                        <div
                            key={ele._id}
                            className={`relative flex flex-col rounded-2xl h-52 overflow-hidden transition duration-300 ease-in-out ring-0 ${isUnlocked ? 'hover:ring-2 hover:ring-[#8E8E8E] hover:ring-opacity-75' : 'opacity-50 cursor-not-allowed'}`}
                        >
                            {!isUnlocked && (
                                <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
                                    <CiLock className="text-white font-bold text-4xl mb-16" style={{ strokeWidth: 1 }} />
                                </div>
                            )}

                            <Link
                                to={isUnlocked ? `/download/${createSlug(ele.platform)}/${createSlug(ele.title)}/${ele._id}` : '#'}
                                className={`flex flex-col rounded-2xl h-full overflow-hidden ${!isUnlocked ? 'pointer-events-none' : ''}`}
                            >
                                <figure className="flex justify-center items-center rounded-t-2xl overflow-hidden h-full">
                                    <img
                                        src={ele.coverImg}
                                        alt={ele.title}
                                        className="w-full h-full object-cover rounded-t-2xl transition-transform duration-700 ease-in-out transform hover:scale-110"
                                    />
                                </figure>
                                <div className="flex flex-col p-3 bg-[#262626] flex-grow">
                                    <div className="text-sm font-normal text-[#ffffff] pb-2 overflow-hidden whitespace-nowrap text-ellipsis bg-[#262626]">{ele.title}</div>
                                    <div className="text-xs font-thin text-[#ffffff] bg-[#262626]">Size: {ele.size}</div>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-10">
                {/* Previous Button */}
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 mx-2 bg-gray-700 text-white rounded disabled:opacity-50 hover:scale-110"
                >
                    Previous
                </button>

                {/* Page Numbers */}
                {pageNumbers.map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`px-4 py-2 mx-1 rounded text-gray-300 ${currentPage === pageNumber ? 'bg-blue-600' : 'bg-[#2c2c2c] hover:bg-black hover:text-white hover:scale-110'}`}
                    >
                        {pageNumber}
                    </button>
                ))}

                {/* Next Button */}
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 mx-2 bg-gray-700 text-white rounded disabled:opacity-50 hover:scale-110"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Mac;
