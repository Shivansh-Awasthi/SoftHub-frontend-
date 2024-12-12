import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { LiveCounter } from './LiveCounter';


const images = [
    'https://i.pinimg.com/originals/a7/c7/8c/a7c78c1cf8554d3256eba773fd3bfcbe.gif',
    'https://res.cloudinary.com/dkp1pshuw/image/upload/v1729206949/tg_bno0n5.webp',
    'https://res.cloudinary.com/dkp1pshuw/image/upload/v1729425726/adobe_fdeqsq.webp',
    'https://res.cloudinary.com/dkp1pshuw/image/upload/v1729206949/office_ayoau9.webp',
];

const Home = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [data, setData] = useState([]);
    const [MacSoftData, setMacSoftData] = useState([]);
    const [Pcdata, setPcData] = useState([]);
    const [Androiddata, setAndroidData] = useState([]);
    const [Ps2data, setPs2Data] = useState([]);
    const [loading, setLoading] = useState(true);


    //total games

    const [totalMacGames, setTotalMacGames] = useState(0)
    const [totalPcGames, setTotalPcGames] = useState(0)
    const [totalMacSoft, setTotalMacSoft] = useState(0)
    const [totalAndroidGames, setTotalAndroidGames] = useState(0)
    const [totalPs2Iso, setTotalPS2Iso] = useState(0)



    // mac games

    const handleData = async () => {

        try {

            const initialResponse = await axios.get(`${process.env.REACT_API}/api/apps/category/mac?page=1&limit=48`)

            // dynamic page logic 

            const limitPage = 48;
            const totalPage = initialResponse.data.total

            const latestPage = Math.ceil(totalPage / limitPage);



            const response = await axios.get(`${process.env.REACT_API}/api/apps/category/mac?page=${latestPage}&limit=48`);


            setData(response.data.apps);
            setTotalMacGames(response.data.total)

        } catch (error) {

            console.log("Error fetching mac games " + error);

        }

    }

    useEffect(() => {
        handleData()
    }, [])



    // mac soft

    const handleMacSoftData = async () => {

        try {

            const initialResponse = await axios.get(`${process.env.REACT_API}/api/apps/category/smac`)




            const response = await axios.get(`${process.env.REACT_API}/api/apps/category/smac`);


            setMacSoftData(response.data.apps);
            setTotalMacSoft(response.data.total)

        } catch (error) {

            console.log("Error fetching mac soft " + error);

        }

    }

    useEffect(() => {
        handleMacSoftData()
    }, [])





    // pc games

    const handlePcData = async () => {

        try {

            const initialResponse = await axios.get(`${process.env.REACT_API}/api/apps/category/pc?page=1&limit=48`)

            // dynamic page logic 

            const limitPage = 48;
            const totalPage = initialResponse.data.total

            const latestPage = Math.ceil(totalPage / limitPage);



            const response = await axios.get(`${process.env.REACT_API}/api/apps/category/pc?page=${latestPage}&limit=48`);

            setPcData(response.data.apps)
            setTotalPcGames(response.data.total)


        } catch (error) {

            console.log("Error fetching PC games " + error);

        }

    }

    useEffect(() => {
        handlePcData()
    }, [])



    // Android Games

    const handleAndroidData = async () => {

        try {

            const response = await axios.get(`${process.env.REACT_API}/api/apps/category/android`);


            setAndroidData(response.data.apps);
            setTotalAndroidGames(response.data.total)

        } catch (error) {

            console.log("Error fetching Android games " + error);

        }

    }

    useEffect(() => {
        handleAndroidData()
    }, [])




    // PS2 iso

    const handlePS2Data = async () => {

        try {

            const response = await axios.get(`${process.env.REACT_API}/api/apps/category/ps2`);


            setPs2Data(response.data.apps);
            setTotalPS2Iso(response.data.total)

        } catch (error) {

            console.log("Error fetching PS2 ISO's " + error);

        }

    }

    useEffect(() => {
        handlePS2Data()
    }, [])



    // for count visitors accessable/visible only for the admins

    const [isAdmin, setIsAdmin] = useState(false);

    // Check the role in localStorage on component mount
    useEffect(() => {
        const role = localStorage.getItem('role');
        if (role === 'ADMIN') {
            setIsAdmin(true); // If the role is "ADMIN", set state to true
        }
    }, []);



    return (
        <div className='container mx-auto p-2'>
            {/* Slider Logic */}
            <div id="default-carousel" className="relative w-full mb-10" data-carousel="slide">
                {/* Carousel Container */}
                <div className="relative h-56 sm:h-72 md:h-88 lg:h-[25rem] overflow-hidden rounded-lg">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`transition-opacity duration-700 ease-in-out absolute inset-0 ${index === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                        >
                            <img src={image} className="block w-full h-full object-cover" alt={`Slide ${index + 1}`} />


                            {/* Overlay text and button on the 4th image (index === 0) */}
                            {index === 2 && (
                                <div className="absolute inset-0 flex flex-col text-white p-8 ml-6 mt-4 md:p-0 md:ml-20 md:mt-28 z-0 w-full ">
                                    <h2 className="text-lg font-thin mb-4 sm:text-base md:text-lg">SOFTWARE</h2>
                                    <p className="mb-4 font-semibold sm:text-sm md:text-base overflow-hidden whitespace-nowrap text-ellipsis">Download Free Softwares On Your Mac</p>
                                    <div className='w-fill'>
                                        <a href="https://toxicgames.in/category/mac/softwares" rel="noopener noreferrer">
                                            <button className="mx-auto ml-0 px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 sm:px-4 sm:py-2 md:px-6 md:py-3 overflow-hidden whitespace-nowrap text-ellipsis">
                                                Download Now
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            )}


                            {/* Overlay text and button on the 4th image (index === 1) */}
                            {index === 3 && (
                                <div className="absolute inset-0 flex flex-col text-white p-8 ml-6 mt-4 md:p-0 md:ml-20 md:mt-28 z-0">
                                    <h2 className="text-lg font-thin mb-4 sm:text-base md:text-lg">SOFTWARE</h2>
                                    <p className="mb-6 font-semibold sm:text-sm md:text-base overflow-hidden whitespace-nowrap text-ellipsis">Get Microsoft Office 365 For Free On Your Mac</p>
                                    <div className='w-fill'>
                                        <a href="https://toxicgames.in/67150d922b746bdfa2e4f03d" rel="noopener noreferrer">
                                            <button className="mx-auto ml-0 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 sm:px-4 sm:py-2 md:px-6 md:py-3 overflow-hidden whitespace-nowrap text-ellipsis">
                                                Get it Now..
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            )}




                            {/* Overlay text and button on the 4th image (index === 2) */}
                            {index === 0 && (
                                <div className="absolute inset-0 flex flex-col text-white p-8 ml-6 mt-4 md:p-0 md:ml-20 md:mt-28 z-0">
                                    <h2 className="text-lg font-thin mb-4 sm:text-base md:text-lg">Macbook Games</h2>
                                    <p className="mb-6 font-semibold sm:text-sm md:text-base overflow-hidden whitespace-nowrap text-ellipsis">Download Your Favourite Games for Free.</p>
                                    <div className='w-fill'>
                                        <a href="https://toxicgames.in/category/mac/games" rel="noopener noreferrer">
                                            <button className="mx-auto ml-0 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 sm:px-4 sm:py-2 md:px-6 md:py-3 overflow-hidden whitespace-nowrap text-ellipsis">
                                                Download Now..
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            )}



                            {/* Overlay text and button on the 4th image (index === 3) */}
                            {index === 1 && (
                                <div className="absolute inset-0 flex flex-col text-white p-8 ml-6 mt-4 md:p-0 md:ml-20 md:mt-28 z-0">
                                    <h2 className="text-lg font-thin mb-4 sm:text-base md:text-lg">TELEGRAM CHAT</h2>
                                    <p className="mb-6 font-semibold sm:text-sm md:text-base overflow-hidden whitespace-nowrap text-ellipsis">Join Our Channel @freemacgames</p>
                                    <div className='w-fill'>
                                        <a href="https://t.me/freemacgames" target="_blank" rel="noopener noreferrer">
                                            <button className="mx-auto ml-0 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 sm:px-4 sm:py-2 md:px-6 md:py-3 overflow-hidden whitespace-nowrap text-ellipsis">
                                                Join our Telegram
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            )}

                        </div>
                    ))}
                </div>

                {/* Pagination Dots */}
                <div className="absolute flex space-x-2 bottom-7 left-1/2 transform -translate-x-1/2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`w-8 h-1 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-500'}`}
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
            <div className="container mx-auto p-2 mb-6">
                <div className='cover mb-5 flex justify-between items-center'>
                    <h1 className='font-medium text-2xl md:text-3xl'>
                        Mac Games <span className='font-medium ml-2 text-[#8E8E8E]'>{totalMacGames}</span>
                    </h1>
                    <Link to={`/category/mac/games`} className="text-blue-500 hover:underline text-xs">See All</Link>
                </div>

                {/* Conditional rendering based on data existence */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
                    {Array.isArray(data) && data.length > 0 ? (
                        data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).slice(0, 8).map((ele) => (
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
                                    <div className="text-sm font-normal text-[#ffffff] pb-2 overflow-hidden whitespace-nowrap text-ellipsis bg-[#262626]">{ele.title}</div>
                                    <div className="text-xs font-thin text-[#ffffff] bg-[#262626]">Size: {ele.size}</div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="text-center text-gray-500">Loading Mac Games...</div> // Loading state
                    )}
                </div>
            </div>





            {/* Mac Softwares */}
            {/* Mac Softwares */}
            <div className='container mx-auto p-2 mb-6'>
                <div className='cover mb-5 flex justify-between items-center'>
                    <h1 className='font-medium text-2xl md:text-3xl'>
                        Mac Softwares <span className='font-medium ml-2 text-[#8E8E8E]'>{totalMacSoft}</span>
                    </h1>
                    <Link to={`/category/mac/softwares`} className="text-blue-500 hover:underline text-xs">See All</Link>
                </div>

                {/* Conditional rendering for Mac Softwares */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Array.isArray(MacSoftData) && MacSoftData.length > 0 ? (
                        MacSoftData.slice(0, 8).map((ele) => (
                            <Link
                                key={ele._id}
                                to={`/${ele._id}`}
                                className="flex flex-col rounded-2xl h-36 overflow-hidden transition duration-300 ease-in-out ring-1 ring-white/10 hover:ring-2 hover:ring-[#8E8E8E] hover:ring-opacity-75"
                            >
                                <div className="flex justify-center items-center h-32 bg-[#262626] pt-4">
                                    <img
                                        src={ele.thumbnail[0]}
                                        alt={ele.title}
                                        className="rounded-lg w-14 h-14 transition-transform duration-700 ease-in-out transform hover:scale-110 bg-[#262626]"
                                    />
                                </div>
                                <div className="flex flex-col p-4 bg-[#262626]">
                                    <div className="text-sm text-center font-normal overflow-hidden whitespace-nowrap text-ellipsis text-[#ffffff] bg-[#262626] pb-2">{ele.title}</div>
                                    <div className="text-xs text-center font-thin text-[#8E8E8E] bg-[#262626]">Size: {ele.size}</div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="text-center text-gray-500">Loading Mac Softwares...</div> // Loading state
                    )}
                </div>
            </div>


            {/* PC Games */}
            {/* PC Games */}
            <div className='container mx-auto p-2 mb-6'>
                <div className='cover mb-5 flex justify-between items-center'>
                    <h1 className='font-medium text-2xl md:text-3xl'>
                        Pc Games <span className='font-medium ml-2 text-[#8E8E8E]'>{totalPcGames}</span>
                    </h1>
                    <Link to={`/category/pc/games`} className="text-blue-500 hover:underline text-xs">See All</Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
                    {/* Check if Pcdata is an array and has items */}
                    {Array.isArray(Pcdata) && Pcdata.length > 0 ? (
                        Pcdata.slice(0, 8).map((ele) => (
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
                                    <div className="text-sm font-normal text-[#ffffff] pb-2 overflow-hidden whitespace-nowrap text-ellipsis bg-[#262626]">{ele.title}</div>
                                    <div className="text-xs font-thin text-[#ffffff] bg-[#262626]">Size: {ele.size}</div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="text-center text-gray-500">Loading PC Games...</div> // Loading state
                    )}
                </div>
            </div>





            {/* Android Games */}
            {/* Android Games */}
            <div className='container mx-auto p-2 mb-6'>
                <div className='cover mb-5 flex justify-between items-center'>
                    <h1 className='font-medium text-2xl md:text-3xl'>
                        Android Games <span className='font-medium ml-2 text-[#8E8E8E]'>{totalAndroidGames}</span>
                    </h1>
                    <Link to={`/category/android/games`} className="text-blue-500 hover:underline text-xs">See All</Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {/* Check if Androiddata is an array and has items */}
                    {Array.isArray(Androiddata) && Androiddata.length > 0 ? (
                        Androiddata.slice(0, 8).map((ele) => (
                            <Link
                                key={ele._id}
                                to={`/${ele._id}`}
                                className="flex flex-col rounded-2xl h-36 overflow-hidden transition duration-300 ease-in-out ring-1 ring-white/10 hover:ring-2 hover:ring-[#8E8E8E] hover:ring-opacity-75"
                            >
                                <div className="flex justify-center items-center h-32 bg-[#262626] pt-4">
                                    <img
                                        src={ele.thumbnail[0]}
                                        alt={ele.title}
                                        className="rounded-lg w-14 h-14 transition-transform duration-700 ease-in-out transform hover:scale-110 bg-[#262626]"
                                    />
                                </div>
                                <div className="flex flex-col p-4 bg-[#262626]">
                                    <div className="text-sm text-center font-normal overflow-hidden whitespace-nowrap text-ellipsis text-[#ffffff] bg-[#262626] pb-2">{ele.title}</div>
                                    <div className="text-xs text-center font-thin text-[#8E8E8E] bg-[#262626]">Size: {ele.size}</div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="text-center text-gray-500">Loading Android Games...</div> // Loading state
                    )}
                </div>
            </div>


            {/* PS2 Roms */}
            <div className='container mx-auto p-2 mb-6'>
                <div className='cover mb-5 flex justify-between items-center'>
                    <h1 className='font-medium text-2xl md:text-3xl'>
                        PS2 Roms <span className='font-medium ml-2 text-[#8E8E8E]'>{totalPs2Iso}</span>
                    </h1>
                    <Link to={`/category/ps2/iso`} className="text-blue-500 hover:underline text-xs">See All</Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {/* Check if Ps2data is an array and has items */}
                    {Array.isArray(Ps2data) && Ps2data.length > 0 ? (
                        Ps2data.slice(0, 8).map((ele) => (
                            <Link
                                key={ele._id}
                                to={`/${ele._id}`}
                                className="flex flex-col rounded-2xl h-36 overflow-hidden transition duration-300 ease-in-out ring-1 ring-white/10 hover:ring-2 hover:ring-[#8E8E8E] hover:ring-opacity-75"
                            >
                                <div className="flex justify-center items-center h-32 bg-[#262626] pt-4">
                                    <img
                                        src={ele.thumbnail[0]}
                                        alt={ele.title}
                                        className="rounded-lg w-14 h-14 transition-transform duration-700 ease-in-out transform hover:scale-110 bg-[#262626]"
                                    />
                                </div>
                                <div className="flex flex-col p-4 bg-[#262626]">
                                    <div className="text-sm text-center font-normal overflow-hidden whitespace-nowrap text-ellipsis text-[#ffffff] bg-[#262626] pb-2">{ele.title}</div>
                                    <div className="text-xs text-center font-thin text-[#8E8E8E] bg-[#262626]">Size: {ele.size}</div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="text-center text-gray-500">Loading PS2 Roms...</div> // Loading state
                    )}
                </div>
            </div>



            <div>
                {/* This div will be visible based on the role */}
                <div style={{ display: isAdmin ? 'block' : 'none' }}>
                    <LiveCounter />
                </div>
            </div>

        </div>
    );
};

export default Home;
