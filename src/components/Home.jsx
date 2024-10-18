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
                <div className="relative h-56 md:h-72 lg:h-96 overflow-hidden rounded-lg">
                    {images.map((image, index) => (
                        <div key={index} className={`transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'block' : 'hidden'}`}>
                            <img src={image} className="block w-full h-full object-cover" alt={`Slide ${index + 1}`} />
                        </div>
                    ))}
                </div>
                <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`w-3 h-3 rounded-full transition-colors duration-300 ${index === currentIndex ? 'bg-white' : 'bg-gray-500'}`}
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))}
                </div>
                <button
                    type="button"
                    className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4"
                    onClick={() => setCurrentIndex((currentIndex - 1 + images.length) % images.length)}
                >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white focus:outline-none">
                        <FaAngleLeft />
                    </span>
                </button>
                <button
                    type="button"
                    className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4"
                    onClick={() => setCurrentIndex((currentIndex + 1) % images.length)}
                >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white focus:outline-none">
                        <FaAngleRight />
                    </span>
                </button>
            </div>

            {/* Categories Section */}
            {[
                { title: 'Mac Games', data: data, category: 'mac/games' },
                { title: 'Mac Softwares', data: MacSoftData, category: 'mac/softwares' },
                { title: 'PC Games', data: Pcdata, category: 'pc/games' },
                { title: 'Android Games', data: Androiddata, category: 'android/games' },
                { title: 'PS2 Roms', data: Ps2data, category: 'ps2/games' },
            ].map(({ title, data, category }) => (
                <div key={title}>
                    <div className='cover mb-2 flex justify-between items-center'>
                        <h1 className='font-medium text-xl mb-4'>
                            {title}
                            <span className='font-medium ml-2 text-[#8E8E8E]'>{data.length}</span>
                        </h1>
                        <Link to={`/category/${category}`} className="text-blue-500 hover:underline text-xs">See All</Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-full pb-10">
                        {data.slice(0, 8).map((ele) => (
                            <Link key={ele._id} to={`/${ele._id}`} className="flex flex-col rounded-2xl overflow-hidden transition duration-300 ease-in-out ring-0 hover:ring-2 hover:ring-[#8E8E8E] hover:ring-opacity-75">
                                <figure className="flex justify-center items-center overflow-hidden h-32">
                                    <img src={ele.thumbnail[1]} alt={ele.title} className="w-full h-full object-cover transition-transform duration-700 ease-in-out transform hover:scale-110" />
                                </figure>
                                <div className="flex flex-col p-4 bg-[#262626]">
                                    <div className="text-sm font-normal text-[#ffffff] pb-2 overflow-hidden whitespace-nowrap text-ellipsis">{ele.title}</div>
                                    <div className="text-xs font-thin text-[#ffffff]">Size: {ele.size}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Home;
