import React from 'react';
import { LiaDownloadSolid } from "react-icons/lia";

const platformConfig = {
    Mac: [
        { label: "Direct download link" },
        { label: "Download from OneDrive" },
        { label: "Download Torrent file" },
        { label: "Other Download Links" },
        { label: "Download from Mediafire" },
        { label: "Download from AkiraBox ", custom: (<span className='text-[#55ff00]'>(Fastest 🔥)</span>) }
    ],
    PC: [
        { label: "Torrent (Fitgirl)", custom: (<span className='text-[#55ff00] text-xs'> Note: <span className='text-red-600'> Requires Installation</span></span>) },
        { label: "Buzzheavier ", custom: (<span className='text-[#55ff00]'>(Pre-Installed)</span>) },
        { label: "DataNodes ", custom: (<span className='text-[#55ff00]'>(Pre-Installed)</span>) },
        { label: "GoFile ", custom: (<span className='text-[#55ff00]'>(Pre-Installed)</span>) },
        { label: "Pixeldrain ", custom: (<span className='text-[#55ff00]'>(Pre-Installed)</span>) },
        { label: "Akirabox ", custom: (<span className='text-[#55ff00]'>(Pre-Installed)</span>) }
    ],
    Android: [
        { label: "Download Apk" },
        { label: "Download Apk (Mirror)" },
        { label: "Download Obb" },
        { label: "Download Obb (Mirror)" },
        { label: "Other Download link" }
    ],
    Playstation: [
        { label: "Direct download link" },
        { label: "Download (Mirror)" },
        { label: "Download (Mirror - 2)" },
        { label: "Other link" },
        { label: "Download file" }
    ]
};

const DownloadSection = ({ platform, downloadLinks }) => {
    if (!platform || !downloadLinks) return null;

    const config = platformConfig[platform];
    if (!config) return null;

    return (
        <div>
            {downloadLinks.map((link, index) => {
                if (!link || link === "no" || index >= config.length) return null;

                return (
                    <div key={index} className={`mt-${index === 0 ? '4' : '2'}`}>
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex gap-4 justify-center items-center py-3 px-6 sm:px-10 inline-block w-full text-blue-500 rounded-lg bg-[#2E2E2E] hover:underline hover:bg-[#3E3E3E] transition"
                        >
                            <div>
                                {config[index].label}
                                {config[index].custom && config[index].custom}
                            </div>
                            <div className='text-xl'><LiaDownloadSolid /></div>
                        </a>
                    </div>
                );
            })}
        </div>
    );
};

export default DownloadSection;