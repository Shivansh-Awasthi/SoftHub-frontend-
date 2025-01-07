import React, { useState } from 'react';

// FAQ data with special markers for line breaks and colors
const faqData = [
    {
        question: "Is the program damaged? Is the file broken? Or other errors??",
        answer: `Enter the command in terminal: <span class="text-yellow-500">xattr -cr</span> then after it drop the application to the terminal and press Enter`
    },
    {
        question: "How to download? Link not working? What is .torrent??",
        answer: `To download large files, it is recommended to use any download manager, for example, <span class="text-yellow-500"> FDM (Free Download Manager).</span> 
    <br /> <br />It is not recommended to use the Safari browser to download from a file sharing service like Filen.io. Use, for example, Google Chrome or the above-mentioned FDM.
    <br /> <br />To download files via torrent (.torrent file) you need a Torrent client, for example, Transmission , or the above-mentioned FDM.
    <br /> <br />Do not forget that providers can block access to some sites (1fichier.com, etc.),<span class="text-yellow-500"> to bypass blocking it is recommended to use a VPN.</span>`
    },
    {
        question: "How to change the language??",
        answer: `Open System Preferences -> General > Language & Region -> Applications - “+”.<br /> <br />
    Select the application and language. This method is relevant for most applications.<br /> <br />
    The language in Adobe products is usually selected during the installation of the product itself.<br /> <br />
    The language in games is usually changed in the game settings itself.<br /> <br />
    There are exceptions. Feel free to search for information on the Internet.`
    },
    {
        question: "How to delete?",
        answer: `There are many options. The easiest is to use special utilities for removing applications, for example, App Cleaner & Uninstaller.<br /> <br />
    And to remove Adobe products, use the Creative Cloud Cleaner Tool`
    }
];

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-[#3c3c43] last:border-b-0">
            <button
                className="w-full py-4 px-6 flex items-center justify-between text-left transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-[15px] text-blue-600 font-medium">{question}</span>
                <span className="text-[#86868b] text-xl font-medium">
                    {isOpen ? '−' : '+'}
                </span>
            </button>
            {isOpen && (
                <div
                    className="px-6 pb-4 text-[15px] text-[#fff] leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: answer }} // Render HTML content including line breaks and styles
                />
            )}
        </div>
    );
};

const Faq = () => {
    return (
        <div className="flex pt-4 ">
            <div className="w-full max-w-[800px] bg-[#262626] rounded-lg overflow-hidden ring-2 ring-[#2E2E2E]">
                <div className="px-6 py-4 border-b border-[#3c3c43]">
                    <h1 className="text-3xl font-semibold text-white">FAQ</h1>
                </div>
                <div className="divide-y divide-[#3c3c43]">
                    {faqData.map((item, index) => (
                        <FAQItem key={index} {...item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Faq;
