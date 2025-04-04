import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppsByCategory } from '../../../redux/slices/appsSlice';
import { fetchCurrentUser } from '../../../redux/slices/userSlice';
import { CiLock } from 'react-icons/ci';
import { toast } from 'react-toastify';
import slugify from 'slugify';

const MacSoftwaresRedux = () => {
    // Configuration
    const ITEMS_PER_PAGE = 48;
    const MAX_PAGES_TO_SHOW = 7;

    // Redux hooks
    const dispatch = useDispatch();
    const { macSoftware } = useSelector(state => state.apps);
    const { currentUser } = useSelector(state => state.user);
    
    // Local state
    const [currentPage, setCurrentPage] = useState(1);
    
    // Extract data from Redux state
    const { data = [], total: totalApps = 0, loading: isLoading = false, error } = macSoftware;
    
    // Fetch data when component mounts or page changes
    useEffect(() => {
        dispatch(fetchAppsByCategory({
            category: 'smac',
            params: {
                page: currentPage,
                limit: ITEMS_PER_PAGE
            }
        }));
    }, [dispatch, currentPage, ITEMS_PER_PAGE]);
    
    // Fetch user data when component mounts
    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(fetchCurrentUser());
        }
    }, [dispatch]);
    
    // Show error toast if there's an error
    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    // Handle page change
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            // Scroll to top when page changes
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Create slug for URLs
    const createSlug = (title) => {
        return slugify(title, {
            lower: true,
            strict: true,
            remove: /[*+~.()'"!:@]/g
        });
    };

    // Check if user has access to a software
    const hasAccess = (software) => {
        if (!software.isPaid) return true; // Free software is accessible to all
        
        const isAdmin = localStorage.getItem("role") === 'ADMIN';
        if (isAdmin) return true; // Admins have access to all software
        
        const purchasedItems = JSON.parse(localStorage.getItem("gData")) || [];
        return purchasedItems.includes(software._id); // Check if user purchased the software
    };

    // Software card component
    const SoftwareCard = ({ software }) => {
        const softwareHasAccess = hasAccess(software);
        
        return (
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                <Link to={`/download/mac/${createSlug(software.title)}/${software._id}`}>
                    <div className="relative">
                        <img
                            src={software.image}
                            alt={software.title}
                            className="w-full h-48 object-cover"
                            loading="lazy"
                        />
                        {software.isPaid && !softwareHasAccess && (
                            <div className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full">
                                <CiLock size={20} />
                            </div>
                        )}
                    </div>
                    <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-800 truncate">{software.title}</h3>
                        <p className="text-sm text-gray-600 mt-1 truncate">{software.description}</p>
                    </div>
                </Link>
            </div>
        );
    };

    // Pagination calculations
    const totalPages = Math.max(1, Math.ceil(totalApps / ITEMS_PER_PAGE));
    
    // Generate page numbers for pagination
    const getPageNumbers = () => {
        const pageNumbers = [];
        const halfMaxPages = Math.floor(MAX_PAGES_TO_SHOW / 2);
        
        let startPage = Math.max(1, currentPage - halfMaxPages);
        let endPage = Math.min(totalPages, startPage + MAX_PAGES_TO_SHOW - 1);
        
        if (endPage - startPage + 1 < MAX_PAGES_TO_SHOW) {
            startPage = Math.max(1, endPage - MAX_PAGES_TO_SHOW + 1);
        }
        
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        
        return pageNumbers;
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Mac Software</h1>
            
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : error ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            ) : (
                <>
                    {/* Software count */}
                    <div className="mb-6 text-center">
                        <p className="text-gray-600">
                            Showing {data.length} of {totalApps} Mac Software
                        </p>
                    </div>
                    
                    {/* Software grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
                        {data.map((software) => (
                            <SoftwareCard
                                key={software?._id || `software-${Math.random().toString(36).substring(2, 9)}`}
                                software={software}
                            />
                        ))}
                    </div>
                    
                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-8">
                            <nav className="flex items-center">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`px-3 py-1 rounded-l-md ${
                                        currentPage === 1
                                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                            : 'bg-blue-500 text-white hover:bg-blue-600'
                                    }`}
                                >
                                    Previous
                                </button>
                                
                                {getPageNumbers().map(number => (
                                    <button
                                        key={number}
                                        onClick={() => handlePageChange(number)}
                                        className={`px-3 py-1 ${
                                            currentPage === number
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                    >
                                        {number}
                                    </button>
                                ))}
                                
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={`px-3 py-1 rounded-r-md ${
                                        currentPage === totalPages
                                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                            : 'bg-blue-500 text-white hover:bg-blue-600'
                                    }`}
                                >
                                    Next
                                </button>
                            </nav>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default MacSoftwaresRedux;
