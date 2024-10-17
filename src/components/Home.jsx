import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const images = [
    'https://www.dubaitraveltourism.com/assets/images/tours/gallery/gallery-01699700340-img-worlds-of-adventrue.jpg',
    'https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-1170x780.jpg',
    'https://flowbite.com/docs/images/carousel/carousel-3.svg',
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
                <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                    {images.map((image, index) => (
                        <div key={index} className={`transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'block' : 'hidden'}`}>
                            <img src={image} className="block w-full h-auto" alt={`Slide ${index + 1}`} />
                        </div>
                    ))}
                </div>
                <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
                    {images.map((_, index) => (
                        <button key={index} type="button" className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-500'}`} onClick={() => setCurrentIndex(index)} />
                    ))}
                </div>
                <button type="button" className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4" onClick={() => setCurrentIndex((currentIndex - 1 + images.length) % images.length)}>
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white focus:outline-none">
                        {/* Previous SVG */}
                    </span>
                </button>
                <button type="button" className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4" onClick={() => setCurrentIndex((currentIndex + 1) % images.length)}>
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white focus:outline-none">
                        {/* Next SVG */}
                    </span>
                </button>
            </div>

            {/* Mac Games Category */}
            <div className='cover mb-2 flex justify-between items-center'>
                <h1 className='font-medium text-xl mb-4'>
                    Mac Games
                    <span className='font-medium ml-2 text-[#8E8E8E]'>{data.length}</span>
                </h1>
                <Link to="/category/mac/games" className="text-blue-500 hover:underline text-xs">See All</Link>
            </div>
            <div className="flex flex-wrap justify-start gap-8 max-w-full pb-10">
                {data.slice(0, 8).map((ele) => (
                    <Link key={ele._id} to={`/${ele._id}`} className="flex flex-col rounded-2xl w-64 h-52 overflow-hidden transition duration-300 ease-in-out ring-0 hover:ring-2 hover:ring-[#8E8E8E] hover:ring-opacity-75">
                        <figure className="flex justify-center items-center rounded-t-2xl overflow-hidden h-32">
                            <img src={ele.thumbnail[1]} alt={ele.title} className="w-full h-full object-cover rounded-t-2xl transition-transform duration-700 ease-in-out transform hover:scale-110" />
                        </figure>
                        <div className="flex flex-col p-4 bg-[#262626]">
                            <div className="text-sm font-normal text-[#ffffff] pb-2 overflow-hidden whitespace-nowrap text-ellipsis bg-[#262626]">{ele.title}</div>
                            <div className="text-xs font-thin text-[#ffffff] bg-[#262626]">Size: {ele.size}</div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Mac Softwares */}
            <div className='cover mb-2 flex justify-between items-center'>
                <h1 className='font-medium text-xl mb-4'>
                    Mac Softwares
                    <span className='font-medium ml-2 text-[#8E8E8E]'>{MacSoftData.length}</span>
                </h1>
                <Link to="/category/mac/softwares" className="text-blue-500 hover:underline text-xs">See All</Link>
            </div>
            <div className="flex flex-wrap justify-start gap-8 max-w-full pb-10">
                {MacSoftData.slice(0, 8).map((ele) => (
                    <Link key={ele._id} to={`/${ele._id}`} className="flex flex-col rounded-2xl w-64 h-36 overflow-hidden transition duration-300 ease-in-out ring-1 ring-white/10 hover:ring-2 hover:ring-[#8E8E8E] hover:ring-opacity-75">
                        <div className="flex justify-center items-center h-32 bg-[#262626] pt-4">
                            <img src={ele.thumbnail[0]} alt={ele.title} className="rounded-full w-14 h-14 transition-transform duration-700 ease-in-out transform hover:scale-110 bg-[#262626]" />
                        </div>
                        <div className="flex flex-col p-4 bg-[#262626]">
                            <div className="text-sm text-center font-normal text-[#ffffff] bg-[#262626] pb-2">{ele.title}</div>
                            <div className="text-xs text-center font-thin text-[#8E8E8E] bg-[#262626]">Size: {ele.size}</div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* PC Games */}
            <div className='cover mb-2 flex justify-between items-center'>
                <h1 className='font-medium text-xl mb-4'>
                    PC Games
                    <span className='font-medium ml-2 text-[#8E8E8E]'>{Pcdata.length}</span>
                </h1>
                <Link to="/category/pc/games" className="text-blue-500 hover:underline text-xs">See All</Link>
            </div>
            <div className="flex flex-wrap justify-start gap-8 max-w-full pb-10">
                {Pcdata.slice(0, 8).map((ele) => (
                    <Link key={ele._id} to={`/${ele._id}`} className="flex flex-col rounded-2xl w-64 h-52 overflow-hidden transition duration-300 ease-in-out ring-0 hover:ring-2 hover:ring-[#8E8E8E] hover:ring-opacity-75">
                        <figure className="flex justify-center items-center rounded-t-2xl overflow-hidden h-32">
                            <img src={ele.thumbnail[1]} alt={ele.title} className="w-full h-full object-cover transition-transform duration-700 ease-in-out transform hover:scale-110" />
                        </figure>
                        <div className="flex flex-col p-4 bg-[#262626]">
                            <div className="text-sm font-normal text-[#ffffff] pb-2 overflow-hidden whitespace-nowrap text-ellipsis bg-[#262626]">{ele.title}</div>
                            <div className="text-xs font-thin text-[#ffffff] bg-[#262626]">Size: {ele.size}</div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Android Games */}
            <div className='cover mb-2 flex justify-between items-center'>
                <h1 className='font-medium text-xl mb-4'>
                    Android Games
                    <span className='font-medium ml-2 text-[#8E8E8E]'>{Androiddata.length}</span>
                </h1>
                <Link to="/category/android/games" className="text-blue-500 hover:underline text-xs">See All</Link>
            </div>
            <div className="flex flex-wrap justify-start gap-8 max-w-full pb-10">
                {Androiddata.slice(0, 8).map((ele) => (
                    <Link key={ele._id} to={`/${ele._id}`} className="flex flex-col rounded-2xl w-64 h-52 overflow-hidden transition duration-300 ease-in-out ring-0 hover:ring-2 hover:ring-[#8E8E8E] hover:ring-opacity-75">
                        <figure className="flex justify-center items-center rounded-t-2xl overflow-hidden h-32">
                            <img src={ele.thumbnail[1]} alt={ele.title} className="w-full h-full object-cover rounded-t-2xl transition-transform duration-700 ease-in-out transform hover:scale-110" />
                        </figure>
                        <div className="flex flex-col p-4 bg-[#262626]">
                            <div className="text-sm font-normal text-[#ffffff] pb-2 overflow-hidden whitespace-nowrap text-ellipsis bg-[#262626]">{ele.title}</div>
                            <div className="text-xs font-thin text-[#ffffff] bg-[#262626]">Size: {ele.size}</div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* PS2 Roms */}
            <div className='cover mb-2 flex justify-between items-center'>
                <h1 className='font-medium text-xl mb-4'>
                    PS2 Roms
                    <span className='font-medium ml-2 text-[#8E8E8E]'>{Ps2data.length}</span>
                </h1>
                <Link to="/category/ps2/games" className="text-blue-500 hover:underline text-xs">See All</Link>
            </div>
            <div className="flex flex-wrap justify-start gap-8 max-w-full pb-10">
                {Ps2data.slice(0, 8).map((ele) => (
                    <Link key={ele._id} to={`/${ele._id}`} className="flex flex-col rounded-2xl w-64 h-52 overflow-hidden transition duration-300 ease-in-out ring-0 hover:ring-2 hover:ring-[#8E8E8E] hover:ring-opacity-75">
                        <figure className="flex justify-center items-center rounded-t-2xl overflow-hidden h-32">
                            <img src={ele.thumbnail[1]} alt={ele.title} className="w-full h-full object-cover rounded-t-2xl transition-transform duration-700 ease-in-out transform hover:scale-110" />
                        </figure>
                        <div className="flex flex-col p-4 bg-[#262626]">
                            <div className="text-sm font-normal text-[#ffffff] pb-2 overflow-hidden whitespace-nowrap text-ellipsis bg-[#262626]">{ele.title}</div>
                            <div className="text-xs font-thin text-[#ffffff] bg-[#262626]">Size: {ele.size}</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Home;
