import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loading/Loader';

const SearchResults = () => {
    const query = new URLSearchParams(useLocation().search).get('query');
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(48); // 48 items per page

    const handleData = async () => {
        setLoading(true);
        let allData = [];
        let page = 1;
        const limit = 100;

        try {
            while (true) {
                const response = await axios.get(`${process.env.REACT_API}/api/apps/all`, {
                    params: {
                        page,
                        limit,
                    },
                });

                const apps = response.data.apps;

                if (apps.length === 0) {
                    break;
                }

                allData = [...allData, ...apps];
                page += 1;
            }

            setData(allData);
        } catch (error) {
            console.log("Error fetching apps:", error);
            setError('Failed to load data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleData();
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            if (!query || query.length < 1) {
                setError('Search field is empty.');
                setFilteredData([]);
            } else {
                setError('');
                const results = data.filter(item =>
                    item.title.toLowerCase().includes(query.toLowerCase())
                );

                setFilteredData(results);
            }
        }
    }, [data, query]);


    useEffect(() => {
        if (query) {
            setCurrentPage(1); // Reset to page 1 when query changes
        }
    }, [query]);

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

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
                {currentItems.length > 0 && !error && (
                    <h1 className='font-medium text-3xl mb-4'>
                        Search Results <span className='font-medium ml-2 text-[#8E8E8E]'>{filteredData.length}</span>
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
            ) : currentItems.length === 0 ? (
                <div>
                    <h1 className='font-medium text-3xl mb-6'>Oops! Something went wrong</h1>
                    <div className="p-6 mr-96 bg-[#2c2c2c] rounded-lg text-sm text-center border border-white border-opacity-10 shadow-lg">
                        <p>Sorry, your site search did not yield any results. Try changing or shortening your query.</p>
                    </div>
                </div>
            ) : (
                <div className="w-full md:w-full p-4 border border-gray-200 border-opacity-5 bg-[#262626] rounded-lg shadow  sm:p-8 ">
                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-700">
                            {currentItems.map((ele) => (
                                <li key={ele._id} className="py-2 sm:py-2">
                                    <Link to={`/download/${createSlug(ele.platform)}/${createSlug(ele.title)}/${ele._id}`} className="flex items-center justify-between w-full">
                                        <div className="flex-shrink-0">
                                            <img className="w-12 h-12 rounded-xl object-cover hover:rounded-full" src={ele.thumbnail[0]} alt={ele.title} />
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
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {/* Pagination Controls */}
            {filteredData.length > itemsPerPage && !loading && (
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
