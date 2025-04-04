import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchApps } from '../redux/slices/appsSlice';
import Loader from './Loading/Loader';
import { CiLock } from 'react-icons/ci'; // Lock Icon
import slugify from 'slugify';

const SearchResultsRedux = () => {
    const query = new URLSearchParams(useLocation().search).get('query');
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(48); // 48 items per page
    const [error, setError] = useState('');
    
    // Get data from Redux store
    const { searchResults } = useSelector(state => state.apps);
    const { data, total: totalApps, loading } = searchResults;
    
    // Reset currentPage to 1 whenever the query changes
    useEffect(() => {
        setCurrentPage(1); // Reset to page 1 when the search query changes
    }, [query]);
    
    // Fetch the data whenever the page or query changes
    useEffect(() => {
        // If query is empty, set error message
        if (!query || query.trim().length < 1) {
            setError(<span style={{ fontSize: '15px' }}>⚠ Search field is empty.</span>);
            return;
        }
        
        // Clear error if query exists
        setError('');
        
        // Prepare params for API call
        const params = {
            page: currentPage,
            limit: itemsPerPage,
            q: query.trim(),
        };
        
        // Dispatch Redux action to fetch data
        dispatch(searchApps(params));
    }, [currentPage, query, dispatch, itemsPerPage]);

    // Calculate total pages for pagination
    const totalPages = Math.ceil(totalApps / itemsPerPage);

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

    // Check if user has access to an app
    const hasAccess = (app) => {
        if (!app.isPaid) return true; // Free apps are accessible to all
        
        const isAdmin = localStorage.getItem("role") === 'ADMIN';
        if (isAdmin) return true; // Admins have access to all apps
        
        const purchasedGames = JSON.parse(localStorage.getItem("gData")) || [];
        return purchasedGames.includes(app._id); // Check if user purchased the app
    };

    // App card component
    const AppCard = ({ app }) => {
        const appHasAccess = hasAccess(app);
        
        return (
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                <Link to={`/download/${app.category || 'app'}/${createSlug(app.title)}/${app._id}`}>
                    <div className="relative">
                        <img
                            src={app.image}
                            alt={app.title}
                            className="w-full h-48 object-cover"
                            loading="lazy"
                        />
                        {app.isPaid && !appHasAccess && (
                            <div className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full">
                                <CiLock size={20} />
                            </div>
                        )}
                    </div>
                    <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-800 truncate">{app.title}</h3>
                        <p className="text-sm text-gray-600 mt-1 truncate">{app.description}</p>
                    </div>
                </Link>
            </div>
        );
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">
                Search Results for "{query}"
            </h1>
            
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader />
                </div>
            ) : error ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6 text-center">
                    {error}
                </div>
            ) : data && data.length > 0 ? (
                <>
                    {/* Results count */}
                    <div className="mb-6 text-center">
                        <p className="text-gray-600">
                            Showing {data.length} of {totalApps} results
                        </p>
                    </div>
                    
                    {/* Results grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
                        {data.map((app) => (
                            <AppCard
                                key={app?._id || `app-${Math.random().toString(36).substring(2, 9)}`}
                                app={app}
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
                                
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    // Calculate page numbers to show
                                    let pageNum;
                                    if (totalPages <= 5) {
                                        pageNum = i + 1;
                                    } else if (currentPage <= 3) {
                                        pageNum = i + 1;
                                    } else if (currentPage >= totalPages - 2) {
                                        pageNum = totalPages - 4 + i;
                                    } else {
                                        pageNum = currentPage - 2 + i;
                                    }
                                    
                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => handlePageChange(pageNum)}
                                            className={`px-3 py-1 ${
                                                currentPage === pageNum
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                                
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
            ) : (
                <div className="text-center py-12">
                    <p className="text-xl text-gray-600">No results found for "{query}"</p>
                    <p className="mt-2 text-gray-500">Try different keywords or check your spelling</p>
                </div>
            )}
        </div>
    );
};

export default SearchResultsRedux;
