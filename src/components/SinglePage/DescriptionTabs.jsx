import React, { useState, useRef, useEffect } from 'react';

const DescriptionTabs = ({ data }) => {
    const [activeTab, setActiveTab] = useState('description');
    const [showMore, setShowMore] = useState(false);
    const [linePosition, setLinePosition] = useState('0px');
    const [lineWidth, setLineWidth] = useState('0px');
    const descriptionRef = useRef(null);
    const installationRef = useRef(null);
    const isMac = data.platform === "Mac";

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        const element = tab === 'description' ? descriptionRef.current : installationRef.current;
        if (element) {
            const { offsetLeft, offsetWidth } = element;
            setLinePosition(`${offsetLeft - 48}px`);
            setLineWidth(`${offsetWidth + 10}px`);
        }
    };

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    useEffect(() => {
        if (isMac && descriptionRef.current) {
            const { offsetLeft, offsetWidth } = descriptionRef.current;
            setLinePosition(`${offsetLeft - 48}px`);
            setLineWidth(`${offsetWidth + 10}px`);
        }
    }, [isMac]);

    return (
        <div className="mt-8 mb-8 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-14 bg-[#262626] z-20 ring-2 ring-[#2E2E2E] rounded-lg overflow-auto">
            {/* Tabs Section - Only show for Mac */}
            {isMac && (
                <div className="relative">
                    <div className="flex justify-left space-x-12 mb-6 relative">
                        <button
                            ref={descriptionRef}
                            onClick={() => handleTabClick('description')}
                            className={`text-xl sm:text-2xl font-normal ${activeTab === 'description' ? 'text-[#fff]' : 'text-[#8E8E8E] hover:text-[#fff]'
                                } transition-colors relative pb-2`}
                        >
                            Description
                        </button>
                        <button
                            ref={installationRef}
                            onClick={() => handleTabClick('installation')}
                            className={`text-xl xl:text-2xl sm:text-2xl font-normal ${activeTab === 'installation' ? 'text-[#fff]' : 'text-[#8E8E8E] hover:text-[#fff]'
                                } transition-colors relative pb-2`}
                        >
                            Fix: Installation Error
                        </button>

                        {/* Animated underline */}
                        <div
                            className="absolute top-16 h-1 bg-blue-500 transition-all duration-300"
                            style={{
                                left: linePosition,
                                width: lineWidth
                            }}
                        />
                    </div>
                    <div className="h-0.5 bg-[#8E8E8E] opacity-20 w-full mt-2 mb-10" />
                </div>
            )}

            {/* Content Section */}
            {isMac ? (
                activeTab === 'description' ? (
                    <>
                        <p
                            className="text-sm sm:text-base md:text-lg text-[#fff] p-1"
                            dangerouslySetInnerHTML={{
                                __html: showMore
                                    ? (data.description ? data.description.replace(/\\n/g, '<br />') : "No description available.")
                                    : (data.description ? data.description.replace(/\\n/g, '<br />').substring(0, 800) + '...' : "No description available.")
                            }}
                        />
                        <button
                            className="mt-4 text-blue-500 hover:underline"
                            onClick={toggleShowMore}
                        >
                            {showMore ? "Collapse" : "Show More"}
                        </button>
                    </>
                ) : (
                    <div className="text-sm sm:text-base md:text-lg text-[#fff] p-1">
                        <div dangerouslySetInnerHTML={{
                            __html: `
                                Enter the command in terminal: <span class="text-yellow-500">xattr -cr</span> 
                                then after it space and then drop the application to the terminal and press Enter.<br/><br/>
                                Or you can disable gatekeeper globally by entering 
                                <span class="text-yellow-500">sudo spctl --master-disable</span> in terminal.<br/><br/>
                                Below there I have analyzed the most common <span class="text-red-500">FIX</span> in this video.
                            `
                        }} />
                        <div className="mt-4" style={{ padding: '62.5% 0 0 0', position: 'relative' }}>
                            <iframe
                                src="https://player.vimeo.com/video/1046166571?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                                frameBorder="0"
                                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                title="Fix. The application is damaged and cannot be opened, you should move it to the bin."
                            ></iframe>
                        </div>
                    </div>
                )
            ) : (
                // Non-Mac content (always show description)
                <>
                    <div className="text-center ">
                        <h2 className="text-2xl sm:text-3xl font-normal text-[#8E8E8E] hover:text-[#fff]">Description</h2>
                        <div className="h-0.5 bg-[#8E8E8E] opacity-20 w-full mt-5 mb-6"></div>
                    </div>


                    <p
                        className="text-sm sm:text-base md:text-lg text-[#fff] p-2"
                        dangerouslySetInnerHTML={{
                            __html: showMore
                                ? (data.description ? data.description.replace(/\\n/g, '<br />') : "No description available.")
                                : (data.description ? data.description.replace(/\\n/g, '<br />').substring(0, 800) + '...' : "No description available.")
                        }}
                    />
                    <button
                        className="mt-4 text-blue-500 hover:underline"
                        onClick={toggleShowMore}
                    >
                        {showMore ? "Collapse" : "Show More"}
                    </button>
                </>
            )}
        </div>
    );
};

export default DescriptionTabs;