import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppById } from '../../redux/slices/appsSlice';
import { fetchCurrentUser } from '../../redux/slices/userSlice';

const SingleAppRedux = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showMore, setShowMore] = useState(false);
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const { id } = useParams();
    const [hasAccess, setHasAccess] = useState(null); // Start with null instead of true
    const [activeTab, setActiveTab] = useState('description');

    // Redux hooks
    const dispatch = useDispatch();
    const { currentApp } = useSelector(state => state.apps);
    const { currentUser, isAuthenticated } = useSelector(state => state.user);
    
    // Extract data from Redux state
    const { data, loading, error } = currentApp;
    
    // Fetch app data when component mounts
    useEffect(() => {
        if (id) {
            dispatch(fetchAppById(id));
        }
    }, [dispatch, id]);
    
    // Fetch user data when component mounts
    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(fetchCurrentUser());
        }
    }, [dispatch]);

    // Check if user has access to the app
    useEffect(() => {
        if (data && currentUser) {
            // If user is admin, they have access to everything
            const isAdmin = currentUser.role === 'ADMIN';
            
            if (isAdmin) {
                setHasAccess(true);
            } else {
                // If not admin, check if app is free or purchased
                const purchasedGames = currentUser.purchasedGames || [];
                setHasAccess(!data.isPaid || purchasedGames.includes(data._id));
            }
        } else if (data) {
            // If no user data (not logged in), assume no access unless the app is free
            setHasAccess(!data.isPaid);
        }
    }, [data, currentUser]);

    // Handle image navigation
    const handlePrev = () => {
        if (data && data.screenshots && data.screenshots.length > 0) {
            setCurrentIndex((prevIndex) => (prevIndex === 0 ? data.screenshots.length - 1 : prevIndex - 1));
        }
    };

    const handleNext = () => {
        if (data && data.screenshots && data.screenshots.length > 0) {
            setCurrentIndex((prevIndex) => (prevIndex === data.screenshots.length - 1 ? 0 : prevIndex + 1));
        }
    };

    // Toggle description length
    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    // Toggle modal visibility
    const toggleModal = () => {
        setShowModal(!showModal);
    };

    // Handle tab change
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    // Show "Loading..." when app data or user data is still being loaded
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    // Show error message if app not found
    if (error || !data) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error || "App not found"}</span>
                </div>
            </div>
        );
    }

    // Render the app details
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* App header */}
                <div className="md:flex">
                    <div className="md:w-1/3 p-4">
                        <img
                            src={data.image}
                            alt={data.title}
                            className="w-full h-auto rounded-lg shadow-md"
                        />
                    </div>
                    <div className="md:w-2/3 p-4">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{data.title}</h1>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {data.categories && data.categories.map((category, index) => (
                                <span
                                    key={index}
                                    className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded"
                                >
                                    {category}
                                </span>
                            ))}
                        </div>
                        <div className="mb-4">
                            <span className="text-gray-600">Version: </span>
                            <span className="font-semibold">{data.version || 'N/A'}</span>
                        </div>
                        <div className="mb-4">
                            <span className="text-gray-600">Size: </span>
                            <span className="font-semibold">{data.size || 'N/A'}</span>
                        </div>
                        <div className="mb-6">
                            <span className="text-gray-600">Released: </span>
                            <span className="font-semibold">
                                {data.releaseDate
                                    ? new Date(data.releaseDate).toLocaleDateString()
                                    : 'N/A'}
                            </span>
                        </div>

                        {/* Download button */}
                        {hasAccess === false ? (
                            <button
                                onClick={toggleModal}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                            >
                                Purchase to Download
                            </button>
                        ) : (
                            <a
                                href={data.downloadLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                            >
                                Download Now
                            </a>
                        )}
                    </div>
                </div>

                {/* Tabs navigation */}
                <div className="border-t border-gray-200 px-4">
                    <div className="flex overflow-x-auto">
                        <button
                            className={`py-4 px-6 font-medium text-sm focus:outline-none ${
                                activeTab === 'description'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                            onClick={() => handleTabChange('description')}
                        >
                            Description
                        </button>
                        <button
                            className={`py-4 px-6 font-medium text-sm focus:outline-none ${
                                activeTab === 'screenshots'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                            onClick={() => handleTabChange('screenshots')}
                        >
                            Screenshots
                        </button>
                        <button
                            className={`py-4 px-6 font-medium text-sm focus:outline-none ${
                                activeTab === 'requirements'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                            onClick={() => handleTabChange('requirements')}
                        >
                            Requirements
                        </button>
                    </div>
                </div>

                {/* Tab content */}
                <div className="p-6">
                    {/* Description tab */}
                    {activeTab === 'description' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Description</h2>
                            <div className="text-gray-700">
                                {data.description && (
                                    <>
                                        <div
                                            className={`prose max-w-none ${
                                                !showMore && data.description.length > 500
                                                    ? 'line-clamp-5'
                                                    : ''
                                            }`}
                                            dangerouslySetInnerHTML={{
                                                __html: data.description,
                                            }}
                                        />
                                        {data.description.length > 500 && (
                                            <button
                                                onClick={toggleShowMore}
                                                className="text-blue-600 hover:text-blue-800 mt-2 focus:outline-none"
                                            >
                                                {showMore ? 'Show Less' : 'Show More'}
                                            </button>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Screenshots tab */}
                    {activeTab === 'screenshots' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Screenshots</h2>
                            {data.screenshots && data.screenshots.length > 0 ? (
                                <div className="relative">
                                    <div className="overflow-hidden rounded-lg shadow-lg">
                                        <img
                                            src={data.screenshots[currentIndex]}
                                            alt={`Screenshot ${currentIndex + 1}`}
                                            className="w-full h-auto"
                                        />
                                    </div>
                                    <button
                                        onClick={handlePrev}
                                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-r-md hover:bg-opacity-75 focus:outline-none"
                                    >
                                        &#10094;
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-l-md hover:bg-opacity-75 focus:outline-none"
                                    >
                                        &#10095;
                                    </button>
                                    <div className="mt-2 text-center text-gray-600">
                                        {currentIndex + 1} / {data.screenshots.length}
                                    </div>
                                </div>
                            ) : (
                                <p className="text-gray-500">No screenshots available</p>
                            )}
                        </div>
                    )}

                    {/* Requirements tab */}
                    {activeTab === 'requirements' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">System Requirements</h2>
                            {data.requirements ? (
                                <div
                                    className="prose max-w-none text-gray-700"
                                    dangerouslySetInnerHTML={{ __html: data.requirements }}
                                />
                            ) : (
                                <p className="text-gray-500">No system requirements specified</p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Purchase modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-4">Premium Content</h2>
                        <p className="mb-6">
                            This is premium content. Please log in and purchase to access the download.
                        </p>
                        <div className="flex justify-end">
                            <button
                                onClick={toggleModal}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                            >
                                Close
                            </button>
                            <a
                                href="/login"
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                            >
                                Log In
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SingleAppRedux;
