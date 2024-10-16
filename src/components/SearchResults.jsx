import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const SearchResults = () => {
    const query = new URLSearchParams(useLocation().search).get('query');
    console.log(query);

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(''); // Error message state

    const handleData = async () => {
        setLoading(true); // Start loading
        try {
            const response = await axios.get(`${process.env.REACT_API}/api/apps/all`);
            setData(response.data.apps);
        } catch (error) {
            console.log("Error fetching android softwares " + error);
        } finally {
            setLoading(false); // End loading
        }
    };

    useEffect(() => {
        handleData();
    }, []);

    useEffect(() => {
        if (!query || query.length < 1) {
            setError('An empty search field was entered or the search string contains less than 1 character, due to which the search was suspended.');
            setFilteredData([]); // Clear filtered data
        } else {
            setError(''); // Clear error message
            const results = data.filter(item =>
                item.title.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredData(results);
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

            {loading ? ( // Show loading message while fetching data
                <div className="p-6 bg-[#2c2c2c] rounded-lg text-sm text-center border border-white border-opacity-10 shadow-lg">
                    <p>Loading...</p>
                </div>
            ) : error ? (
                <div>
                    <h1 className='font-medium text-3xl mb-6'>Oops! Something went wrong</h1>
                    <div className="p-6 mr-96 bg-[#2c2c2c] rounded-lg text-sm text-center border border-white border-opacity-10 shadow-lg">
                        <p>{error}</p>
                    </div>
                </div>
            ) : filteredData.length === 0 ? (
                <div>
                    <h1 className='font-medium text-3xl mb-6'>Oops! Something went wrong</h1>
                    <div className="p-6 mr-96 bg-[#2c2c2c] rounded-lg text-sm text-center border border-white border-opacity-10 shadow-lg">
                        <p>Sorry, your site search did not yield any results. Try changing or shortening your query.</p>
                    </div>
                </div>
            ) : (
                filteredData.map((ele) => {
                    const originalDate = new Date(ele.updatedAt);
                    const formattedDate = `${originalDate.getDate()}.${originalDate.getMonth() + 1}.${originalDate.getFullYear()}`;

                    return (
                        <div key={ele.id} className="flex items-center p-3 pl-6 pr-24 bg-[#242424] text-white rounded-lg border border-white border-opacity-10 shadow-lg">
                            <div className="flex items-center">
                                <img
                                    src={ele.thumbnail[0]}
                                    alt="Game Img"
                                    className="object-cover w-10 h-10 rounded-lg transition-transform duration-700 ease-in-out transform hover:scale-110"
                                />
                                <span className="ml-4 font-small text-lg">
                                    {ele.title}
                                </span>
                            </div>
                            <div className="ml-auto flex space-x-28">
                                <span className="text-gray-500 text-xs w-20 text-left">{ele.platform}</span>
                                <span className="text-gray-500 text-xs w-20 text-left">{ele.size}</span>
                                <span className="text-gray-500 text-xs w-20 text-left">{formattedDate}</span>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}

export default SearchResults;
