import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LiaDownloadSolid } from "react-icons/lia";
import { RxCross2 } from "react-icons/rx";

const SingleApp = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [data, setData] = useState({});
    const [showMore, setShowMore] = useState(false);
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const { id } = useParams();

    const singleData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_API}/api/apps/get/${id}`);
            setData(response.data.app);
        } catch (error) {
            console.error("Error fetching data:", error);
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

    return (
        <div>
            <div className='flex flex-wrap px-2'>
                {/* Left Content */}
                <div className="flex-1">
                    {/* Card */}
                    <div className="flex w-full p-4 max-w-lg flex-col rounded-lg shadow-sm mb-2">
                        <div className="flex items-center gap-4 text-slate-800 gap-5">
                            <img
                                src={data.thumbnail && data.thumbnail[0] ? data.thumbnail[0] : "https://via.placeholder.com/58"}
                                alt={data.title}
                                className="relative inline-block h-[58px] w-[58px] !rounded-lg object-cover object-center"
                            />
                            <div className="flex w-full flex-col">
                                <div className="flex items-center justify-between">
                                    <h1 className="text-white text-4xl font-normal">
                                        {data.title}
                                    </h1>
                                </div>
                                <p className="text-[11px] text-blue-500 uppercase font-light mt-0.5">
                                    {data.platform}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Slider Logic */}
                    {data.thumbnail && data.thumbnail.length > 1 && (
                        <div id="default-carousel" className="relative w-full max-w-[46rem]" data-carousel="slide">
                            <div className="relative h-auto overflow-hidden rounded-lg md:h-[26rem]">
                                {data.thumbnail.slice(1).map((image, index) => (
                                    <div key={index} className={`transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'block' : 'hidden'}`}>
                                        <img src={image} className="block w-full h-auto" alt={`Slide ${index + 2}`} />
                                    </div>
                                ))}
                            </div>
                            {/* Slider indicators */}
                            <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
                                {data.thumbnail.slice(1).map((_, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-500'}`}
                                        aria-current={index === currentIndex}
                                        aria-label={`Slide ${index + 2}`}
                                        onClick={() => setCurrentIndex(index)}
                                    />
                                ))}
                            </div>
                            {/* Slider controls */}
                            <button type="button" className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" onClick={prevSlide}>
                                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full group-focus:ring-white focus:outline-none">
                                    <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                                    </svg>
                                    <span className="sr-only">Previous</span>
                                </span>
                            </button>
                            <button type="button" className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" onClick={nextSlide}>
                                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full group-focus:ring-white focus:outline-none">
                                    <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                    </svg>
                                    <span className="sr-only">Next</span>
                                </span>
                            </button>
                        </div>
                    )}
                </div>

                {/* Right Card */}
                <div className="w-full max-w-[22rem] h-full p-8 ml-2 bg-[#262626] rounded-lg shadow-md mt-[6.3rem]">
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
            <div className="mt-8 p-20 bg-[#262626] rounded-xl">
                <div className="text-center p-1">
                    <h2 className="text-3xl font-normal text-[#8E8E8E] hover:text-[#fff]">Description</h2>
                    <div className="h-0.5 bg-[#8E8E8E] opacity-20 w-full mt-2 mb-4"></div>
                </div>
                <p
                    className="text-sm text-[#fff]"
                    dangerouslySetInnerHTML={{
                        __html: showMore
                            ? (data.description ? data.description.replace(/\\n/g, '<br />') : "No description available.")
                            : (data.description ? data.description.replace(/\\n/g, '<br />').substring(0, 800) + '...' : "No description available.")
                    }}
                />
                {/* Show More / Collapse Button */}
                <button
                    className="mt-4 text-blue-500"
                    onClick={toggleShowMore}
                >
                    {showMore ? "Collapse" : "Show More"}
                </button>
            </div>

            {/* Modal for Download Instructions */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black  backdrop-blur-sm bg-opacity-50 z-50">
                    <div className="bg-[#262626] px-24 py-8 rounded-lg w-full max-w-4xl mx-auto text-center relative">
                        {/* Close Icon */}
                        <div className="absolute top-4 right-4 cursor-pointer" onClick={closeModal}>
                            <RxCross2 className="mr-5 mt-5 text-xl text-[#8E8E8E] hover:text-[#fff]" />
                        </div>
                        <h3 className="text-3xl font-normal text-center">Installation instructions</h3>
                        <h2 className='mt-3 text-center text-[#8E8E8E] hover:underline'>MAC</h2>
                        <p className="mt-1 text-sm">Run the downloaded image and drag the application to the Applications folder shortcut.</p>
                        <p className="text-sm">Once copying is complete, the application can be launched via Launchpad.</p>
                        <h2 className='mt-3 text-center text-[#8E8E8E] hover:underline'>PC</h2>
                        <p className="mt-1 text-sm">Extract the downloaded zip and click install.</p>
                        <p className="text-sm">Once the installation is complete, the application can be launched directly.</p>
                        <div className="mt-4">
                            <a
                                href={data.downloadLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex gap-4 justify-center items-center py-3 px-10 inline-block w-full text-blue-500 rounded-lg bg-[#2E2E2E] hover:underline hover:bg-[#3E3E3E] transition"
                            >
                                <div>Direct download link</div>
                                <div className='text-xl'><LiaDownloadSolid /></div>
                            </a>
                        </div>
                        <p className="mt-4">Doesn't download? Broken file? Doesn't work? Gives an error? How to update?</p>
                        <p>We have collected all the answers on this page.</p>
                    </div>
                </div>
            )}


        </div>
    );
};

export default SingleApp;
