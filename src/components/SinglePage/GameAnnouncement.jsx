import React from 'react';

const HighlightText = ({ text }) => {
    // Function to wrap specific words in span
    const highlightWords = (input) => {
        return input.replace(/\\y(.*?)\\y/g, "<span class='text-orange-400'>$1</span>");
    };

    return (
        <div
            dangerouslySetInnerHTML={{ __html: highlightWords(text) }}
        />
    );
};

const GameAnnouncement = ({ announcements }) => {  // Receive announcements as prop
    return (
        <>
            {announcements && announcements.length > 0 && (
                <div className='mt-4 ring-2 ring-[#9709e3] rounded-lg hover:ring-opacity-75'>
                    {announcements[0] && (
                        <h3 className="text-xl sm:text-2xl text-red-500 font-normal mt-1 pt-3">
                            {announcements[0]}
                        </h3>
                    )}

                    {announcements[1] && (
                        <div className="text-sm sm:text-base flex gap-4 justify-center items-center py-2 px-6 sm:px-10 inline-block w-full">
                            <div>{announcements[1]}</div>
                        </div>
                    )}

                    {announcements[2] && (
                        <div className="mt-1">
                            <p className="text-sm sm:text-base flex flex-wrap justify-center items-center py-3 px-6 sm:px-10 w-full rounded-lg bg-[#2E2E2E] hover:bg-[#1E1E1E] transition break-all">
                                <code className='italic'>{announcements[2]}</code>
                            </p>
                        </div>
                    )}

                    {announcements[3] && (
                        <div className="mt-1 text-sm sm:text-base">
                            <div className="flex gap-4 justify-center items-center py-3 px-6 sm:px-10 inline-block w-full">
                                <div><HighlightText text={announcements[3]} /></div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default GameAnnouncement;