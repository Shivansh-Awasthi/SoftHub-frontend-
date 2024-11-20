import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LiaDownloadSolid } from "react-icons/lia";
import { RxCross2 } from "react-icons/rx";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import GiscusComments from './GiscusComments';

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


    //change color function

    function HighlightText({ text }) {
        // Function to wrap specific words in span
        const highlightWords = (input) => {
            return input.replace(/\\y(.*?)\\y/g, "<span class='text-orange-400'>$1</span>");
        };

        return (
            <div
                dangerouslySetInnerHTML={{ __html: highlightWords(text) }}
            />
        );
    }



    return (
        <div className='z-20]'>

            <div className='flex flex-wrap flex-col xl:flex-row px-2 justify-center items-center'>
                {/* Left Content */}
                <div className="flex-1">

                    {/* Card */}
                    <div className="flex w-full p-2 sm:p-4 max-w-full sm:max-w-lg flex-grow flex-col rounded-lg shadow-sm ">
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
                        <div id="default-carousel" className="flex relative w-full max-w-full ">
                            <div className="relative w-full h-[13rem] sm:h-[19rem] md:h-[20rem] lg:h-[26rem] overflow-hidden rounded-lg">
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
                <div className="w-full max-w-[22rem] md:ml-4 lg:ml-4 h-full p-8 bg-[#262626] rounded-lg shadow-md mt-6 xl:mt-[6rem] ring-1 ring-[#3E3E3E]">
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
            <div className="mt-8 mb-8 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-20 bg-[#262626]  z-20 ring-2 ring-[#2E2E2E] rounded-lg">
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


            {/* DOWNLOAD BUTTON SECTION */}

            {/* Modal for Download Instructions */}
            {
                showModal && (
                    <div className="fixed inset-1 flex items-center justify-center bg-black backdrop-blur-sm bg-opacity-50 z-20 overflow-y-auto">
                        <div className="bg-[#262626] px-6 sm:px-12 lg:px-24 py-6 sm:py-8 rounded-lg w-full max-w-4xl mx-auto text-center relative">
                            {/* Close Icon */}
                            <div className="absolute top-4 right-4 cursor-pointer" onClick={closeModal}>
                                <RxCross2 className="mr-2 sm:mr-4 text-xl text-[#8E8E8E] hover:text-[#fff]" />
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-normal">Installation Instructions</h3>



                            {/* For MAC games*/}

                            {data.category.name === 'mac' && (

                                <div>
                                    <div>
                                        <h2 className="mt-3 text-[#8E8E8E] hover:underline text-lg sm:text-xl">MAC</h2>
                                        <p className="mt-1 text-sm sm:text-base">Run the downloaded image and drag the application to the Applications folder shortcut.</p>
                                        <p className="text-sm sm:text-base">Once copying is complete, the application can be launched via Launchpad.</p>
                                    </div>


                                    {/* Check if gameplayVideos is not empty and has enough data */}
                                    {data.gameplayVideos && data.gameplayVideos.length > 0 && (
                                        <div className='mt-4 ring-2 ring-[#9709e3] rounded-lg hover:ring-opacity-75'>
                                            {/* Display data only if the array has enough elements */}
                                            {data.gameplayVideos[0] && (
                                                <h3 className="text-xl sm:text-2xl text-red-500 font-normal mt-1 pt-3">{data.gameplayVideos[0]}</h3>
                                            )}

                                            {data.gameplayVideos[1] && (
                                                <div className=" text-sm sm:text-base flex gap-4 justify-center items-center py-2 px-6 sm:px-10 inline-block w-full">
                                                    <div>{data.gameplayVideos[1]}</div>
                                                </div>
                                            )}

                                            {data.gameplayVideos[2] && (
                                                <div className="mt-1">
                                                    <p className=" text-sm sm:text-base flex flex-wrap justify-center items-center py-3 px-6 sm:px-10  w-full rounded-lg bg-[#2E2E2E]  hover:bg-[#1E1E1E] transition break-all">
                                                        <code className='italic'>{data.gameplayVideos[2]}</code>
                                                    </p>
                                                </div>
                                            )}

                                            {data.gameplayVideos[3] && (
                                                <div className="mt-1  text-sm sm:text-base">
                                                    <div className="flex gap-4 justify-center items-center py-3 px-6 sm:px-10 inline-block w-full">
                                                        <div><HighlightText text={data.gameplayVideos[3]} /></div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <div className='flex flex-wrap justify-center text-center mt-2 text-sm'> How To Download? How to Install?&nbsp; <a href="https://vimeo.com/1030290869?share=copy" target='_blank' className=' text-blue-600 hover:underline'> click here</a></div>

                                </div>
                            )}


                            {/* For Software MAC */}

                            {data.category.name === 'smac' && (
                                <div>
                                    <div>
                                        <h2 className="mt-3 text-[#8E8E8E] hover:underline text-lg sm:text-xl">Software MAC</h2>
                                        <p className="mt-1 text-sm sm:text-base">Follow the instructions to mount the image, then drag the application to the Applications folder.</p>
                                        <p className="text-sm sm:text-base">This version may require additional configurations for certain users.</p>
                                    </div>

                                    {/* Check if gameplayVideos is not empty and has enough data */}
                                    {data.gameplayVideos && data.gameplayVideos.length > 0 && (
                                        <div className='mt-4 ring-2 ring-[#9709e3] rounded-lg hover:ring-opacity-75'>
                                            {/* Display data only if the array has enough elements */}
                                            {data.gameplayVideos[0] && (
                                                <h3 className="text-xl sm:text-2xl text-red-500 font-normal mt-1 pt-3">{data.gameplayVideos[0]}</h3>
                                            )}

                                            {data.gameplayVideos[1] && (
                                                <div className=" text-sm sm:text-base flex gap-4 justify-center items-center py-2 px-6 sm:px-10 inline-block w-full">
                                                    <div>{data.gameplayVideos[1]}</div>
                                                </div>
                                            )}

                                            {data.gameplayVideos[2] && (
                                                <div className="mt-1">
                                                    <p className=" text-sm sm:text-base flex flex-wrap justify-center items-center py-3 px-6 sm:px-10  w-full rounded-lg bg-[#2E2E2E]  hover:bg-[#1E1E1E] transition break-all">
                                                        <code className='italic'>{data.gameplayVideos[2]}</code>
                                                    </p>
                                                </div>
                                            )}

                                            {data.gameplayVideos[3] && (
                                                <div className="mt-1  text-sm sm:text-base">
                                                    <div className="flex gap-4 justify-center items-center py-3 px-6 sm:px-10 inline-block w-full">
                                                        <div><HighlightText text={data.gameplayVideos[3]} /></div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                </div>

                            )}




                            {/* For PC */}
                            {data.category.name === 'pc' && (
                                <div>
                                    <div>
                                        <h2 className="mt-3 text-[#8E8E8E] hover:underline text-lg sm:text-xl">PC</h2>
                                        <p className="mt-1 text-sm sm:text-base">Extract the downloaded zip and click install.</p>
                                        <p className="text-sm sm:text-base">Once the installation is complete, the application can be launched directly.</p>
                                    </div>

                                    {/* Check if gameplayVideos is not empty and has enough data */}
                                    {data.gameplayVideos && data.gameplayVideos.length > 0 && (
                                        <div className='mt-4 ring-2 ring-[#9709e3] rounded-lg hover:ring-opacity-75'>
                                            {/* Display data only if the array has enough elements */}
                                            {data.gameplayVideos[0] && (
                                                <h3 className="text-xl sm:text-2xl text-red-500 font-normal mt-1 pt-3">{data.gameplayVideos[0]}</h3>
                                            )}

                                            {data.gameplayVideos[1] && (
                                                <div className=" text-sm sm:text-base flex gap-4 justify-center items-center py-2 px-6 sm:px-10 inline-block w-full">
                                                    <div>{data.gameplayVideos[1]}</div>
                                                </div>
                                            )}

                                            {data.gameplayVideos[2] && (
                                                <div className="mt-1">
                                                    <p className=" text-sm sm:text-base flex flex-wrap justify-center items-center py-3 px-6 sm:px-10  w-full rounded-lg bg-[#2E2E2E]  hover:bg-[#1E1E1E] transition break-all">
                                                        <code className='italic'>{data.gameplayVideos[2]}</code>
                                                    </p>
                                                </div>
                                            )}

                                            {data.gameplayVideos[3] && (
                                                <div className="mt-1  text-sm sm:text-base">
                                                    <div className="flex gap-4 justify-center items-center py-3 px-6 sm:px-10 inline-block w-full">
                                                        <div><HighlightText text={data.gameplayVideos[3]} /></div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                </div>
                            )}

                            {/* For Software PC */}
                            {data.category.name === 'spc' && (
                                <>
                                    <h2 className="mt-3 text-[#8E8E8E] hover:underline text-lg sm:text-xl">Software PC</h2>
                                    <p className="mt-1 text-sm sm:text-base">Run the installer and follow the setup process. It might need additional configurations for software compatibility.</p>
                                    <p className="text-sm sm:text-base">After installation, the software will be ready to use.</p>
                                </>
                            )}

                            {/* For Android */}
                            {data.category.name === 'android' && (
                                <div>
                                    <div>
                                        <h2 className="mt-3 text-[#8E8E8E] hover:underline text-lg sm:text-xl">Android</h2>
                                        <p className="mt-1 text-sm sm:text-base">Install the APK directly on your Android device.</p>
                                        <p className="text-sm sm:text-base">Ensure that you have enabled installation from unknown sources in your device settings.</p>
                                    </div>

                                    {/* Check if gameplayVideos is not empty and has enough data */}
                                    {data.gameplayVideos && data.gameplayVideos.length > 0 && (
                                        <div className='mt-4 ring-2 ring-[#9709e3] rounded-lg hover:ring-opacity-75'>
                                            {/* Display data only if the array has enough elements */}
                                            {data.gameplayVideos[0] && (
                                                <h3 className="text-xl sm:text-2xl text-red-500 font-normal mt-1 pt-3">{data.gameplayVideos[0]}</h3>
                                            )}

                                            {data.gameplayVideos[1] && (
                                                <div className=" text-sm sm:text-base flex gap-4 justify-center items-center py-2 px-6 sm:px-10 inline-block w-full">
                                                    <div>{data.gameplayVideos[1]}</div>
                                                </div>
                                            )}

                                            {data.gameplayVideos[2] && (
                                                <div className="mt-1">
                                                    <p className=" text-sm sm:text-base flex flex-wrap justify-center items-center py-3 px-6 sm:px-10  w-full rounded-lg bg-[#2E2E2E]  hover:bg-[#1E1E1E] transition break-all">
                                                        <code className='italic'>{data.gameplayVideos[2]}</code>
                                                    </p>
                                                </div>
                                            )}

                                            {data.gameplayVideos[3] && (
                                                <div className="mt-1  text-sm sm:text-base">
                                                    <div className="flex gap-4 justify-center items-center py-3 px-6 sm:px-10 inline-block w-full">
                                                        <div><HighlightText text={data.gameplayVideos[3]} /></div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* For Android Softwares */}
                            {data.category.name === 'sandroid' && (
                                <>
                                    <h2 className="mt-3 text-[#8E8E8E] hover:underline text-lg sm:text-xl">Android</h2>
                                    <p className="mt-1 text-sm sm:text-base">Install the APK directly on your Android device.</p>
                                    <p className="text-sm sm:text-base">Ensure that you have enabled installation from unknown sources in your device settings.</p>
                                </>
                            )}

                            {/* For PlayStation (ps2, ps3, ps4, ppsspp) */}
                            {['Playstation'].includes(data.platform) && (

                                <div>
                                    <div>
                                        <h2 className="mt-3 text-[#8E8E8E] hover:underline text-lg sm:text-xl">PlayStation</h2>
                                        <p className="mt-1 text-sm sm:text-base">For PlayStation, follow the platform-specific instructions to install or load the game on your console.</p>
                                        <p className="text-sm sm:text-base text-yellow-300">To run these on PC, download the appropriate versions of Emulators <a className='text-blue-600 hover:underline' href='https://www.ppsspp.org/download/' target='_blank'>PPSSPP</a>, <a className='text-blue-600 hover:underline' href='https://pcsx2.net/' target='_blank'>PCSX2</a>, or <a className='text-blue-600 hover:underline' href='https://rpcs3.net/download' target='_blank'>RPCS3</a>, and enjoy your gameplay!</p>
                                    </div>
                                    {/* Check if gameplayVideos is not empty and has enough data */}
                                    {data.gameplayVideos && data.gameplayVideos.length > 0 && (
                                        <div className='mt-4 ring-2 ring-[#9709e3] rounded-lg hover:ring-opacity-75'>
                                            {/* Display data only if the array has enough elements */}
                                            {data.gameplayVideos[0] && (
                                                <h3 className="text-xl sm:text-2xl text-red-500 font-normal mt-1 pt-3">{data.gameplayVideos[0]}</h3>
                                            )}

                                            {data.gameplayVideos[1] && (
                                                <div className=" text-sm sm:text-base flex gap-4 justify-center items-center py-2 px-6 sm:px-10 inline-block w-full">
                                                    <div>{data.gameplayVideos[1]}</div>
                                                </div>
                                            )}

                                            {data.gameplayVideos[2] && (
                                                <div className="mt-1">
                                                    <p className=" text-sm sm:text-base flex flex-wrap justify-center items-center py-3 px-6 sm:px-10  w-full rounded-lg bg-[#2E2E2E]  hover:bg-[#1E1E1E] transition break-all">
                                                        <code className='italic'>{data.gameplayVideos[2]}</code>
                                                    </p>
                                                </div>
                                            )}

                                            {data.gameplayVideos[3] && (
                                                <div className="mt-1  text-sm sm:text-base">
                                                    <div className="flex gap-4 justify-center items-center py-3 px-6 sm:px-10 inline-block w-full">
                                                        <div><HighlightText text={data.gameplayVideos[3]} /></div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                </div>
                            )}



                            {data.platform === "Mac" && (
                                <div>
                                    {/* Direct Download Link */}
                                    {data.downloadLink[0] && data.downloadLink[0] !== "no" && (
                                        <div className="mt-4">
                                            <a
                                                href={data.downloadLink[0]}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex gap-4 justify-center items-center py-3 px-6 sm:px-10 inline-block w-full text-blue-500 rounded-lg bg-[#2E2E2E] hover:underline hover:bg-[#3E3E3E] transition"
                                            >
                                                <div>Direct download link</div>
                                                <div className='text-xl'><LiaDownloadSolid /></div>
                                            </a>
                                        </div>
                                    )}

                                    {/* OneDrive Download Link */}
                                    {data.downloadLink[1] && data.downloadLink[1] !== "no" && (
                                        <div className="mt-2">
                                            <a
                                                href={data.downloadLink[1]}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex gap-4 justify-center items-center py-3 px-6 sm:px-10 inline-block w-full text-blue-500 rounded-lg bg-[#2E2E2E] hover:underline hover:bg-[#3E3E3E] transition"
                                            >
                                                <div>Download from OneDrive</div>
                                                <div className='text-xl'><LiaDownloadSolid /></div>
                                            </a>
                                        </div>
                                    )}

                                    {/* Torrent Download Link */}
                                    {data.downloadLink[2] && data.downloadLink[2] !== "no" && (
                                        <div className="mt-2">
                                            <a
                                                href={data.downloadLink[2]}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex gap-4 justify-center items-center py-3 px-6 sm:px-10 inline-block w-full text-blue-500 rounded-lg bg-[#2E2E2E] hover:underline hover:bg-[#3E3E3E] transition"
                                            >
                                                <div>Download Torrent file</div>
                                                <div className='text-xl'><LiaDownloadSolid /></div>
                                            </a>
                                        </div>
                                    )}

                                    {/* Other Download Links */}
                                    {data.downloadLink[3] && data.downloadLink[3] !== "no" && (
                                        <div className="mt-2">
                                            <a
                                                href={data.downloadLink[3]}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex gap-4 justify-center items-center py-3 px-6 sm:px-10 inline-block w-full text-blue-500 rounded-lg bg-[#2E2E2E] hover:underline hover:bg-[#3E3E3E] transition"
                                            >
                                                <div>Other Download Links</div>
                                                <div className='text-xl'><LiaDownloadSolid /></div>
                                            </a>
                                        </div>
                                    )}

                                    {/* MediaFire Download Links */}
                                    {data.downloadLink[4] && data.downloadLink[4] !== "no" && (
                                        <div className="mt-2">
                                            <a
                                                href={data.downloadLink[4]}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex gap-4 justify-center items-center py-3 px-6 sm:px-10 inline-block w-full text-blue-500 rounded-lg bg-[#2E2E2E] hover:underline hover:bg-[#3E3E3E] transition"
                                            >
                                                <div>Download from Mediafire</div>
                                                <div className='text-xl'><LiaDownloadSolid /></div>
                                            </a>
                                        </div>
                                    )}
                                </div>
                            )}


                            {data.platform === "PC" && (
                                <div>
                                    {/* Direct Download Link */}
                                    {data.downloadLink[0] && data.downloadLink[0] !== "no" && (
                                        <div className="mt-4">
                                            <a
                                                href={data.downloadLink[0]}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex gap-4 justify-center items-center py-3 px-6 sm:px-10 inline-block w-full text-blue-500 rounded-lg bg-[#2E2E2E] hover:underline hover:bg-[#3E3E3E] transition"
                                            >
                                                <div>Download from Torrent</div>
                                                <div className='text-xl'><LiaDownloadSolid /></div>
                                            </a>
                                        </div>
                                    )}

                                    {/* OneDrive Download Link */}
                                    {data.downloadLink[1] && data.downloadLink[1] !== "no" && (
                                        <div className="mt-2">
                                            <a
                                                href={data.downloadLink[1]}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex gap-4 justify-center items-center py-3 px-6 sm:px-10 inline-block w-full text-blue-500 rounded-lg bg-[#2E2E2E] hover:underline hover:bg-[#3E3E3E] transition"
                                            >
                                                <div>Torrent link 2</div>
                                                <div className='text-xl'><LiaDownloadSolid /></div>
                                            </a>
                                        </div>
                                    )}

                                    {/* Torrent Download Link */}
                                    {data.downloadLink[2] && data.downloadLink[2] !== "no" && (
                                        <div className="mt-2">
                                            <a
                                                href={data.downloadLink[2]}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex gap-4 justify-center items-center py-3 px-6 sm:px-10 inline-block w-full text-blue-500 rounded-lg bg-[#2E2E2E] hover:underline hover:bg-[#3E3E3E] transition"
                                            >
                                                <div>Torrent link 3</div>
                                                <div className='text-xl'><LiaDownloadSolid /></div>
                                            </a>
                                        </div>
                                    )}

                                    {/* Other Download Links */}
                                    {data.downloadLink[3] && data.downloadLink[3] !== "no" && (
                                        <div className="mt-2">
                                            <a
                                                href={data.downloadLink[3]}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex gap-4 justify-center items-center py-3 px-6 sm:px-10 inline-block w-full text-blue-500 rounded-lg bg-[#2E2E2E] hover:underline hover:bg-[#3E3E3E] transition"
                                            >
                                                <div>Other Download Links</div>
                                                <div className='text-xl'><LiaDownloadSolid /></div>
                                            </a>
                                        </div>
                                    )}

                                    {/* MediaFire Download Links */}
                                    {data.downloadLink[4] && data.downloadLink[4] !== "no" && (
                                        <div className="mt-2">
                                            <a
                                                href={data.downloadLink[4]}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex gap-4 justify-center items-center py-3 px-6 sm:px-10 inline-block w-full text-blue-500 rounded-lg bg-[#2E2E2E] hover:underline hover:bg-[#3E3E3E] transition"
                                            >
                                                <div>Mirror Link</div>
                                                <div className='text-xl'><LiaDownloadSolid /></div>
                                            </a>
                                        </div>
                                    )}
                                </div>
                            )}



                            {data.platform === "Android" && (
                                <div>
                                    {/* Direct Download Link */}
                                    {data.downloadLink[0] && data.downloadLink[0] !== "no" && (
                                        <div className="mt-4">
                                            <a
                                                href={data.downloadLink[0]}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex gap-4 justify-center items-center py-3 px-6 sm:px-10 inline-block w-full text-blue-500 rounded-lg bg-[#2E2E2E] hover:underline hover:bg-[#3E3E3E] transition"
                                            >
                                                <div>Download Apk</div>
                                                <div className='text-xl'><LiaDownloadSolid /></div>
                                            </a>
                                        </div>
                                    )}

                                    {/* OneDrive Download Link */}
                                    {data.downloadLink[1] && data.downloadLink[1] !== "no" && (
                                        <div className="mt-2">
                                            <a
                                                href={data.downloadLink[1]}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex gap-4 justify-center items-center py-3 px-6 sm:px-10 inline-block w-full text-blue-500 rounded-lg bg-[#2E2E2E] hover:underline hover:bg-[#3E3E3E] transition"
                                            >
                                                <div>Download Apk (Mirror)</div>
                                                <div className='text-xl'><LiaDownloadSolid /></div>
                                            </a>
                                        </div>
                                    )}

                                    {/* Torrent Download Link */}
                                    {data.downloadLink[2] && data.downloadLink[2] !== "no" && (
                                        <div className="mt-2">
                                            <a
                                                href={data.downloadLink[2]}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex gap-4 justify-center items-center py-3 px-6 sm:px-10 inline-block w-full text-blue-500 rounded-lg bg-[#2E2E2E] hover:underline hover:bg-[#3E3E3E] transition"
                                            >
                                                <div>Download Obb</div>
                                                <div className='text-xl'><LiaDownloadSolid /></div>
                                            </a>
                                        </div>
                                    )}

                                    {/* Other Download Links */}
                                    {data.downloadLink[3] && data.downloadLink[3] !== "no" && (
                                        <div className="mt-2">
                                            <a
                                                href={data.downloadLink[3]}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex gap-4 justify-center items-center py-3 px-6 sm:px-10 inline-block w-full text-blue-500 rounded-lg bg-[#2E2E2E] hover:underline hover:bg-[#3E3E3E] transition"
                                            >
                                                <div>Download Obb (Mirror)</div>
                                                <div className='text-xl'><LiaDownloadSolid /></div>
                                            </a>
                                        </div>
                                    )}

                                    {/* MediaFire Download Links */}
                                    {data.downloadLink[4] && data.downloadLink[4] !== "no" && (
                                        <div className="mt-2">
                                            <a
                                                href={data.downloadLink[4]}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex gap-4 justify-center items-center py-3 px-6 sm:px-10 inline-block w-full text-blue-500 rounded-lg bg-[#2E2E2E] hover:underline hover:bg-[#3E3E3E] transition"
                                            >
                                                <div>Other Download link</div>
                                                <div className='text-xl'><LiaDownloadSolid /></div>
                                            </a>
                                        </div>
                                    )}
                                </div>
                            )}


                            {data.platform === "Playstation" && (
                                <div>
                                    {/* Direct Download Link */}
                                    {data.downloadLink[0] && data.downloadLink[0] !== "no" && (
                                        <div className="mt-4">
                                            <a
                                                href={data.downloadLink[0]}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex gap-4 justify-center items-center py-3 px-6 sm:px-10 inline-block w-full text-blue-500 rounded-lg bg-[#2E2E2E] hover:underline hover:bg-[#3E3E3E] transition"
                                            >
                                                <div>Direct download link</div>
                                                <div className='text-xl'><LiaDownloadSolid /></div>
                                            </a>
                                        </div>
                                    )}

                                    {/* OneDrive Download Link */}
                                    {data.downloadLink[1] && data.downloadLink[1] !== "no" && (
                                        <div className="mt-2">
                                            <a
                                                href={data.downloadLink[1]}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex gap-4 justify-center items-center py-3 px-6 sm:px-10 inline-block w-full text-blue-500 rounded-lg bg-[#2E2E2E] hover:underline hover:bg-[#3E3E3E] transition"
                                            >
                                                <div>Download (Mirror)</div>
                                                <div className='text-xl'><LiaDownloadSolid /></div>
                                            </a>
                                        </div>
                                    )}

                                    {/* Torrent Download Link */}
                                    {data.downloadLink[2] && data.downloadLink[2] !== "no" && (
                                        <div className="mt-2">
                                            <a
                                                href={data.downloadLink[2]}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex gap-4 justify-center items-center py-3 px-6 sm:px-10 inline-block w-full text-blue-500 rounded-lg bg-[#2E2E2E] hover:underline hover:bg-[#3E3E3E] transition"
                                            >
                                                <div>Download (Mirror - 2)</div>
                                                <div className='text-xl'><LiaDownloadSolid /></div>
                                            </a>
                                        </div>
                                    )}

                                    {/* Other Download Links */}
                                    {data.downloadLink[3] && data.downloadLink[3] !== "no" && (
                                        <div className="mt-2">
                                            <a
                                                href={data.downloadLink[3]}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex gap-4 justify-center items-center py-3 px-6 sm:px-10 inline-block w-full text-blue-500 rounded-lg bg-[#2E2E2E] hover:underline hover:bg-[#3E3E3E] transition"
                                            >
                                                <div>Other  link</div>
                                                <div className='text-xl'><LiaDownloadSolid /></div>
                                            </a>
                                        </div>
                                    )}

                                    {/* MediaFire Download Links */}
                                    {data.downloadLink[4] && data.downloadLink[4] !== "no" && (
                                        <div className="mt-2">
                                            <a
                                                href={data.downloadLink[4]}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex gap-4 justify-center items-center py-3 px-6 sm:px-10 inline-block w-full text-blue-500 rounded-lg bg-[#2E2E2E] hover:underline hover:bg-[#3E3E3E] transition"
                                            >
                                                <div>Download file</div>
                                                <div className='text-xl'><LiaDownloadSolid /></div>
                                            </a>
                                        </div>
                                    )}
                                </div>
                            )}





                            {/* Troubleshooting Section */}
                            <p className="mt-4 text-sm sm:text-base">Doesn't download? Broken file? Doesn't work? Gives an error? How to update?</p>
                            <p className="text-sm sm:text-base">We have collected all the answers on our <a href="https://t.me/downloadmacgames" target='_blank' className='text-cyan-600 text-base hover:underline'>Telegram Group</a>.</p>
                        </div>
                    </div >
                )
            }







            <div
                className="absolute inset-0"
                style={{
                    background: `linear-gradient(to top right, rgba(0, 0, 0, 1)50%, rgba(0, 0, 0, 0) 100%), url('${data.thumbnail[2]}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.5,
                    zIndex: -1,
                    pointerEvents: 'none', // Allows interaction with elements above this
                }}
            >
            </div>
            <div className='ring-2 ring-[#2E2E2E] rounded-lg flex flex-col items-center'>
                <h2 className='pt-4 mb-8 text-2xl sm:text-3xl font-normal text-[#8E8E8E] hover:text-[#fff]'>Comments</h2>
                <div className='flex justify-center w-full'>
                    <GiscusComments objectId={data._id} />
                </div>
            </div>


        </div >
    );
};

export default SingleApp;
