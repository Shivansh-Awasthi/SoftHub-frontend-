import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const images = [
    'https://res.cloudinary.com/dkp1pshuw/image/upload/v1729206949/office_ayoau9.webp',
    'https://res.cloudinary.com/dkp1pshuw/image/upload/v1729206949/drweb_hovn29.webp',
    'https://res.cloudinary.com/dkp1pshuw/image/upload/v1729206949/tg_bno0n5.webp',
];

const Home = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [data, setData] = useState([]);
    const [MacSoftData, setMacSoftData] = useState([]);
    const [Pcdata, setPcData] = useState([]);
    const [Androiddata, setAndroidData] = useState([]);
    const [Ps2data, setPs2Data] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async (url, setData) => {
        try {
            const response = await axios.get(url);
            const sortedData = response.data.apps.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setData(sortedData);
        } catch (error) {
            console.log("Error fetching data: " + error);
        }
    };

    useEffect(() => {
        fetchData(`${process.env.REACT_API}/api/apps/category/mac`, setData);
        fetchData(`${process.env.REACT_API}/api/apps/category/smac`, setMacSoftData);
        fetchData(`${process.env.REACT_API}/api/apps/category/pc`, setPcData);
        fetchData(`${process.env.REACT_API}/api/apps/category/android`, setAndroidData);
        fetchData(`${process.env.REACT_API}/api/apps/category/ps2`, setPs2Data);
    }, []);

    return (
        <div className='container mx-auto p-2'>
            {/* Slider Logic */}
            <div id="default-carousel" className="relative w-full mb-10" data-carousel="slide">
                {/* Carousel Container */}
                <div className="relative h-56 sm:h-72 md:h-96 lg:h-[32rem] overflow-hidden rounded-lg">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`transition-opacity duration-700 ease-in-out absolute inset-0 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <img src={image} className="block w-full h-full object-cover" alt={`Slide ${index + 1}`} />
                        </div>
                    ))}
                </div>

                {/* Pagination Dots */}
                <div className="absolute flex space-x-3 bottom-5 left-1/2 transform -translate-x-1/2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-500'}`}
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))}
                </div>

                {/* Previous Button */}
                <button
                    type="button"
                    className="absolute top-0 left-0 flex items-center justify-center h-full px-4 z-10"
                    onClick={() => setCurrentIndex((currentIndex - 1 + images.length) % images.length)}
                >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 hover:bg-white/50 focus:ring-4 focus:ring-white focus:outline-none">
                        <FaAngleLeft className="w-6 h-6 text-black" />
                    </span>
                </button>

                {/* Next Button */}
                <button
                    type="button"
                    className="absolute top-0 right-0 flex items-center justify-center h-full px-4 z-10"
                    onClick={() => setCurrentIndex((currentIndex + 1) % images.length)}
                >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 hover:bg-white/50 focus:ring-4 focus:ring-white focus:outline-none">
                        <FaAngleRight className="w-6 h-6 text-black" />
                    </span>
                </button>
            </div>

            {/* Mac Games Category */}
            <div className='container mx-auto p-2'>
                <div className='cover mb-6'>
                    <h1 className='font-medium text-3xl mb-4'>
                        Mac Games <span className='font-medium ml-2 text-[#8E8E8E]'>{data.length}</span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {data.slice(0, 8).map((ele) => (
                        <Link
                            key={ele._id}
                            to={`/${ele._id}`}
                            className="flex flex-col rounded-2xl h-52 overflow-hidden transition duration-300 ease-in-out ring-0 hover:ring-2 hover:ring-[#8E8E8E] hover:ring-opacity-75"
                        >
                            <figure className="flex justify-center items-center rounded-t-2xl overflow-hidden h-32">
                                <img
                                    src={ele.thumbnail[1]}
                                    alt={ele.title}
                                    className="w-full h-full object-cover rounded-t-2xl transition-transform duration-700 ease-in-out transform hover:scale-110"
                                />
                            </figure>
                            <div className="flex flex-col p-4 bg-[#262626] flex-grow">
                                <div className="text-sm font-normal text-[#ffffff] pb-2 overflow-hidden whitespace-nowrap text-ellipsis bg-[#262626]">{ele.title}</div>
                                <div className="text-xs font-thin text-[#ffffff] bg-[#262626]">Size: {ele.size}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>



            {/* Mac Softwares */}
            <div className='container mx-auto p-2'>
                <div className='cover mb-6'>
                    <h1 className='font-medium text-3xl mb-4'>
                        Mac Softwares <span className='font-medium ml-2 text-[#8E8E8E]'>{MacSoftData.length}</span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {MacSoftData.slice(0, 8).map((ele) => (
                        <Link
                            key={ele._id}
                            to={`/${ele._id}`}
                            className="flex flex-col rounded-2xl h-36 overflow-hidden transition duration-300 ease-in-out ring-1 ring-white/10 hover:ring-2 hover:ring-[#8E8E8E] hover:ring-opacity-75"
                        >
                            <div className="flex justify-center items-center h-32 bg-[#262626] pt-4">
                                <img
                                    src={ele.thumbnail[0]}
                                    alt={ele.title}
                                    className="rounded-full w-14 h-14 transition-transform duration-700 ease-in-out transform hover:scale-110 bg-[#262626]"
                                />
                            </div>
                            <div className="flex flex-col p-4 bg-[#262626]">
                                <div className="text-sm text-center font-normal text-[#ffffff] bg-[#262626] pb-2">{ele.title}</div>
                                <div className="text-xs text-center font-thin text-[#8E8E8E] bg-[#262626]">Size: {ele.size}</div>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>

            {/* PC Games */}
            <div className='container mx-auto p-2'>
                <div className='cover mb-6'>
                    <h1 className='font-medium text-3xl mb-4'>
                        Pc Games <span className='font-medium ml-2 text-[#8E8E8E]'>{Pcdata.length}</span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Pcdata.slice(0, 8).map((ele) => (
                        <Link
                            key={ele._id}
                            to={`/${ele._id}`}
                            className="flex flex-col rounded-2xl h-52 overflow-hidden transition duration-300 ease-in-out ring-0 hover:ring-2 hover:ring-[#8E8E8E] hover:ring-opacity-75"
                        >
                            <figure className="flex justify-center items-center rounded-t-2xl overflow-hidden h-32">
                                <img
                                    src={ele.thumbnail[1]}
                                    alt={ele.title}
                                    className="w-full h-full object-cover rounded-t-2xl transition-transform duration-700 ease-in-out transform hover:scale-110"
                                />
                            </figure>
                            <div className="flex flex-col p-4 bg-[#262626] flex-grow">
                                <div className="text-sm font-normal text-[#ffffff] pb-2 overflow-hidden whitespace-nowrap text-ellipsis bg-[#262626]">{ele.title}</div>
                                <div className="text-xs font-thin text-[#ffffff] bg-[#262626]">Size: {ele.size}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Android Games */}
            <div className='container mx-auto p-2'>
                <div className='cover mb-6'>
                    <h1 className='font-medium text-3xl mb-4'>
                        Android Games <span className='font-medium ml-2 text-[#8E8E8E]'>{Androiddata.length}</span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Androiddata.slice(0, 8).map((ele) => (
                        <Link
                            key={ele._id}
                            to={`/${ele._id}`}
                            className="flex flex-col rounded-2xl h-36 overflow-hidden transition duration-300 ease-in-out ring-1 ring-white/10 hover:ring-2 hover:ring-[#8E8E8E] hover:ring-opacity-75"
                        >
                            <div className="flex justify-center items-center h-32 bg-[#262626] pt-4">
                                <img
                                    src={ele.thumbnail[0]}
                                    alt={ele.title}
                                    className="rounded-full w-14 h-14 transition-transform duration-700 ease-in-out transform hover:scale-110 bg-[#262626]"
                                />
                            </div>
                            <div className="flex flex-col p-4 bg-[#262626]">
                                <div className="text-sm text-center font-normal text-[#ffffff] bg-[#262626] pb-2">{ele.title}</div>
                                <div className="text-xs text-center font-thin text-[#8E8E8E] bg-[#262626]">Size: {ele.size}</div>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>

            {/* PS2 Roms */}
            <div className='container mx-auto p-2'>
                <div className='cover mb-6'>
                    <h1 className='font-medium text-3xl mb-4'>
                        PS2 Roms <span className='font-medium ml-2 text-[#8E8E8E]'>{Ps2data.length}</span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Ps2data.slice(0, 8).map((ele) => (
                        <Link
                            key={ele._id}
                            to={`/${ele._id}`}
                            className="flex flex-col rounded-2xl h-36 overflow-hidden transition duration-300 ease-in-out ring-1 ring-white/10 hover:ring-2 hover:ring-[#8E8E8E] hover:ring-opacity-75"
                        >
                            <div className="flex justify-center items-center h-32 bg-[#262626] pt-4">
                                <img
                                    src={ele.thumbnail[0]}
                                    alt={ele.title}
                                    className="rounded-full w-14 h-14 transition-transform duration-700 ease-in-out transform hover:scale-110 bg-[#262626]"
                                />
                            </div>
                            <div className="flex flex-col p-4 bg-[#262626]">
                                <div className="text-sm text-center font-normal text-[#ffffff] bg-[#262626] pb-2">{ele.title}</div>
                                <div className="text-xs text-center font-thin text-[#8E8E8E] bg-[#262626]">Size: {ele.size}</div>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>



        </div>
    );
};

export default Home;