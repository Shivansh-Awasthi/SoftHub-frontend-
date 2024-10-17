import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Ps2 from './category/playstation/Ps2';

const images = [
    'https://www.dubaitraveltourism.com/assets/images/tours/gallery/gallery-01699700340-img-worlds-of-adventrue.jpg',
    'https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-1170x780.jpg',
    'https://flowbite.com/docs/images/carousel/carousel-3.svg',
];

const Home = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };


    // mac games

    const [data, setData] = useState([])


    const handleData = async () => {

        try {

            const response = await axios.get(`${process.env.REACT_API}/api/apps/category/mac`)
            setData(response.data.apps)

        } catch (error) {
            console.log("Error fetching mac games " + error);

        }

    }

    useEffect(() => {
        handleData()
    }, [])


    //mac softwares

    const [MacSoftData, setMacSoftData] = useState([])


    const handleMacSofData = async () => {

        try {

            const response = await axios.get(`${process.env.REACT_API}/api/apps/category/smac`)
            setMacSoftData(response.data.apps)

        } catch (error) {
            console.log("Error fetching mac softwares " + error);

        }

    }

    useEffect(() => {
        handleMacSofData()
    }, [])



    // pc games


    const [Pcdata, setPcData] = useState([])


    const handlePcData = async () => {

        try {

            const response = await axios.get(`${process.env.REACT_API}/api/apps/category/pc`)
            setPcData(response.data.apps)

        } catch (error) {
            console.log("Error fetching pc games " + error);

        }

    }

    useEffect(() => {
        handlePcData()
    }, [])




    // Android games

    const [Androiddata, setAndroidData] = useState([])


    const handleAndroidData = async () => {

        try {

            const response = await axios.get(`${process.env.REACT_API}/api/apps/category/android`)
            setAndroidData(response.data.apps)

        } catch (error) {
            console.log("Error fetching pc games " + error);

        }

    }

    useEffect(() => {
        handleAndroidData()
    }, [])



    // ps2 iso's


    const [Ps2data, setPs2Data] = useState([])


    const handlePs2Data = async () => {

        try {

            const response = await axios.get(`${process.env.REACT_API}/api/apps/category/ps2`)
            setPs2Data(response.data.apps)

        } catch (error) {
            console.log("Error fetching android softwares " + error);

        }

    }

    useEffect(() => {
        handlePs2Data()
    }, [])





    return (
        <div className='container mx-auto p-2'>





            {/* slider logic */}


            <div id="default-carousel" className="relative w-full mb-10" data-carousel="slide">
                {/* Carousel wrapper */}
                <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'block' : 'hidden'}`}
                        >
                            <img
                                src={image}
                                className="block w-full h-auto"
                                alt={`Slide ${index + 1}`}
                            />
                        </div>
                    ))}
                </div>
                {/* Slider indicators */}
                <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-500'}`}
                            aria-current={index === currentIndex}
                            aria-label={`Slide ${index + 1}`}
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))}
                </div>
                {/* Slider controls */}
                <button
                    type="button"
                    className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    onClick={prevSlide}
                >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white focus:outline-none">
                        <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                        </svg>
                        <span className="sr-only">Previous</span>
                    </span>
                </button>
                <button
                    type="button"
                    className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    onClick={nextSlide}
                >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white focus:outline-none">
                        <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                        </svg>
                        <span className="sr-only">Next</span>
                    </span>
                </button>
            </div>

            {/* slider logic ends */}



            {/* mac games category */}


            <div className='cover mb-2 flex justify-between items-center'>
                <h1 className='font-medium text-xl mb-4'>
                    Mac Games
                    <span className='font-medium ml-2 text-[#8E8E8E]'>{data.length}</span>
                </h1>
                <Link to="/category/mac/games" className="text-blue-500 hover:underline text-xs">
                    See All
                </Link>
            </div>



            <div className="flex flex-wrap justify-start gap-8 max-w-full pb-10">


                {data.slice(0, 8).map((ele) => {

                    {/* loop */ }
                    return <div key={ele._id} className="flex flex-col rounded-2xl w-64 h-52 overflow-hidden transition duration-300 ease-in-out ring-0 hover:ring-2 hover:ring-[#8E8E8E] hover:ring-opacity-75">
                        <figure className="flex justify-center items-center rounded-t-2xl overflow-hidden h-32 ">
                            <img
                                src={ele.thumbnail[1]}
                                alt={ele.title}
                                className="w-full h-full object-cover rounded-t-2xl transition-transform duration-700 ease-in-out transform hover:scale-110 "
                            />
                        </figure>
                        <div className="flex flex-col p-4 bg-[#262626]">
                            <div className="text-sm font-normal text-[#ffffff] pb-2 overflow-hidden whitespace-nowrap text-ellipsis bg-[#262626]">{ele.title}</div>
                            <div className="text-xs font-thin text-[#ffffff] bg-[#262626]">Size: {ele.size}</div>
                        </div>
                    </div>

                    {/* loop ends */ }

                })}

            </div>



            {/* mac softwares  */}


            <div className='cover mb-2 flex justify-between items-center'>
                <h1 className='font-medium text-xl mb-4'>
                    Mac Softwares
                    <span className='font-medium ml-2 text-[#8E8E8E]'>{MacSoftData.length}</span>
                </h1>
                <Link to="/category/mac/softwares" className="text-blue-500 hover:underline text-xs">
                    See All
                </Link>
            </div>

            <div className="flex flex-wrap justify-start gap-8 max-w-full pb-10">


                {/* loop */}

                {MacSoftData.slice(0, 8).map((ele) => {
                    return <div key={ele._id} className="flex flex-col rounded-2xl w-64 h-36 overflow-hidden transition duration-300 ease-in-out ring-1 ring-white/10  hover:ring-2 hover:ring-[#8E8E8E] hover:ring-opacity-75">
                        <div className="flex justify-center items-center h-32 bg-[#262626] pt-4">
                            <img
                                src={ele.thumbnail[0]}
                                alt={ele.title}
                                className="rounded-full w-14 h-14 transition-transform duration-700 ease-in-out transform hover:scale-110 bg-[#262626]"
                            />
                        </div>
                        <div className="flex flex-col p-4 bg-[#262626]">
                            <div className="text-sm text-center font-normal text-[#ffffff] bg-[#262626] pb-2"> {ele.title} </div>
                            <div className="text-xs text-center font-thin text-[#8E8E8E] bg-[#262626]">Size: {ele.size}</div>
                        </div>
                    </div>
                })}

                {/* loop ends */}
            </div>


            {/* pc games */}



            <div className='cover mb-2 flex justify-between items-center'>
                <h1 className='font-medium text-xl mb-4'>
                    PC Games
                    <span className='font-medium ml-2 text-[#8E8E8E]'>{Pcdata.length}</span>
                </h1>
                <Link to="/category/pc/games" className="text-blue-500 hover:underline text-xs">
                    See All
                </Link>
            </div>


            <div className="flex flex-wrap justify-start gap-8 max-w-full pb-10">

                {/* loop */}

                {Pcdata.slice(0, 8).map((ele) => {
                    return <div key={ele._id} className="flex flex-col rounded-2xl w-64 h-52 overflow-hidden transition duration-300 ease-in-out ring-0 hover:ring-2 hover:ring-[#8E8E8E] hover:ring-opacity-75">
                        <figure className="flex justify-center items-center rounded-t-2xl overflow-hidden h-32">
                            <img
                                src={ele.thumbnail[1]}
                                alt={ele.title}
                                className=" w-full h-full object-cover transition-transform duration-700 ease-in-out transform hover:scale-110"
                            />
                        </figure>
                        <div className="flex flex-col p-4 bg-[#262626]">
                            <div className="text-sm font-normal text-[#ffffff] pb-2 overflow-hidden whitespace-nowrap text-ellipsis bg-[#262626] ">{ele.title}</div>
                            <div className="text-xs font-thin text-[#ffffff] bg-[#262626]">Size: {ele.size}</div>
                        </div>
                    </div>
                })}

                {/* loop ends */}

            </div>


            {/* Android Games */}


            <div className='cover mb-2 flex justify-between items-center'>
                <h1 className='font-medium text-xl mb-4'>
                    Android Games
                    <span className='font-medium ml-2 text-[#8E8E8E]'>{Androiddata.length}</span>
                </h1>
                <Link to="/category/pc/games" className="text-blue-500 hover:underline text-xs">
                    See All
                </Link>
            </div>


            <div className="flex flex-wrap justify-start gap-8 max-w-full pb-10">


                {/* loop */}

                {Androiddata.slice(0, 8).map((ele) => {
                    return <div key={ele._id} className="flex flex-col rounded-2xl w-64 h-36 overflow-hidden transition duration-300 ease-in-out ring-1 ring-white/10  hover:ring-2 hover:ring-[#8E8E8E] hover:ring-opacity-75">
                        <div className="flex justify-center items-center h-32 bg-[#262626] pt-4">
                            <img
                                src={ele.thumbnail[0]}
                                alt={ele.title}
                                className="rounded-full w-14 h-14 transition-transform duration-700 ease-in-out transform hover:scale-110 bg-[#262626]"
                            />
                        </div>
                        <div className="flex flex-col p-4 bg-[#262626]">
                            <div className="text-sm text-center font-normal text-[#ffffff] bg-[#262626] pb-2"> {ele.title} </div>
                            <div className="text-xs text-center font-thin text-[#8E8E8E] bg-[#262626]">Size: {ele.size}</div>
                        </div>
                    </div>
                })}

                {/* loop ends */}
            </div>


            {/* Ps2 roms */}

            <div className='cover mb-2 flex justify-between items-center'>
                <h1 className='font-medium text-xl mb-4'>
                    PS2 Roms
                    <span className='font-medium ml-2 text-[#8E8E8E]'>{Ps2data.length}</span>
                </h1>
                <Link to="/category/ps2/iso" className="text-blue-500 hover:underline text-xs">
                    See All
                </Link>
            </div>

            <div className="flex flex-wrap justify-start gap-8 max-w-full">

                {/* loop */}

                {Ps2data.slice(0, 8).map((ele) => {
                    return <div key={ele._id} className="flex flex-col rounded-2xl w-64 h-36 overflow-hidden transition duration-300 ease-in-out ring-1 ring-white/10  hover:ring-2 hover:ring-[#8E8E8E] hover:ring-opacity-75">
                        <div className="flex justify-center items-center h-32 bg-[#262626] pt-4">
                            <img
                                src={ele.thumbnail[0]}
                                alt={ele.title}
                                className="rounded-full w-14 h-14 transition-transform duration-700 ease-in-out transform hover:scale-110 bg-[#262626]"
                            />
                        </div>
                        <div className="flex flex-col p-4 bg-[#262626]">
                            <div className="text-sm text-center font-normal text-[#ffffff] bg-[#262626] pb-2"> {ele.title} </div>
                            <div className="text-xs text-center font-thin text-[#8E8E8E] bg-[#262626]">Size: {ele.size}</div>
                        </div>
                    </div>
                })}

                {/* loop ends */}
            </div>



        </div>
    );
};

export default Home;
