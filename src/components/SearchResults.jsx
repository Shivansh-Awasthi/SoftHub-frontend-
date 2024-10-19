import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loading Animations/Loader';

const SearchResults = () => {
    const query = new URLSearchParams(useLocation().search).get('query');

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


    const handleData = async () => {
        setLoading(true);
        try {
            // Make sure the URL is correct
            const response = await axios.get(`${process.env.REACT_API}/api/apps/all`);
            setData(response.data.apps);
        } catch (error) {
            console.log("Error fetching apps: ", error);
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





    return (
        <div>
            <div className='cover mb-6'>
                {filteredData.length > 0 && !error && (
                    <h1 className='font-medium text-3xl mb-4'>
                        Search Results <span className='font-medium ml-2 text-[#8E8E8E]'>{filteredData.length}</span>
                    </h1>
                )}
            </div>




            <div className="w-full p-4 border border-gray-200 border-opacity-5 bg-[#262626] rounded-lg shadow  sm:p-8 ">
                <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-700">

                        {/* loop */}
                        {filteredData.map((ele) => (
                            <li key={ele._id} className="py-2 sm:py-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex-shrink-0">
                                        <img className="w-12 h-12 rounded-xl" src={ele.thumbnail[0]} alt={ele.title} />
                                    </div>
                                    <div className="flex-1 min-w-0 ms-4">
                                        <p className="text-normal font-light truncate text-white">
                                            {ele.title}
                                        </p>
                                        <p className="text-sm text-gray-500 truncate ">
                                            {ele.platform}
                                        </p>
                                    </div>
                                    <div className="flex-1 flex justify-center text-sm font-semibold text-gray-500 hidden sm:block">
                                        {ele.size}
                                    </div>
                                    <div className="text-right text-sm text-gray-500 hidden md:block ">
                                        {new Date(ele.updatedAt).toLocaleDateString()}
                                    </div>
                                </div>
                            </li>
                        ))}
                        {/* loop ends */}

                    </ul>
                </div>
            </div>



        </div>
    );
}

export default SearchResults;