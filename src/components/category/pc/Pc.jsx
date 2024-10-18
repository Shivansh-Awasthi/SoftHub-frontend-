import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Pc = () => {
    const [data, setData] = useState([]);
    const [totalApps, setTotalApps] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 48;

    const handleData = async (page) => {
        try {
            const response = await axios.get(`${process.env.REACT_API}/api/apps/category/pc?page=${page}&limit=${itemsPerPage}`);
            setData(response.data.apps);
            setTotalApps(response.data.total);
        } catch (error) {
            console.log("Error fetching pc games " + error);
        }
    };

    useEffect(() => {
        handleData(currentPage);
    }, [currentPage]);

    const totalPages = Math.ceil(totalApps / itemsPerPage);

    return (

        <div className='container mx-auto p-2'>
            <div className='cover mb-6'>
                <h1 className='font-medium text-3xl mb-4'>Games <span className='font-medium ml-2 text-[#8E8E8E]'>{totalApps}</span></h1>
            </div>

            <div className="flex flex-wrap justify-start gap-8 max-w-full">
                {data.map((ele) => (
                    <Link
                        key={ele._id}
                        to={`/${ele._id}`}
                        className="flex flex-col rounded-2xl w-64 h-52 overflow-hidden transition duration-300 ease-in-out ring-0 hover:ring-2 hover:ring-[#8E8E8E] hover:ring-opacity-75"
                    >
                        <figure className="flex justify-center items-center rounded-t-2xl overflow-hidden h-32">
                            <img
                                src={ele.thumbnail[1]}
                                alt={ele.title}
                                className="w-full h-full object-cover transition-transform duration-700 ease-in-out transform hover:scale-110"
                            />
                        </figure>
                        <div className="flex flex-col p-4 bg-[#262626]">
                            <div className="text-sm font-normal text-[#ffffff] pb-2 overflow-hidden whitespace-nowrap text-ellipsis">{ele.title}</div>
                            <div className="text-xs font-thin text-[#ffffff]">Size: {ele.size}</div>
                        </div>
                    </Link>
                ))}
            </div>

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
        </div >

    );
};

export default Pc;