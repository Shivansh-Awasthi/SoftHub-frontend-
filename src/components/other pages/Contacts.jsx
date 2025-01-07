import React, { useState } from 'react';

// FAQ data with special markers for line breaks and colors
const faqData = [
    {
        question: "Help with software installation",
        answer: `If you want assistance in installing any app then simply join out <a class="text-cyan-500" href="https://t.me/downloadmacgames" target = "-blank">Telegram</a> and contact the Admins there.`
    },
    {
        question: "Information for copyright holders (DMCA)",
        answer: `If you are the copyright holder of materials (texts, photographs or other objects of copyright) posted on the Site and/or your rights are in any other way violated by the materials of the Site, please send a corresponding request to the Site Administration to the e-mail address <a class="text-blue-500" href="mailto:support@toxicgames.in" target="_blank">support@toxicgames.in</a> and provide comprehensive evidence of ownership of the exclusive right to the relevant materials (works) and/or other information and data on the essence of the violation of rights.
        <br /> <br />Your request will be reviewed by the Site Administration within a period not exceeding 5 (Five) business days from the date of receipt of the request with comprehensive data and confirmation of the violation of your rights.
        <br /> <br />In accordance with the current legislation of the Russian Federation, the Site Administration is ready to consider all contentious issues within the framework of the pre-trial settlement procedure.`
    },
    {
        question: "Share the app",
        answer: `Users with working releases can share them on  <a class="text-cyan-500" href="https://t.me/downloadmacgames" target = "-blank">Telegram</a> `
    },
    {
        question: "Development and design",
        answer: `Developer: <a class="text-purple-500" href="https://t.me/downloadmacgames" target = "-blank">#VenomX</a>.<br /> <br />
    Design: <a class="text-purple-500" href="https://t.me/downloadmacgames" target = "-blank">#VenomX</a>`
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

const Contacts = () => {
    return (
        <div className="flex pt-4 ">
            <div className="w-full max-w-[800px] bg-[#262626] rounded-lg overflow-hidden ring-2 ring-[#2E2E2E]">
                <div className="px-6 py-4 border-b border-[#3c3c43]">
                    <h1 className="text-3xl font-semibold text-white">Contacts</h1>
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

export default Contacts;
