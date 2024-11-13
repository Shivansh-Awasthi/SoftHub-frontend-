import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LiaDownloadSolid } from "react-icons/lia";
import { RxCross2 } from "react-icons/rx";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const SingleApp = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [data, setData] = useState(null); // Change to null initially
    const [showMore, setShowMore] = useState(false);
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const { id } = useParams();
    const [error, setError] = useState(null); // State to handle errors

    const singleData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_API}/api/apps/get/${id}`);
            if (response.data.app) {
                setData(response.data.app);
                setError(null); // Clear any previous error
            } else {
                throw new Error("App not found");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("App not found. Please check the App and try again."); // Set error message
        }
    };

    useEffect(() => {
        singleData();
    }, []);

    const nextSlide = () => {
        if (data.thumbnail && data.thumbnail.length > 1) {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % (data.thumbnail.length - 1));
        }
    };

    const prevSlide = () => {
        if (data.thumbnail && data.thumbnail.length > 1) {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + (data.thumbnail.length - 1)) % (data.thumbnail.length - 1));
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        return `${day}.${month}.${year}`;
    };

    const toggleShowMore = () => {
        setShowMore((prev) => !prev);
    };

    const handleDownloadClick = () => {
        setShowModal(true); // Show the modal when the button is clicked
    };

    const closeModal = () => {
        setShowModal(false); // Hide the modal
    };

    // If there's an error, show an error message
    if (error) {
        return (
            <div className="flex justify-center items-center h-[40rem] ">
                <h1 className="text-2xl text-red-500">{error}</h1>
            </div>
        );
    }

    // If data is still loading, you can show a loading spinner or placeholder
    if (!data) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h1 className="text-2xl text-gray-500">Loading...</h1>
            </div>
        );
    }

    return (
        <div className='z-20]'>

            <div className='flex flex-wrap flex-col lg:flex-row px-2 justify-center items-center'>
                {/* Left Content */}
                <div className="flex-1">

                    {/* Card */}
                    <div className="flex w-full p-2 sm:p-4 max-w-full sm:max-w-lg flex-grow flex-col rounded-lg shadow-sm mb-2">
                        <div className="flex items-center gap-4 text-slate-800 gap-3 sm:gap-5">
                            <img
                                src={data.thumbnail && data.thumbnail[0] ? data.thumbnail[0] : "https://via.placeholder.com/58"}
                                alt={data.title}
                                className="relative inline-block h-[48px] w-[48px] sm:h-[58px] sm:w-[58px] rounded-lg object-cover object-center"
                            />
                            <div className="flex w-full flex-col overflow-hidden">
                                <div className="w-full flex items-center justify-between overflow-hidden">
                                    <h1 className="text-white text-xl sm:text-lg md:text-xl lg:text-4xl font-normal overflow-hidden text-ellipsis truncate max-w-full whitespace-normal md:whitespace-nowrap">
                                        {data.title}
                                    </h1>
                                </div>
                                <p className="text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] text-blue-500 uppercase font-light mt-0.5">
                                    {data.platform}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Slider Logic */}
                    {data.thumbnail && data.thumbnail.length > 1 && (
                        <div id="default-carousel" className="relative w-full max-w-full sm:max-w-[30rem] md:max-w-[40rem] lg:max-w-[46rem]">
                            <div className="relative h-[12rem] md:h-[20rem] lg:h-[26rem] overflow-hidden rounded-lg">
                                {data.thumbnail.slice(1).map((image, index) => (
                                    <div key={index} className={`transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'block' : 'hidden'} h-full`}>
                                        <img
                                            src={image}
                                            className="block w-full h-full object-cover"
                                            alt={`Slide ${index + 2}`}
                                        />
                                    </div>
                                ))}
                            </div>
                            {/* Slider indicators */}
                            <div className="absolute flex -translate-x-1/2 bottom-2 sm:bottom-3 lg:bottom-5 left-1/2 space-x-1 sm:space-x-2 overflow-hidden max-w-full justify-center">
                                {data.thumbnail.slice(1).map((_, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        className={`w-4 h-1 sm:w-8 sm:h-1 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-500'}`}
                                        aria-current={index === currentIndex}
                                        aria-label={`Slide ${index + 2}`}
                                        onClick={() => setCurrentIndex(index)}
                                    />
                                ))}
                            </div>

                            {/* Slider controls */}
                            <button type="button" className="absolute top-0 left-0  flex items-center justify-center h-full px-2 sm:px-4 cursor-pointer group focus:outline-none" onClick={prevSlide}>
                                <FaAngleLeft className='text-lg sm:text-xl' />
                            </button>
                            <button type="button" className="absolute top-0 right-0  flex items-center justify-center h-full px-2 sm:px-4 cursor-pointer group focus:outline-none" onClick={nextSlide}>
                                <FaAngleRight className='text-lg sm:text-xl' />
                            </button>
                        </div>
                    )}
                </div>

                {/* Right Card */}
                <div className="ml-4 w-full max-w-[22rem] h-full p-8 ml-2 bg-[#262626] rounded-lg shadow-md mt-10 sm:mt-10 lg:mt-[6.3rem]">
                    <h2 className="text-xs font-semibold text-[#8E8E8E] ">Platform</h2>
                    <p className="text-sm text-[#fff] mb-6">{data.platform}</p>
                    <h2 className="text-xs font-semibold text-[#8E8E8E]">Interface language</h2>
                    <p className="text-sm text-[#fff] mb-6">English , Russian , German , Chinese...</p>
                    <h2 className="text-xs font-semibold text-[#8E8E8E]">Tested</h2>
                    <p className="text-sm text-[#fff] mb-6">Mac Air M1</p>
                    <h2 className="text-xs font-semibold text-[#8E8E8E]">Size</h2>
                    <p className="text-sm text-[#fff] mb-6">{data.size}</p>
                    <h2 className="text-xs font-semibold text-[#8E8E8E]">Updated at</h2>
                    <p className="text-sm text-[#fff] mb-6">{formatDate(data.updatedAt)}</p>
                    <div className='py-[2px]'>
                        <button
                            className='bg-[#00AA01] hover:bg-[#28C328] text-white h-12 w-full text-center py-2 rounded-lg text-s'
                            onClick={handleDownloadClick} // Handle click to show modal
                        >
                            Free Download ({data.size})
                        </button>
                    </div>
                </div>
            </div>

            {/* Description Section */}
            <div className="mt-8 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-20 bg-[#262626] rounded-xl z-20">
                <div className="text-center p-1">
                    <h2 className="text-2xl sm:text-3xl font-normal text-[#8E8E8E] hover:text-[#fff]">Description</h2>
                    <div className="h-0.5 bg-[#8E8E8E] opacity-20 w-full mt-2 mb-4"></div>
                </div>
                <p
                    className="text-sm sm:text-base md:text-lg text-[#fff]"
                    dangerouslySetInnerHTML={{
                        __html: showMore
                            ? (data.description ? data.description.replace(/\\n/g, '<br />') : "No description available.")
                            : (data.description ? data.description.replace(/\\n/g, '<br />').substring(0, 800) + '...' : "No description available.")
                    }}
                />
                {/* Show More / Collapse Button */}
                <button
                    className="mt-4 text-blue-500 hover:underline"
                    onClick={toggleShowMore}
                >
                    {showMore ? "Collapse" : "Show More"}
                </button>
            </div>

            {/* Modal for Download Instructions */}
            {
                showModal && (
                    <div className="fixed inset-1 flex items-center justify-center bg-black backdrop-blur-sm bg-opacity-50 z-20">
                        <div className="bg-[#262626] px-6 sm:px-12 lg:px-24 py-6 sm:py-8 rounded-lg w-full max-w-4xl mx-auto text-center relative">
                            {/* Close Icon */}
                            <div className="absolute top-4 right-4 cursor-pointer" onClick={closeModal}>
                                <RxCross2 className="mr-2 sm:mr-4 text-xl text-[#8E8E8E] hover:text-[#fff]" />
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-normal">Installation Instructions</h3>
                            <h2 className="mt-3 text-[#8E8E8E] hover:underline text-lg sm:text-xl">MAC</h2>
                            <p className="mt-1 text-sm sm:text-base">Run the downloaded image and drag the application to the Applications folder shortcut.</p>
                            <p className="text-sm sm:text-base">Once copying is complete, the application can be launched via Launchpad.</p>
                            <h2 className="mt-3 text-[#8E8E8E] hover:underline text-lg sm:text-xl">PC</h2>
                            <p className="mt-1 text-sm sm:text-base">Extract the downloaded zip and click install.</p>
                            <p className="text-sm sm:text-base">Once the installation is complete, the application can be launched directly.</p>
                            <div className="mt-4">
                                <a
                                    href={data.downloadLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex gap-4 justify-center items-center py-3 px-6 sm:px-10 inline-block w-full text-blue-500 rounded-lg bg-[#2E2E2E] hover:underline hover:bg-[#3E3E3E] transition"
                                >
                                    <div>Direct download link</div>
                                    <div className='text-xl'><LiaDownloadSolid /></div>
                                </a>
                            </div>
                            <p className="mt-4 text-sm sm:text-base">Doesn't download? Broken file? Doesn't work? Gives an error? How to update?</p>
                            <p className="text-sm sm:text-base">We have collected all the answers on this page.</p>
                        </div>
                    </div>
                )
            }


            <div
                className="absolute inset-0"
                style={{
                    background: `linear-gradient(to right, rgba(0, 0, 0, 5), rgba(0, 0, 0, 0) 170%), url('${data.thumbnail[2]}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.2,
                    zIndex: -1,
                    pointerEvents: 'none', // Allows interaction with elements above this
                }}
            >
            </div>

        </div >
    );
};

export default SingleApp;
