import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    };

    const handleClear = () => {
        setSearchQuery('');
    };

    return (
        <header className="flex flex-wrap items-center justify-between p-0 mb-6">
            <div className="flex flex-wrap relative border border-white border-opacity-5 rounded-lg w-full max-w-[730px]"> {/* Adjusted width */}
                <form onSubmit={handleSearch} className="w-full flex items-center">
                    <input
                        type="text"
                        placeholder="Search the site"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-[#242424] hover:bg-[#262626] rounded-lg text-white py-3 pl-4 pr-12 h-12 flex-grow focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-opacity-80 transition duration-200"
                    />
                    {searchQuery && ( // Show the clear icon only if there is text in the input field.
                        <button
                            type="button"
                            onClick={handleClear}
                            className="absolute right-14 top-0 h-full w-4 flex items-center justify-center rounded-full"
                        >
                            <RxCross2 className="text-xxl h-7 w-7 text-[#8e8e8e] hover:text-[#ffffff]" />
                        </button>
                    )}
                    <button type="submit" className="absolute right-1 top-0 h-full w-12 flex items-center justify-center rounded-full">
                        <CiSearch className="text-xxl h-7 w-7 text-[#8e8e8e] hover:text-[#ffffff]" />
                    </button>
                </form>
            </div>
        </header>
    );
};

export default Header;
