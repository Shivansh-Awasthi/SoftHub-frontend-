import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SiRiotgames } from "react-icons/si";
import { FaPlaystation } from "react-icons/fa";
import { TfiAndroid } from "react-icons/tfi";
import { RiMacbookLine } from "react-icons/ri";
import { HiMenu, HiX } from "react-icons/hi";

const Sidebar = () => {
    const [logo, setLogo] = useState("https://res.cloudinary.com/dkp1pshuw/image/upload/v1729024140/Screenshot_2024-10-16_at_1.54.35_AM_cow9by.png");
    const [selected, setSelected] = useState('');
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);

    const handleClick = (item) => {
        setSelected(item);
    };

    const handleLogoClick = () => {
        setSelected('');
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 767) {
                setIsMobileView(true);
                setIsSidebarVisible(false);
            } else {
                setIsMobileView(false);
                setIsSidebarVisible(true);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (isSidebarVisible && isMobileView) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isSidebarVisible, isMobileView]);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const closeSidebar = () => {
        if (isMobileView) {
            setIsSidebarVisible(false);
        }
    };

    return (
        <div className='bg-[#1E1E1E]'>
            {/* Hamburger / Close menu icon */}
            {isMobileView && (
                <button
                    onClick={toggleSidebar}
                    className="p-3 fixed bottom-4 left-4 z-30 text-white rounded-lg bg-blue-500 shadow-md"
                >
                    {isSidebarVisible ? <HiX size={24} /> : <HiMenu size={24} />}
                </button>
            )}

            {/* Overlay */}
            {isMobileView && isSidebarVisible && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20"
                    onClick={toggleSidebar}
                ></div>
            )}

            {/* Sidebar */}
            <aside
                className={`md:sticky top-0 z-20 flex flex-col h-screen px-6 py-8 border-r border-white border-opacity-5 
                            ${isMobileView ? 'fixed w-full bg-[#1E1E1E] transition-transform duration-300' : 'w-60'} 
                            ${isSidebarVisible || !isMobileView ? 'transform-none' : '-translate-x-full'}`}
                style={{ overflowY: isMobileView ? 'auto' : 'hidden' }}  // hide scrollbar on non-mobile
            >
                <Link
                    to="/"
                    className='flex items-center mb-6'
                    onClick={() => {
                        handleClick();
                        closeSidebar();
                    }}
                    onMouseEnter={() => setLogo("https://res.cloudinary.com/dkp1pshuw/image/upload/v1729024140/Screenshot_2024-10-16_at_1.54.39_AM_gzfxsu.png")}
                    onMouseLeave={() => setLogo("https://res.cloudinary.com/dkp1pshuw/image/upload/v1729024140/Screenshot_2024-10-16_at_1.54.35_AM_cow9by.png")}
                >
                    <img className="h-11 w-11 mr-2 p-1" src={logo} alt="Logo" />
                    <h1 className='text-xl font-semibold tracking-wider'>
                        <span>Soft</span>
                        <span className='text-[#8E8E8E]'>Hub</span>
                    </h1>
                </Link>

                <div className="flex flex-col justify-between flex-1">
                    <nav className="-mx-3 space-y-5">
                        {/* Games */}
                        <div className="space-y-2">
                            <label className="px-3 text-xs text-gray-500 uppercase">Games</label>
                            <Link
                                to="/category/pc/games"
                                className={`flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${selected === 'pcGames' ? 'bg-gray-600 text-white' : 'text-gray-600 hover:bg-gray-500'} dark:text-gray-200`}
                                onClick={() => {
                                    handleClick('pcGames');
                                    closeSidebar();
                                }}
                            >
                                <SiRiotgames />
                                <span className="mx-2 text-sm font-medium">PC</span>
                            </Link>
                            <Link
                                to="/category/mac/games"
                                className={`flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${selected === 'macGames' ? 'bg-gray-600 text-white' : 'text-gray-600 hover:bg-gray-500'} dark:text-gray-200`}
                                onClick={() => {
                                    handleClick('macGames');
                                    closeSidebar();
                                }}
                            >
                                <RiMacbookLine />
                                <span className="mx-2 text-sm font-medium">Mac</span>
                            </Link>
                            <Link
                                to="/category/android/games"
                                className={`flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${selected === 'androidGames' ? 'bg-gray-600 text-white' : 'text-gray-600 hover:bg-gray-500'} dark:text-gray-200`}
                                onClick={() => {
                                    handleClick('androidGames');
                                    closeSidebar();
                                }}
                            >
                                <TfiAndroid />
                                <span className="mx-2 text-sm font-medium">Android</span>
                            </Link>
                        </div>

                        {/* Softwares */}
                        <div className="space-y-2">
                            <label className="px-3 text-xs text-gray-500 uppercase">Softwares</label>
                            <Link
                                to="/category/pc/softwares"
                                className={`flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${selected === 'pcSoftwares' ? 'bg-gray-600 text-white' : 'text-gray-600 hover:bg-gray-500'} dark:text-gray-200`}
                                onClick={() => {
                                    handleClick('pcSoftwares');
                                    closeSidebar();
                                }}
                            >
                                <SiRiotgames />
                                <span className="mx-2 text-sm font-medium">PC</span>
                            </Link>
                            <Link
                                to="/category/mac/softwares"
                                className={`flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${selected === 'macSoftwares' ? 'bg-gray-600 text-white' : 'text-gray-600 hover:bg-gray-500'} dark:text-gray-200`}
                                onClick={() => {
                                    handleClick('macSoftwares');
                                    closeSidebar();
                                }}
                            >
                                <RiMacbookLine />
                                <span className="mx-2 text-sm font-medium">Mac</span>
                            </Link>
                            <Link
                                to="/category/android/softwares"
                                className={`flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${selected === 'androidSoftwares' ? 'bg-gray-600 text-white' : 'text-gray-600 hover:bg-gray-500'} dark:text-gray-200`}
                                onClick={() => {
                                    handleClick('androidSoftwares');
                                    closeSidebar();
                                }}
                            >
                                <TfiAndroid />
                                <span className="mx-2 text-sm font-medium">Android</span>
                            </Link>
                        </div>

                        {/* PlayStation ISO's */}
                        <div className="space-y-2">
                            <label className="px-3 text-xs text-gray-500 uppercase">Playstation ISO's</label>
                            <Link
                                to="/category/ppsspp/iso"
                                className={`flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${selected === 'ppsspp' ? 'bg-gray-600 text-white' : 'text-gray-600 hover:bg-gray-500'} dark:text-gray-200`}
                                onClick={() => {
                                    handleClick('ppsspp');
                                    closeSidebar();
                                }}
                            >
                                <FaPlaystation />
                                <span className="mx-2 text-sm font-medium">PPSSPP</span>
                            </Link>
                            <Link
                                to="/category/ps2/iso"
                                className={`flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${selected === 'ps2' ? 'bg-gray-600 text-white' : 'text-gray-600 hover:bg-gray-500'} dark:text-gray-200`}
                                onClick={() => {
                                    handleClick('ps2');
                                    closeSidebar();
                                }}
                            >
                                <FaPlaystation />
                                <span className="mx-2 text-sm font-medium">PS2</span>
                            </Link>
                            <Link
                                to="/category/ps3/iso"
                                className={`flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${selected === 'ps3' ? 'bg-gray-600 text-white' : 'text-gray-600 hover:bg-gray-500'} dark:text-gray-200`}
                                onClick={() => {
                                    handleClick('ps3');
                                    closeSidebar();
                                }}
                            >
                                <FaPlaystation />
                                <span className="mx-2 text-sm font-medium">PS3</span>
                            </Link>
                            <Link
                                to="/category/ps4/iso"
                                className={`flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${selected === 'ps4' ? 'bg-gray-600 text-white' : 'text-gray-600 hover:bg-gray-500'} dark:text-gray-200`}
                                onClick={() => {
                                    handleClick('ps4');
                                    closeSidebar();
                                }}
                            >
                                <FaPlaystation />
                                <span className="mx-2 text-sm font-medium">PS4</span>
                            </Link>
                        </div>
                    </nav>
                </div>
            </aside>
        </div>
    );
};

export default Sidebar;