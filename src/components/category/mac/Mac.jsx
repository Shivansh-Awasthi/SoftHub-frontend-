import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { CiLock } from 'react-icons/ci';
import { toast } from 'react-toastify';
import slugify from 'slugify';

const Mac = () => {
    // Configuration
    const ITEMS_PER_PAGE = 48;

    // Hooks for URL and navigation
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();

    // Get page from URL or default to 1
    const getInitialPage = () => {
        const pageParam = searchParams.get('page');
        return pageParam ? parseInt(pageParam, 10) : 1;
    };

    // State
    const [data, setData] = useState([]);
    const [totalApps, setTotalApps] = useState(0);
    const [currentPage, setCurrentPage] = useState(getInitialPage);
    const [isLoading, setIsLoading] = useState(true);
    const [isPageTransitioning, setIsPageTransitioning] = useState(false); // New state for page transitions
    const [error, setError] = useState(null);

    // Enhanced API response handler
    const fetchGames = async (page) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.get(`${process.env.REACT_API}/api/apps/category/mac`, {
                params: {
                    page,
                    limit: ITEMS_PER_PAGE
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            // console.log('API Response:', response.data); // Debugging

            // Handle multiple possible response structures
            let gamesData = [];
            let totalCount = 0;

            if (Array.isArray(response.data)) {
                // Case 1: Response is directly an array
                gamesData = response.data;
                totalCount = response.data.length;
            } else if (response.data?.apps && Array.isArray(response.data.apps)) {
                // Case 2: Standard { apps: [], total: number } structure
                gamesData = response.data.apps;
                totalCount = response.data.total || response.data.apps.length;
            } else if (response.data?.games && Array.isArray(response.data.games)) {
                // Case 3: Alternative { games: [], total: number } structure
                gamesData = response.data.games;
                totalCount = response.data.total || response.data.games.length;
            } else if (response.data?.data && Array.isArray(response.data.data)) {
                // Case 4: Common { data: [], total: number } structure
                gamesData = response.data.data;
                totalCount = response.data.total || response.data.data.length;
            } else {
                throw new Error(`Unexpected API structure: ${JSON.stringify(response.data)}`);
            }

            setData(gamesData);
            setTotalApps(totalCount);

        } catch (err) {
            console.error("API Error Details:", {
                error: err,
                response: err.response?.data,
                status: err.response?.status
            });

            let errorMessage = 'Failed to load games';
            if (err.response) {
                errorMessage = err.response.data?.message ||
                    `Server error: ${err.response.status}`;
            } else if (err.request) {
                errorMessage = 'No response from server';
            } else {
                errorMessage = err.message;
            }

            setError(errorMessage);
            toast.error(errorMessage);
            setData([]);
        } finally {
            setIsLoading(false);
            setIsPageTransitioning(false); // Reset page transition state
        }
    };

    // Fetch user data
    const fetchUserData = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            await axios.get(`${process.env.REACT_API}/api/user`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // We don't need to store the user data anymore
        } catch (err) {
            console.error("User data error:", err);
            // Silent fail for user data
        }
    };

    // Initial data load
    useEffect(() => {
        const loadData = async () => {
            await Promise.all([
                fetchGames(currentPage),
                fetchUserData()
            ]);
        };
        loadData();

        // Update URL if it doesn't match the current page
        const pageParam = searchParams.get('page');
        if (!pageParam || parseInt(pageParam, 10) !== currentPage) {
            setSearchParams({ page: currentPage.toString() });
        }
    }, [currentPage, searchParams]);

    // Listen for browser back/forward navigation
    useEffect(() => {
        const handlePopState = () => {
            const pageParam = searchParams.get('page');
            if (pageParam) {
                const newPage = parseInt(pageParam, 10);
                if (newPage !== currentPage) {
                    setCurrentPage(newPage);
                }
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [searchParams, currentPage]);

    // Reset to page 1 when navigating directly to the Mac page
    useEffect(() => {
        // Check if this is a direct navigation (not back/forward)
        // We can detect this by checking if the location.key has changed
        const directNavigation = !searchParams.has('page');

        if (directNavigation && currentPage !== 1) {
            // Reset to page 1 when directly navigating to the Mac page
            setCurrentPage(1);
            setSearchParams({ page: '1' });
        }
    }, [location.key, currentPage, searchParams, setCurrentPage, setSearchParams]); // This will run when the location changes (new navigation)

    // Derived state
    const purchasedGames = JSON.parse(localStorage.getItem("gData")) || [];
    const isAdmin = localStorage.getItem("role") === 'ADMIN';

    // Pagination calculations
    const totalPages = Math.max(1, Math.ceil(totalApps / ITEMS_PER_PAGE));

    const generatePageNumbers = () => {
        const pages = [];
        let start = Math.max(1, currentPage - 3);
        let end = Math.min(totalPages, start + 6);

        if (end - start < 6) {
            start = Math.max(1, end - 6);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    };

    const pageNumbers = generatePageNumbers();

    // Safe slug generation
    const createSlug = (text = '') => {
        return slugify(text.toString(), {
            lower: true,
            strict: true,
            remove: /[*+~.()'"!:@]/g
        }) || 'untitled';
    };

    // Game card component
    const GameCard = ({ game = {} }) => {
        const isPurchased = purchasedGames.includes(game._id);
        const isUnlocked = isAdmin || !game.isPaid || isPurchased;
        const downloadUrl = isUnlocked
            ? `/download/${createSlug(game.platform)}/${createSlug(game.title)}/${game._id}`
            : '#';

        return (
            <div className={`relative flex flex-col rounded-2xl h-52 overflow-hidden transition duration-300 ease-in-out ring-0 ${isUnlocked ? 'hover:ring-2 hover:ring-[#8E8E8E] hover:ring-opacity-75' : 'opacity-50 cursor-not-allowed'
                }`}>
                {!isUnlocked && (
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
                        <CiLock className="text-white font-bold text-4xl mb-16" style={{ strokeWidth: 1 }} />
                    </div>
                )}

                <Link
                    to={downloadUrl}
                    className={`flex flex-col rounded-2xl h-full overflow-hidden ${!isUnlocked ? 'pointer-events-none' : ''}`}
                >
                    <figure className="flex justify-center items-center rounded-t-2xl overflow-hidden h-full">
                        <img
                            src={game.coverImg || '/default-game.png'}
                            alt={game.title || 'Game'}
                            className="w-full h-full object-cover rounded-t-2xl transition-transform duration-700 ease-in-out transform hover:scale-110"
                            onError={(e) => {
                                e.target.src = '/default-game.png';
                                e.target.alt = 'Default game image';
                            }}
                        />
                    </figure>
                    <div className="flex flex-col p-3 bg-[#262626] flex-grow">
                        <div className="text-sm font-normal text-[#ffffff] pb-2 overflow-hidden whitespace-nowrap text-ellipsis">
                            {game.title || 'Untitled Game'}
                        </div>
                        <div className="text-xs font-thin text-[#ffffff]">
                            Size: {game.size || 'N/A'}
                        </div>
                    </div>
                </Link>
            </div>
        );
    };


    // Loading state
    if (isLoading && !data.length) {
        return (
            <div className="container mx-auto p-auto flex justify-center items-center h-[500px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <span className="ml-4">Loading games...</span>
            </div>
        );
    }

    // Error state
    if (error && !data.length) {
        return (
            <div className="container mx-auto p-2 text-center">
                <p className="text-red-500 mb-4">{error}</p>
                <button
                    onClick={() => fetchGames(currentPage)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Retry Loading Games
                </button>
            </div>
        );
    }

    // Main render
    return (
        <div className='container mx-auto p-2'>
            <div className='cover mb-6'>
                <h1 className='font-medium text-3xl mb-4'>
                    Mac Games <span className='font-medium ml-2 text-[#8E8E8E]'>{totalApps}</span>
                </h1>
            </div>

            {data.length > 0 ? (
                <>
                    <div className="relative">
                        {/* Loading overlay during page transitions */}
                        {isPageTransitioning && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center rounded-lg">
                                <div className="flex flex-col items-center">
                                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                                    <p className="text-white text-lg">Loading page {currentPage}...</p>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 transition-opacity duration-300 ease-in-out">
                            {data.map((game) => (
                                <GameCard
                                    key={game?._id || `game-${Math.random().toString(36).substring(2, 9)}`}
                                    game={game}
                                />
                            ))}
                        </div>
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-center mt-10">
                            <button
                                onClick={() => {
                                    if (!isPageTransitioning) {
                                        setIsPageTransitioning(true);
                                        const newPage = Math.max(currentPage - 1, 1);
                                        setCurrentPage(newPage);
                                        setSearchParams({ page: newPage.toString() });
                                        // Scroll to top of the games section
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }
                                }}
                                disabled={currentPage === 1 || isPageTransitioning}
                                className={`px-4 py-2 mx-2 bg-gray-700 text-white rounded transition-all duration-300 ${isPageTransitioning ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
                            >
                                {isPageTransitioning ? 'Loading...' : 'Previous'}
                            </button>

                            {pageNumbers.map((pageNumber) => (
                                <button
                                    key={pageNumber}
                                    onClick={() => {
                                        if (!isPageTransitioning && currentPage !== pageNumber) {
                                            setIsPageTransitioning(true);
                                            setCurrentPage(pageNumber);
                                            setSearchParams({ page: pageNumber.toString() });
                                            // Scroll to top of the games section
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }
                                    }}
                                    disabled={isPageTransitioning}
                                    className={`px-4 py-2 mx-1 rounded text-gray-300 transition-all duration-300 ${currentPage === pageNumber
                                        ? 'bg-blue-600'
                                        : isPageTransitioning
                                            ? 'bg-[#2c2c2c] opacity-50 cursor-not-allowed'
                                            : 'bg-[#2c2c2c] hover:bg-black hover:text-white hover:scale-110'
                                        }`}
                                >
                                    {pageNumber}
                                </button>
                            ))}

                            <button
                                onClick={() => {
                                    if (!isPageTransitioning) {
                                        setIsPageTransitioning(true);
                                        const newPage = Math.min(currentPage + 1, totalPages);
                                        setCurrentPage(newPage);
                                        setSearchParams({ page: newPage.toString() });
                                        // Scroll to top of the games section
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }
                                }}
                                disabled={currentPage === totalPages || isPageTransitioning}
                                className={`px-4 py-2 mx-2 bg-gray-700 text-white rounded transition-all duration-300 ${isPageTransitioning ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
                            >
                                {isPageTransitioning ? 'Loading...' : 'Next'}
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-10 text-gray-400">
                    No games available at the moment
                </div>
            )}
        </div>
    );
};

export default Mac;