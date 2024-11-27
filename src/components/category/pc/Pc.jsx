import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Pc = () => {
    const [data, setData] = useState([]);
    const [totalApps, setTotalApps] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 48; // Set the number of items per page

    const handleData = async (page) => {
        try {
            const response = await axios.get(`${process.env.REACT_API}/api/apps/category/pc?page=${page}&limit=${itemsPerPage}`);
            setData(response.data.apps);
            setTotalApps(response.data.total); // Set total apps for pagination
        } catch (error) {
            console.log("Error fetching pc games " + error);
        }
    };

    useEffect(() => {
        handleData(currentPage);
    }, [currentPage]);

    // Calculate total pages
    const totalPages = Math.ceil(totalApps / itemsPerPage);

    return (
        <div className='container mx-auto p-2'>
            <div className='cover mb-6'>
                <h1 className='font-medium text-3xl mb-4'>Games <span className='font-medium ml-2 text-[#8E8E8E]'>{totalApps}</span></h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
                {data.map((ele) => (
                    <Link
                        key={ele._id}
                        to={`/${ele._id}`}
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

export default Pc;